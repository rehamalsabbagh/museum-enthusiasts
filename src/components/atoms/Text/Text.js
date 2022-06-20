import React from 'react';
import Icon from '../Icon/Icon';
import Anchor from '../Anchor/Anchor';
import GeneralUtil from '../../utils/GeneralUtil';
import TextUtil from './TextUtil';

function Text(props) {
  require('./Text.css');

  function text(text, level, style) {
    switch (level) {
      case 'h1':
        return (
          <h1 key={0} style={style}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={0} style={style}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={0} style={style}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={0} style={style}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 key={0} style={style}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 key={0} style={style}>
            {text}
          </h6>
        );
      case 'span':
        return (
          <span key={0} style={style}>
            {text}
          </span>
        );
      default:
        return (
          <h6 key={0} style={style}>
            {text}
          </h6>
        );
    }
  }

  function wrapper(props, children) {
    if (props.anchor)
      return (
        <Anchor {...props.anchor} {...props}>
          {children}
        </Anchor>
      );
    return <span {...props}>{children}</span>;
  }

  let level = GeneralUtil.responsiveObj(props.level);
  let style = GeneralUtil.responsiveObj(props.style);
  let iconStyle = { lg: { verticalAlign: 'middle' } };
  if (props.font) TextUtil.importFont(props.font);

  return wrapper(props, [
    props.text &&
      text(props.text, level, {
        ...style,
        ...{ fontFamily: props.font.family },
      }),
    props.text && props.icon && ' ',
    props.icon && <Icon {...props.icon} style={iconStyle} />,
    props.break && <br />,
  ]);
}

Text.defaultProps = {
  font: {},
  style: {},
  level: { lg: 'h6' },
  break: undefined,
  icon: null,
  anchor: null,
  onClick: () => {},
};

export default Text;
