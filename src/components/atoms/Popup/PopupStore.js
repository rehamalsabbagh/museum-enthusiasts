import { decorate, observable } from 'mobx';

class PopupStore {
  constructor() {
    this.state = 'close';
  }

  setState(state) {
    this.state = state;
  }
}

decorate(PopupStore, {
  state: observable,
});

export default PopupStore;
