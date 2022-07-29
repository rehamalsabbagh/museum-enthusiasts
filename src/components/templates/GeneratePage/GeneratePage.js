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
        if (!browsingList.find((item) => item.id === newItem.id) || browsingList.length === 0) {
            let _browsingList = [...browsingList, ...[newItem]];
            setBrowsingList(_browsingList);
        }
    }

    function removeFromBrowsingList(item) {
        let filteredBrowsingList = browsingList.filter((browsingListItem) => browsingListItem.name !== item.name);
        setBrowsingList(filteredBrowsingList);
        // console.log(browsingList)
        // let index = browsingList.findIndex((browsingListItem) => browsingListItem.name === item.name)
        // console.log(index)
        // var removed = browsingList.splice(index, 1);
        // console.log(removed)
        // setBrowsingList(removed);
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
                            recommondations.push({ ...toJS(datasetItem), id: datasetKey, count: userInterests[interestsKey].count, shared: userInterests[interestsKey].name });
                        else {
                            let increament = recommondations[findIndex].count + userInterests[interestsKey].count;
                            recommondations[findIndex] = { ...toJS(datasetItem), id: datasetKey, count: increament, shared: recommondations[findIndex].shared }
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

    function items(recommondations, width) {
        let _dataset = [];
        let _count = 0;
        for (const key in recommondations) {
            let _item = recommondations[key];
            let existsInBrowseList = browsingList.find((item) => item.name === _item.name);

            _dataset = [
                ..._dataset,
                ...[
                    <React.Fragment key={key}>
                        <Card
                            style={{ width: width }}
                            image={
                                <div
                                    style={{
                                        height: '250px',
                                        backgroundImage: 'url(' + _item.image + ')'
                                    }}
                                />
                            }>
                            <div style={{ height: '100px' }}>
                                <Row portitions={browse ? [0.5, 0.5] : [0.9, 0]}>
                                    <div>
                                        <Text style={{ fontWeight: '500' }} text={_item.name} />
                                        <Spacing space={10} />
                                        <Text text={_item.artist + ' - ' + _item.year} />
                                    </div>
                                    {browse && <Button
                                        onClick={() => browse ? existsInBrowseList ? removeFromBrowsingList({ ..._item, id: key }) : updateBrowsingList({ ..._item, id: key }) : () => { }}
                                        shape={existsInBrowseList ? 'solid' : 'bordered'}
                                        text={{
                                            text: existsInBrowseList ? 'Added' : 'Add to list',
                                        }}
                                        style={{ height: '32px' }}
                                    />}
                                </Row>
                                <Spacing space={browse ? 17 : 0} />
                                <Row spacing={7}>
                                    {_item.tags.map((tag) => { return <div style={{ backgroundColor: '#f8f8f8', padding: '5px 10px 8px 10px', borderRadius: '100px' }}><h7>{tag}</h7></div> })}
                                </Row>
                            </div>
                        </Card>
                    </React.Fragment>,
                ],
            ];
            _count++;
        }
        return _dataset.reverse();
    }

    let __items = toJS(getRecommendations());
    let userInterests = toJS(usersStore.authUser.interests);
    let wholeArr = [];
    let recommendationsBrowseNumber = Math.round(__items.length / 3);
    let _items = __items.slice(recommendationsBrowseNumber);
    let _browseItems = __items.slice(0, recommendationsBrowseNumber);

    for (const _key in userInterests) {
        let filterr = _browseItems.filter((_item) => _item.shared === userInterests[_key].name);
        wholeArr.push({ shared: userInterests[_key].name, arr: filterr });
    }

    let suggestionsDiv = <div>
        {wholeArr.map((oneArr) => {
            if (oneArr && oneArr.arr.length >= 1)
                return <div>
                    <Spacing space={{ lg: 15 }} />
                    <h4>{oneArr.shared}</h4>
                    <Spacing space={{ lg: 15 }} />
                    <div style={{
                        overflow: 'auto',
                        whiteSpace: 'nowrap'
                    }}>
                        <Row spacing={15}>{items(oneArr.arr, '450px')}</Row>
                    </div>
                </div>
        })}
    </div>

    let _itemsDiv = items([..._items, ...browsingList]);
    let _itemsRow = <Row portitions={{ lg: Array(_itemsDiv.length).fill(0.3333) }} spacing={15}>{_itemsDiv}</Row>;
    let _dataset = [];

    if (dataSetStore.dataset) {
        let dataSetStoreDataset = toJS(dataSetStore.dataset);
        _dataset = dataSetStoreDataset.filter((el) => {
            return [..._items, ..._browseItems].every((f) => {
                return f.name !== el.name
            });
        });
    }
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
                        {browse ? <h3>{'Browse and add items'}</h3> : <h3>{'Your generated tour'}</h3>}
                        {!browse && <Spacing space={{ lg: 20 }} />}
                        {browse && <div>
                            <Spacing space={{ lg: 30 }} />
                            <h6>{'More recommendations'}</h6>
                            {/* <Spacing space={{ lg: 10 }} /> */}
                        </div>}
                        {browse ?
                            <div>
                                {suggestionsDiv}
                                <Spacing space={{ lg: 50 }} />
                                <h3>{'Other items in this museum'}</h3>
                                <Spacing space={{ lg: 30 }} />
                                <Row portitions={{ lg: Array(_dataset.length).fill(0.3333) }} spacing={15}>{items(_dataset)}</Row>;
                            </div>

                            : _itemsRow
                        }
                        <Spacing space={{ lg: 100 }} />

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
