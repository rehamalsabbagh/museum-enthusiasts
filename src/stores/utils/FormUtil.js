import React from 'react';
import Text from '../../components/atoms/Text/Text';
class FormUtil {
  static clearError(obj) {
    obj.error = undefined;
  }

  static storeTrimmedValue(obj, value) {
    obj.value = value.replace(/\s/g, '');
  }

  static storeValue(obj, value) {
    obj.value = value;
  }

  static addToArray(errorMessages, message) {
    return [...errorMessages, ...[message]];
  }

  static clearErrorMessages(obj) {
    for (var key in obj) obj[key].error = undefined;
  }

  static isMinimunLength(minimunLength, value) {
    return value.length >= minimunLength;
  }

  static isAllFilled(obj) {
    let _isAllFilled = true;
    for (var key in obj) {
      if (obj[key].value === '') obj[key].error = 1;
      _isAllFilled = _isAllFilled && obj[key].value !== '';
    }
    return _isAllFilled;
  }

  static errMsgs(_errMsgs) {
    if (!_errMsgs.length) return false;
    return _errMsgs.map((_errMsg, key) => (
      <Text key={key} text={'● ' + _errMsg} />
    ));
  }

  static allTrue(obj) {
    let _allTrue = true;
    for (var key in obj) _allTrue = _allTrue && obj[key];
    return _allTrue;
  }
}

export default FormUtil;
