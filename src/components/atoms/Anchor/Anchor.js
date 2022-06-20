import React from 'react';
import { Link } from 'react-router-dom';
import GeneralUtil from '../../utils/GeneralUtil';

function Anchor(props) {
  require('./Anchor.css');
  function isExternal(link) {
    if (link.indexOf('.') > -1) return true;
    return false;
  }

  let style = GeneralUtil.responsiveObj(props.style);
  let is_external = isExternal(props.link);
  let _props = {
    style: style,
    className: props.className,
    target: props.target,
    href: props.link,
    to: props.link,
  };
  return is_external ? (
    <a {..._props}>{props.children}</a>
  ) : (
    <Link {..._props}>{props.children}</Link>
  );
}

Anchor.defaultProps = {
  className: '',
  style: {},
  link: '',
  target: '',
};

export default Anchor;
