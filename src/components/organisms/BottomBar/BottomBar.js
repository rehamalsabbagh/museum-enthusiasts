import React from 'react';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Icon from '../../atoms/Icon/Icon';
import Row from '../../atoms/Row/Row';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import { useAppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import PopupStore from '../../atoms/Popup/PopupStore';
import './BottomBar.css';
import { useVm } from '../../../context';

const newsfeed_src =
  'https://i.ibb.co/5jgssdj/1549510.png';
const newsfeed_active_src =
  'https://i.ibb.co/MspmmgS/news-1.png';
const explore_src =
  'https://i.ibb.co/zV9fT6M/navigation.png';
const explore_active_src =
  'https://i.ibb.co/3mNHk08/navigation-1.png';

// https://i.ibb.co/5jgssdj/1549510.png
// https://i.ibb.co/3mNHk08/navigation-1.png
// https://i.ibb.co/zV9fT6M/navigation.png
// https://i.ibb.co/MspmmgS/news-1.png


function BottomBar() {
  const { signInStore } = useAppContext();
  const iconStyle = { cursor: 'pointer' };


  return (
    <React.Fragment>
      <Container className={'arten_bottom_bar'}>
        <Container className={'page_container'}>

          <Row spacing={{ lg: 200 }} verticalAlign={'middle'}>
            <Link to={'/explore'}>
              <Icon
                src={explore_src}
                size={'lg'}
                style={iconStyle}
              />
            </Link>
            <Link to={'/'}>
              <Icon
                src={newsfeed_src}
                size={'lg'}
                style={iconStyle}
              />
            </Link>
          </Row>

        </Container>
      </Container>
    </React.Fragment>
  );
}

export default BottomBar;
