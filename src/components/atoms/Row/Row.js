import React from 'react';
import GeneralUtil from '../../utils/GeneralUtil';

function Row(props) {
  function children(children, portitions, spacing) {
    if (!children) return <React.Fragment />;
    if (!children.length) children = [children];
    let spaceStyle = { display: 'inline-block', width: spacing + 'px' };
    let _childrenInRow = parseInt(100 / (100 * portitions[0]));
    let _spaceInRow = spacing * _childrenInRow - spacing;
    return children.map((child, key) => {
      let _portition = portitions[key] * 100 + '%';
      let childStyle = {
        width:
          'calc(' + _portition + ' - ' + _spaceInRow / _childrenInRow + 'px)',
        display: 'inline-block',
        verticalAlign: props.verticalAlign,
      };
      return (
        <React.Fragment key={key}>
          <div style={childStyle}>{child}</div>
          {key !== children.length - 1 && (key + 1) % _childrenInRow !== 0 && (
            <div style={spaceStyle} />
          )}
          {(key + 1) % _childrenInRow === 0 && (
            <div style={{ height: spacing + 'px' }} />
          )}
        </React.Fragment>
      );
    });
  }

  let _portitions = GeneralUtil.responsiveObj(props.portitions);
  let _spacing = GeneralUtil.responsiveObj(props.spacing);
  let _children = children(props.children, _portitions, _spacing);
  let _style = GeneralUtil.responsiveObj(props.style);
  return (
    <div {...props} className={props.className} style={_style}>
      {_children}
    </div>
  );
}

Row.defaultProps = {
  style: {},
  portitions: { lg: [] },
  spacing: { lg: 0 },
  verticalAlign: 'top',
};

export default Row;
