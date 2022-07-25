import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Button/Button';
import Center from '../../atoms/Center/Center';
import Container from '../../atoms/Container/Container';
import Spacing from '../../atoms/Spacing/Spacing';
import CentralPage from '../CentralPage/CentralPage';
import ProgressBar from "@ramonak/react-progress-bar";
import Image from '../../atoms/Image/Image';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import { useAppContext } from '../../../context';
import Row from '../../atoms/Row/Row';
import { toJS } from 'mobx';
import BottomBar from '../../organisms/BottomBar/BottomBar';

const save_src = 'https://i.ibb.co/M5VLFjL/save-instagram.png';
const save_colored_src = 'https://i.ibb.co/tsZNFG5/save-instagram-1.png';

function GeneratePage(props) {
    const { dataSetStore } = useAppContext();
    const { usersStore } = useAppContext();
    const [loading, setLoading] = useState(0);
    const [browse, setBrowse] = useState(false);
    const [browsingList, setBrowsingList] = useState([]);

    useEffect(() => {
        dataSetStore.getDataSet();
        if (loading < 100)
            setTimeout(
                () => setLoading(loading + 1),
                1
            );
        else
            setTimeout(
                () => setLoading(102),
                1500
            );
    });

    function updateBrowsingList(newItem) {
        let _browsingList = [...browsingList, ...[newItem]];
        setBrowsingList(_browsingList);
    }

    function filter1() {
        let recommondations = [];
        let userInterests = toJS(usersStore.authUser.interests);
        let dataset = dataSetStore.dataset;
        for (const datasetKey in dataset) {
            //// ONE DATASET ITEM
            let datasetItem = dataset[datasetKey];
            for (const interestsKey in userInterests) {
                for (const tagKey in datasetItem.tags) {
                    if (datasetItem.tags[tagKey] === userInterests[interestsKey].name) {
                        let findIndex = recommondations.findIndex((recommondation) => recommondation.id === datasetKey);
                        if (!recommondations.find((recommondation) => recommondation.id === datasetKey))
                            recommondations.push({ ...toJS(datasetItem), id: datasetKey, count: userInterests[interestsKey].count });
                        else {
                            let increament = recommondations[findIndex].count + userInterests[interestsKey].count;
                            recommondations[findIndex] = { ...toJS(datasetItem), id: datasetKey, count: increament }
                            console.log(recommondations[findIndex].count);
                        }
                    }
                }
            }

        }
        recommondations = recommondations.sort((a, b) => (a.count > b.count ? 1 : b.count > a.count ? -1 : 0));
        return recommondations;

    }

    function filter2(recommondations) {
        return recommondations;
    }

    function getRecommendations() {
        return filter2(filter1());
    }

    function items(recommondations) {
        // let recommondations = getRecommendations();
        // console.log(recommondations)
        let _dataset = [];
        let _count = 0;
        for (const key in recommondations) {
            let _item = recommondations[key];
            _dataset = [
                ..._dataset,
                ...[
                    <React.Fragment key={key}>
                        <Card
                            onClick={() => browse ? updateBrowsingList(_item) : null}
                            image={
                                <div
                                    style={{
                                        height: '250px',
                                        backgroundImage: 'url(' + _item.image + ')'
                                    }}
                                />

                                // <Image src={_item.image} />
                            }>
                            <div style={{ height: '100px' }}>
                                {/* <Image src={dataSetStore.usersItemId(key) ? save_colored_src : save_src} className={'save_item'} onClick={() => dataSetStore.saveUnsaveItem(key)} /> */}
                                <Text style={{ fontWeight: '500' }} text={_item.name} />
                                <Text text={_item.artist} />
                                <Text text={_item.year} />
                                <Text text={_item.location} />
                            </div>
                        </Card>
                        {/* {_count !== 0 && <Spacing space={{ lg: 30, xs: 15 }} />} */}
                    </React.Fragment>,
                ],
            ];
            _count++;
        }
        return _dataset.reverse();
    }

    let _items = items(browse ? dataSetStore.dataset : [...getRecommendations(), ...browsingList]);
    return (
        <Container>
            {/* <CentralPage body={
                <Center> */}
            {loading !== 102 ?
                <React.Fragment>
                    <CentralPage
                        body={
                            <div style={{ width: '50%' }}>
                                <ProgressBar completed={loading} height={10} bgColor={'#1a73e7'} labelColor={'transparent'} /></div>} />
                </React.Fragment> :
                !dataSetStore.loading && (
                    <Container className={'arten_explore_page'}>
                        <Spacing space={{ lg: 100 }} />
                        {browse ? <h2>{'Browse and add items'}</h2> : <h2>{'Your generated tour'}</h2>}
                        <Spacing space={{ lg: 30 }} />

                        <Row portitions={{ lg: Array(_items.length).fill(0.3333) }} spacing={15}>{_items}</Row>
                        <BottomBar
                            body={
                                <div style={{ textAlign: 'right' }}>
                                    <Row spacing={15}>
                                        {!browse && <Button
                                            onClick={() => setBrowse(true)}

                                            shape={'bordered'}
                                            text={{
                                                text: 'Browse and add other items',
                                            }}
                                            style={{ width: '270px' }}
                                            icon={{
                                                src: 'https://i.ibb.co/hXKwKh8/choice-1.png',
                                                size: 'lg'
                                            }}
                                        />}
                                        {browse && <Button
                                            onClick={() => setBrowse(false)}

                                            shape={'bordered'}
                                            text={{
                                                text: 'Check list',
                                            }}
                                            style={{ width: '270px' }}
                                        />}
                                        <Button

                                            // onClick={() => setUserSelection('download_app')}
                                            // shape={'bordered'}
                                            text={{
                                                text: 'Start my tour',
                                            }}
                                            style={{ width: '270px' }}
                                        />
                                    </Row>
                                </div>

                            }
                        />
                    </Container>
                )
            }

            {/* </Center>}
            /> */}
        </Container>
    );
}

export default GeneratePage;
