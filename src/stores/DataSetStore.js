import { decorate, observable } from 'mobx';
import firebase from 'firebase';
const database = firebase.database();
class DataSetStore {
  constructor(usersStore) {
    this.usersStore = usersStore;
    this.dataset = null;
    this.external = null;
    this.loading = false;
    this.tourList = null;
  }

  getExternal() {
    let _this = this;
    database.ref('/externals/dataset').on('value', (snapshot) => {
      _this.external = snapshot.val();
      // console.log(snapshot.val())
      this.loading = false;
    });
  }

  getDataSet() {
    let _this = this;
    database.ref('/dataset').on('value', (snapshot) => {
      _this.dataset = snapshot.val();
      this.loading = false;
    });
  }

  setTourList(tourList) {
    this.tourList = tourList;
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

  usersInterestId(interest) {
    let userInterests = this.usersStore.authUser.interests;
    let _usersInterestId = false;
    if (userInterests) {
      for (const key in userInterests) {
        if (userInterests[key].name === interest) _usersInterestId = key;
      }
    }
    return _usersInterestId;
  }

  saveInterests(itemId) {
    let _itemTags = this.dataset[itemId].tags;
    for (const key in _itemTags) {
      let _itemTag = _itemTags[key];
      let _usersInterestId = this.usersInterestId(_itemTag);
      if (!_usersInterestId) {
        database.ref('/users/' + this.usersStore.authUser.id + '/interests').push(
          { name: _itemTag, count: 1 }
        );
      }
      else {
        database.ref('/users/' + this.usersStore.authUser.id + '/interests/' + _usersInterestId).update(
          { count: parseInt(this.usersStore.authUser.interests[_usersInterestId].count) + 1 }
        );
      }
    }
  }

  unsaveInterests(itemId) {
    let _itemTags = this.dataset[itemId].tags;
    for (const key in _itemTags) {
      let _itemTag = _itemTags[key];
      let _usersInterestId = this.usersInterestId(_itemTag);
      if (parseInt(this.usersStore.authUser.interests[_usersInterestId].count) === 1) {
        let ref = database.ref(
          '/users/' + this.usersStore.authUser.id + '/interests/' + _usersInterestId
        );
        ref.remove();
      }
      else {
        database.ref('/users/' + this.usersStore.authUser.id + '/interests/' + _usersInterestId).update(
          { count: parseInt(this.usersStore.authUser.interests[_usersInterestId].count) - 1 }
        );
      }
    }
  }

  saveUnsaveItem(itemId) {
    let _usersItemId = this.usersItemId(itemId);
    if (!_usersItemId) {
      this.saveInterests(itemId);
      database.ref('/users/' + this.usersStore.authUser.id + '/items').push(
        itemId
      );
    }
    else {
      this.unsaveInterests(itemId);
      let ref = database.ref(
        '/users/' + this.usersStore.authUser.id + '/items/' + _usersItemId
      );
      ref.remove();
    }
  }
}

decorate(DataSetStore, {
  dataset: observable,
  external: observable,
  loading: observable,
});

export default DataSetStore;
