import ID from './ID';

export default class Task {
  constructor(text) {
    this.text = text;
    this.status = 'all';
    this.id = ID[ID.length - 1];
    ID.push(this.id + 1);
  }
}
