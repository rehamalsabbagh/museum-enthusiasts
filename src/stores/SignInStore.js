import { decorate, observable } from 'mobx';
import FormUtil from './utils/FormUtil';
import { DEFAULT_FIELD_VALUE } from './constants/FormConstants';
const empty_err_msg = 'The highlighted fields are requirerd';
const user_dont_exist_err_msg = 'This username does not exist';
const wrong_pass_err_msg = 'Password is not correct';
class SignInStore {
  constructor(usersStore) {
    this.usersStore = usersStore;
    this.errorMessages = [];
    this.user = {
      username: DEFAULT_FIELD_VALUE,
      password: DEFAULT_FIELD_VALUE,
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

  setUser(user) {
    this.user = user;
  }

  signOut() {
    this.usersStore.authUser = null;
  }

  signIn() {
    this.clearErrorMessages();
    const _user = this.user.username.value;
    const _pass = this.user.password.value;
    const __user = this.usersStore.retriveUser(_user);
    const _booleans = {
      _isUsernameAvaliable: __user,
      _isCorrectPassword: __user.password === _pass,
      _isAllFilled: FormUtil.isAllFilled(this.user),
    };
    const _allTrue = FormUtil.allTrue(_booleans);
    if (!_allTrue) this.handleErrors(_booleans);
    if (_allTrue) {
      this.usersStore.authUser = __user;
    }
  }

  handleErrors(booleans) {
    if (!booleans._isUsernameAvaliable) {
      this.addErrorMessage(user_dont_exist_err_msg);
      this.user.username.error = 1;
    }
    if (!booleans._isCorrectPassword) {
      this.addErrorMessage(wrong_pass_err_msg);
      this.user.password.error = 1;
    }
    if (!booleans._isAllFilled) {
      this.addErrorMessage(empty_err_msg);
    }
  }
}
decorate(SignInStore, {
  errorMessages: observable,
  authenticated: observable,
  user: observable,
});
export default SignInStore;
