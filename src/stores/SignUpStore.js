import { decorate, observable } from 'mobx';
import firebase from 'firebase';
import FormUtil from './utils/FormUtil';
import { DEFAULT_FIELD_VALUE } from './constants/FormConstants';
const database = firebase.database();
const empty_err_msg = 'The highlighted fields are requirerd';
const match_err_msg = 'Passwords do not match';
const user_exist_err_msg = 'This username is already registered';
const usr_ln_err_msg = 'Username needs to be 5 characters long at least';
const pas_ln_err_msg = 'Password needs to be 6 characters long at least';
class SignUpStore {
  constructor(usersStore) {
    this.usersStore = usersStore;
    this.errorMessages = [];
    this.clearForm();
  }

  clearForm() {
    this.user = {
      email: DEFAULT_FIELD_VALUE,
      username: DEFAULT_FIELD_VALUE,
      password: DEFAULT_FIELD_VALUE,
      confirmPassword: DEFAULT_FIELD_VALUE,
    };
  }

  onChange(key, value) {
    FormUtil.clearError(this.user[key]);
    FormUtil.storeTrimmedValue(this.user[key], value);
  }

  addErrorMessage(message) {
    this.errorMessages = FormUtil.addToArray(this.errorMessages, message);
  }

  clearErrorMessages() {
    this.errorMessages = [];
    FormUtil.clearErrorMessages(this.user);
  }

  isPasswordsMatch() {
    return this.user.password.value === this.user.confirmPassword.value;
  }

  signUp(signIn) {
    this.clearErrorMessages();
    const _user = this.user.username.value;
    const _pass = this.user.password.value;
    const _booleans = {
      _isAllFilled: FormUtil.isAllFilled(this.user),
      _isPasswordsMatch: this.isPasswordsMatch(),
      _isUsernameAvaliable: !this.usersStore.retriveUser(_user),
      _isUsernameMinimunLength: FormUtil.isMinimunLength(5, _user),
      _isPasswordMinimunLength: FormUtil.isMinimunLength(6, _pass),
    };
    const _allTrue = FormUtil.allTrue(_booleans);
    if (!_allTrue) this.handleErrors(_booleans);
    if (_allTrue) {
      this.addUser();
      this.signInCallBack(signIn);
    }
  }

  handleErrors(booleans) {
    if (!booleans._isPasswordsMatch) {
      this.addErrorMessage(match_err_msg);
      this.user.confirmPassword.error = 1;
    }
    if (!booleans._isUsernameAvaliable) {
      this.addErrorMessage(user_exist_err_msg);
      this.user.username.error = 1;
    }
    if (!booleans._isUsernameMinimunLength) {
      this.addErrorMessage(usr_ln_err_msg);
      this.user.username.error = 1;
    }
    if (!booleans._isPasswordMinimunLength) {
      this.addErrorMessage(pas_ln_err_msg);
      this.user.password.error = 1;
    }
    if (!booleans._isAllFilled) {
      this.addErrorMessage(empty_err_msg);
    }
  }

  addUser() {
    database.ref('/users').push({
      username: this.user.username.value,
      password: this.user.password.value,
      email: this.user.email.value,
    });
  }

  signInCallBack(signIn) {
    setTimeout(() => {
      this.usersStore.getUsers();
      setTimeout(() => {
        if (signIn) signIn();
        setTimeout(() => {
          this.clearForm();
        }, 500);
      }, 1000);
    }, 2000);
  }
}
decorate(SignUpStore, {
  user: observable,
  errorMessages: observable,
});
export default SignUpStore;
