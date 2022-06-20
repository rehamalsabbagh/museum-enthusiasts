import React, { useEffect, useState } from 'react';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';
import { useAppContext } from '../../../context/AppContext';
import Input from '../../atoms/Input/Input';
import { observer } from 'mobx-react';
import Popup from '../../atoms/Popup/Popup';
import PopupStore from '../../atoms/Popup/PopupStore';
import Form from '../Form/Form';
import './AddPost.css';
import UploadImage from '../UploadImage/UploadImage';
import { useVm } from '../../../context';
let addpost_btn_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/864/864380.svg';

function AddPost() {
  const [pressCount, setPressCount] = useState(0);
  const { postsStore } = useAppContext();
  const { usersStore } = useAppContext();
  const popupStore = useVm(PopupStore);
  let addPostBtnIcon = {
    src: addpost_btn_icon_src,
    size: 'lg',
  };

  useEffect(() => {
    postsStore.getAuthUserPosts();
  }, [postsStore]);

  return (
    <React.Fragment>
      <Popup popupStore={popupStore}>
        <Container className={'page_container'}>
          <Form
            errorMessages={postsStore.errorMessages}
            fields={[
              <UploadImage
                error={postsStore.post.image.error}
                onUpload={(url) => postsStore.onChange('image', url)}
                directory={'/posts/' + usersStore.authUser.id}
              />,
              <Input
                maxLength={25}
                error={postsStore.post.name.error}
                value={postsStore.post.name.value}
                placeholder={'Hangout name'}
                onChange={(e) => postsStore.onChange('name', e.target.value)}
              />,
              <Input
                error={postsStore.post.date.error}
                value={postsStore.post.date.value}
                placeholder={'Date'}
                type={'date'}
                onChange={(e) => postsStore.onChange('date', e.target.value)}
              />,
              <Input
                error={postsStore.post.time.error}
                value={postsStore.post.time.value}
                placeholder={'Time'}
                type={'time'}
                onChange={(e) => postsStore.onChange('time', e.target.value)}
              />,
              <Input
                maxLength={25}
                error={postsStore.post.location.error}
                value={postsStore.post.location.value}
                placeholder={'Location'}
                onChange={(e) =>
                  postsStore.onChange('location', e.target.value)
                }
              />,
              <Button
                text={{ text: 'Add a hangout' }}
                onClick={() =>
                  postsStore.addPost(usersStore.authUser.id, () =>
                    popupStore.setState('close')
                  )
                }
              />,
            ]}
          />
        </Container>
      </Popup>
      <Container className={'lho_addpost_container'}>
        {/* {postsStore.authUserPosts === null &&
        popupStore.state === 'close' &&
        pressCount == 0 ? (
          <Container className={'lho_addpost_button_animation'} />
        ) : (
          <Container />
        )} */}
        <Button
          className={'lho_addpost_button'}
          primaryColor={'#ffffff'}
          secondaryColor={'#454545'}
          icon={addPostBtnIcon}
          onClick={() => {
            popupStore.setState('open');
            setPressCount(1);
          }}
        />
      </Container>
    </React.Fragment>
  );
}

export default observer(AddPost);
