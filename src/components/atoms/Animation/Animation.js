import React, { useState } from 'react';
import Fade from './Fade/Fade';
import Slide from './Slide/Slide';
import Expand from './Expand/Expand';
import { useAppContext } from '../../../context/AppContext';
import { observer } from 'mobx-react-lite';
import GeneralUtil from '../../utils/GeneralUtil';

function Animation(props) {
  let { windowStore } = useAppContext();
  const [appear, setAppear] = useState(false);
  const [scroll, setScroll] = useState(null);
  const animationId = GeneralUtil.generateId('animation');
  _appear();

  function _appear() {
    setTimeout(() => {
      if (props.on === 'load' && !appear) setAppear(true);
    }, 1000);
    if (props.on === 'scroll' && !appear && scroll)
      if (windowStore.scroll + windowStore.height * 0.35 >= scroll)
        setAppear(true);
  }

  if (props.on !== 'external') props.appear = appear;
  if (props.on === 'scroll') {
    props.id = animationId;
    setTimeout(() => {
      if (scroll === null && document.getElementById(animationId)) {
        setScroll(
          document.getElementById(animationId).getBoundingClientRect().top
        );
      }
    }, 1);
  }

  switch (props.type) {
    case 'fade':
      return <Fade {...props}>{props.children}</Fade>;
    case 'slide':
      return <Slide {...props}>{props.children}</Slide>;
    case 'expand':
      return <Expand {...props}>{props.children}</Expand>;
    default:
      return <Fade {...props}>{props.children}</Fade>;
  }
}

Animation.defaultProps = {
  type: 'fade',
  on: 'external', //// load, scroll, external
  appear: false,
};

export default observer(Animation);
