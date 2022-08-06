import React, { useEffect, useState } from 'react';
import { useAppContext, useVm } from '../../../Context';
import Container from '../../atoms/Container/Container';
import Loader from '../../atoms/Loader/Loader';
import Spacing from '../../atoms/Spacing/Spacing';
import { observer } from 'mobx-react';
import './ExplorePage.css';
import Card from '../../atoms/Card/Card';
import Row from '../../atoms/Row/Row';
import Image from '../../atoms/Image/Image';
import Text from '../../atoms/Text/Text';
import BottomBar from '../../organisms/BottomBar/BottomBar';
import Button from '../../atoms/Button/Button';

const save_src = 'https://i.ibb.co/ZYWgvpS/heart-3.png';
const save_colored_src = 'https://i.ibb.co/pKXLHQy/heart-2.png';


function ExplorePage() {
  const { dataSetStore } = useAppContext();
  const [selectedItems, setSelectedItems] = useState([]);


  function updateSelectedItems(key) {
    if (!selectedItems.includes(key))
      setSelectedItems([...selectedItems, ...[key]]);
    else {
      let filteredSelectedItems = selectedItems.filter((item) => item !== key);
      setSelectedItems(filteredSelectedItems);
    }
    // console.log(selectedItems)
  }

  useEffect(() => {
    dataSetStore.getDataSet();
    dataSetStore.getExternal();
  }, [dataSetStore]);

  function savePref() {
    selectedItems.forEach((item) =>
      dataSetStore.saveUnsaveItem(item)
    );
  }

  function items() {
    let _dataset = [];
    let _count = 0;
    for (const key in dataSetStore.external) {
      let _item = dataSetStore.external[key];
      _dataset = [
        ..._dataset,
        ...[
          <React.Fragment key={key}>
            <Card
              image={
                <div
                  style={{
                    height: '400px',
                    backgroundImage: 'url(' + _item.image + ')'
                  }}
                >

                </div>
              }>
              <Container>
                <Image
                  src={selectedItems.includes(key) ? save_colored_src : save_src}
                  // src={dataSetStore.usersItemId(key) ? save_colored_src : save_src}
                  className={'save_item'}
                  // onClick={() => dataSetStore.saveUnsaveItem(key)}
                  onClick={() => updateSelectedItems(key)}
                />
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
          <Spacing space={100} />
          <h5>{'You do not have any saved preferences.'}</h5>
          <Spacing space={10} />
          <h4 style={{ fontWeight: '500' }}>{'Let us know which of these items you like'}</h4>
          <Spacing space={30} />
          <Row portitions={{ lg: Array(_items.length).fill(0.33) }} spacing={15}>{_items}</Row>
        </Container>
      )}
      <Spacing space={{ lg: 50 }} />
      <BottomBar
        body={
          <div style={{ textAlign: 'right' }}>
            <Row spacing={15}>
              <Button
                onClick={() => savePref()}
                text={{
                  text: 'Proceed',
                }}
                style={{
                  width: '270px',
                  pointerEvents: selectedItems.length < 1 ? 'none' : 'auto',
                  opacity: selectedItems.length < 1 ? '0.5' : '1'
                }}
              />
            </Row>
          </div>


        }
      />
    </React.Fragment>
  );
}

export default observer(ExplorePage);
