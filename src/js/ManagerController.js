import Task from './Task';

export default class ManagerController {
  constructor() {
    this.tasks = [];
    this.container = document.querySelector('.wrapper');
    [this.pinnedTasks] = document.getElementsByClassName('tasks-pinned');
    [this.allTasks] = document.getElementsByClassName('tasks-all');
    this.input = document.querySelector('.search');
    this.searchMsg = document.querySelector('.search-message');
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && this.input === document.activeElement) {
        if (this.input.value) {
          const task = new Task(this.input.value);
          this.tasks.push(task);
          this.unfocuseInput();
          this.redrawTasks();
          this.searchMsg.classList.add('hidden');
        } else {
          this.searchMsg.innerText = 'No any task to add!';
          this.searchMsg.classList.remove('hidden');
        }
        return;
      }

      if (event.key === 'Escape' && this.input === document.activeElement) {
        this.unfocuseInput();
        this.redrawTasks();
      }
    });

    Array.from(this.container.querySelectorAll('.tasks-field')).forEach((field) => {
      field.addEventListener('click', (event) => {
        const { id } = event.target.closest('DIV').dataset;
        const filt = this.tasks.filter((task) => task.id === +id)[0];

        this.unfocuseInput();

        if (event.target.classList.contains('all')) {
          filt.status = 'pinned';
          this.redrawTasks();
          return;
        }

        if (event.target.classList.contains('pinned')) {
          filt.status = 'all';
          this.redrawTasks();
          return;
        }

        if (event.target.classList.contains('task-del')) {
          this.tasks = this.tasks.filter((task) => task !== filt);
          this.redrawTasks();
        }
      });
    });

    this.input.addEventListener('input', () => {
      const text = this.input.value.toLowerCase();
      const filteredTasks = this.tasks.filter((task) => task.text.toLowerCase().includes(text) && task.status !== 'pinned');

      if (!text) {
        this.redrawTasks(filteredTasks);
        return;
      }

      if (filteredTasks.length !== 0) {
        this.allTasks.innerHTML = '';
        this.redrawAllTasks(filteredTasks);
        this.searchMsg.classList.add('hidden');
      } else {
        this.allTasks.innerHTML = '';
        this.searchMsg.innerText = 'No tasks found!';
        this.searchMsg.classList.remove('hidden');
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createTaskHTML(task) {
    const title = task.status === 'all' ? 'Закрепить задачу' : 'Открепить задачу';

    return `
      <div class="task-row task-${task.status}" data-id="${task.id}">
        <span class="task-text">${task.text}</span> 
        <span class="task-status ${task.status}" title="${title}"></span>
        <span class="task-del" title="Удалить задачу">x</span>
      </div>
    `;
  }

  createTaskElement(task) {
    if (task.status === 'all') {
      this.allTasks.insertAdjacentHTML('beforeend', this.createTaskHTML(task));
    } else {
      this.pinnedTasks.insertAdjacentHTML('beforeend', this.createTaskHTML(task));
    }
  }

  redrawTasks(tasksList = this.tasks) {
    this.allTasks.innerHTML = '';
    this.pinnedTasks.innerHTML = '';

    tasksList.forEach((task) => this.createTaskElement(task));

    const allMsg = document.querySelector('.all-message');
    const pinnedMsg = document.querySelector('.pinned-message');

    if (this.allTasks.children.length) {
      allMsg.classList.add('hidden');
      this.allTasks.classList.remove('hidden');
    } else {
      allMsg.classList.remove('hidden');
    }

    if (this.pinnedTasks.children.length) {
      pinnedMsg.classList.add('hidden');
      this.pinnedTasks.classList.remove('hidden');
    } else {
      pinnedMsg.classList.remove('hidden');
    }

    this.searchMsg.classList.add('hidden');
  }

  redrawAllTasks(taskList) {
    this.allTasks.innerHTML = '';
    taskList.forEach((task) => this.createTaskElement(task));
  }

  unfocuseInput() {
    this.input.value = '';
    this.input.blur();
  }
}
