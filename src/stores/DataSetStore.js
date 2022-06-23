import { decorate, observable } from 'mobx';
import firebase from 'firebase';
const database = firebase.database();
class DataSetStore {
  constructor(usersStore) {
    this.usersStore = usersStore;
    this.dataset = null;
    this.loading = false;
  }

  getDataSet() {
    let _this = this;
    database.ref('/dataset').on('value', (snapshot) => {
      _this.dataset = snapshot.val();
      this.loading = false;
    });
  }

  usersItemId(itemId) {
    let userItems = this.usersStore.authUser.items;
    let _usersItemId = false;
    if (userItems) {
      for (const key in userItems) {
        if (userItems[key] === itemId) _usersItemId = key;
      }
    }
    return _usersItemId;
  }

  saveUnsaveItem(itemId) {
    let _usersItemId = this.usersItemId(itemId);
    if (!_usersItemId)
      database.ref('/users/' + this.usersStore.authUser.id + '/items').push(
        itemId
      );
    else {
      let ref = database.ref(
        '/users/' + this.usersStore.authUser.id + '/items/' + _usersItemId
      );
      ref.remove();
    }

    // database.ref('/posts/' + userId + '/' + postId + '/likes').push({
    //   user: this.usersStore.authUser.id,
    // });
    // let likeRef = database.ref(
    //   '/posts/' + userId + '/' + postId + '/likes/' + likeId
    // );
    // likeRef.remove();
  }
}

decorate(DataSetStore, {
  dataset: observable,
  loading: observable,
});

export default DataSetStore;
