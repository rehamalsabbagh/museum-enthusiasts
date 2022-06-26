import React, { useEffect } from 'react';
import { useAppContext, useVm } from '../../../context';
import Container from '../../atoms/Container/Container';
import Loader from '../../atoms/Loader/Loader';
import Spacing from '../../atoms/Spacing/Spacing';
import { observer } from 'mobx-react';
import './ExplorePage.css';
import Card from '../../atoms/Card/Card';
import Row from '../../atoms/Row/Row';
import Image from '../../atoms/Image/Image';
import Text from '../../atoms/Text/Text';

const save_src = 'https://i.ibb.co/M5VLFjL/save-instagram.png';
const save_colored_src = 'https://i.ibb.co/tsZNFG5/save-instagram-1.png';

function ExplorePage() {
  const { dataSetStore } = useAppContext();

  useEffect(() => {
    dataSetStore.getDataSet();
  }, [dataSetStore]);

  function items() {
    let _dataset = [];
    let _count = 0;
    for (const key in dataSetStore.dataset) {
      let _item = dataSetStore.dataset[key];
      _dataset = [
        ..._dataset,
        ...[
          <React.Fragment key={key}>
            <Card
              image={<Image src={_item.image} />
              }>
              <Container>
                <Image src={dataSetStore.usersItemId(key) ? save_colored_src : save_src} className={'save_item'} onClick={() => dataSetStore.saveUnsaveItem(key)} />
                <Text style={{ fontWeight: '500' }} text={_item.name} />
                <Text text={_item.artist} />
                <Text text={_item.year} />
                <Text text={_item.location} />
              </Container>
            </Card>
            {/* {_count !== 0 && <Spacing space={{ lg: 30, xs: 15 }} />} */}
          </React.Fragment>,
        ],
      ];
      _count++;
    }
    return _dataset.reverse();
  }

  let _items = items();
  return (
    <React.Fragment>
      {dataSetStore.loading && (
        <Container className={'arten_explore_page'}>
          <Loader />
        </Container>
      )}
      {!dataSetStore.loading && (
        <Container className={'arten_explore_page'}>
          <Row portitions={{ lg: Array(_items.length).fill(0.33) }} spacing={15}>{_items}</Row>
        </Container>
      )}
      <Spacing space={{ lg: 50 }} />
    </React.Fragment>
  );
}

export default observer(ExplorePage);
