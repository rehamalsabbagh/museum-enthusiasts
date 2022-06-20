import React, { useState } from 'react';
import GeneralUtil from '../../../utils/GeneralUtil';
let default_textkeys = {
  prefixText: '',
  textkey: 'option',
};
function Select(props) {
  const [currentItem, setCurrentItem] = useState({});

  require('./Select.css');

  function onChange(e) {
    props.onChange(e.target.value);
    setCurrentItem(findItem(e.target.value));
  }

  function findItem(value) {
    if (value === 'default') return {};
    return props.items.find((item) => item[props.valueKey] === value);
  }

  let style = GeneralUtil.responsiveObj(props.style);
  let className =
    props.className +
    ' lho_select ' +
    props.shape +
    ' fa-' +
    props.iconSize +
    ' h6';
  let icon = props.iconKey
    ? currentItem[props.iconKey]
    : 'https://websiteimages.b-cdn.net/select_default_icon.svg';
  if (props.iconKey && props.shape === 'icon')
    style.backgroundImage = 'url(' + icon + ')';
  if (props.shape === 'bordered') style.borderColor = props.primaryColor;

  return (
    <select className={className} style={style} onChange={(e) => onChange(e)}>
      {props.title && (
        <option value={'default'} selected={'selected'}>
          {props.title}
        </option>
      )}
      {props.items.map((item, key) => (
        <option value={item[props.valueKey]} key={key}>
          {props.textKeys.map(
            (textkey) => textkey.prefixText + item[textkey.textkey]
          )}
        </option>
      ))}
    </select>
  );
}

Select.defaultProps = {
  style: {},
  className: '',
  items: [],
  shape: 'flat', /// flat //// bordered //// icon
  iconSize: 'sm',
  iconKey: null,
  valueKey: 'value',
  textKeys: [default_textkeys],
  title: '',
  primaryColor: 'gray',
  onChange: () => {},
};

export default Select;
