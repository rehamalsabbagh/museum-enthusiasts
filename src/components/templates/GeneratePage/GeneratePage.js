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
import Icon from '../../atoms/Icon/Icon';
import { Link } from 'react-router-dom';

const save_src = 'https://i.ibb.co/M5VLFjL/save-instagram.png';
const save_colored_src = 'https://i.ibb.co/tsZNFG5/save-instagram-1.png';
const add_to_list = 'https://i.ibb.co/y4JmvRr/plus-1.png';
const added_to_list = 'https://i.ibb.co/ZcQxn2N/checkmark.png';

{/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/ZcQxn2N/checkmark.png" alt="checkmark" border="0"></a> <a href="https://imgbb.com/"><img src="https://i.ibb.co/y4JmvRr/plus-1.png" alt="plus-1" border="0"></a> */ }



function GeneratePage(props) {
    const { dataSetStore } = useAppContext();
    const { usersStore } = useAppContext();
    const [loading, setLoading] = useState(0);
    const [browse, setBrowse] = useState(false);
    const [browsingList, setBrowsingList] = useState([]);
    const [oneItemView, setOneItemView] = useState(null);

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

    function cardd(_item, key, width, imageHeight) {
        let existsInBrowseList = browsingList.find((item) => item.name === _item.name);
        return (<Card
            style={{ width: width }}
            image={
                <div
                    onClick={() => setOneItemView({ ..._item, ...{ key: key } })}
                    style={{
                        cursor: 'pointer',
                        height: imageHeight ?? '250px',
                        backgroundImage: 'url(' + _item.image + ')'
                    }}
                />
            }>
            <div style={{ height: oneItemView ? '450px' : '100px' }}>
                <Row portitions={browse ? [0.5, 0.5] : [0.9, 0]}>
                    <div onClick={() => setOneItemView({ ..._item, ...{ key: key } })} style={{
                        cursor: 'pointer'
                    }}>
                        <Text style={{ fontWeight: '500' }} text={_item.name} />
                        <Spacing space={10} />
                        <Text text={_item.artist + ' - ' + _item.year} />
                        {oneItemView && <React.Fragment><h7>
                            <Spacing space={10} />
                            {_item.description}
                        </h7></React.Fragment>}
                    </div>
                    {browse && <Button
                        onClick={() => browse ? existsInBrowseList ? removeFromBrowsingList({ ..._item, id: key }) : updateBrowsingList({ ..._item, id: key }) : () => { }}
                        shape={existsInBrowseList ? 'solid' : 'bordered'}
                        text={{
                            text: existsInBrowseList ? 'Added' : 'Add to list',
                        }}
                        icon={{
                            src: existsInBrowseList ? added_to_list : add_to_list, size: 'sm'
                        }}
                        style={{
                            height: '32px', width: '130px',
                            float: 'right'
                        }}
                    />}
                </Row>
                <Spacing space={browse ? 17 : 0} />
                <Row spacing={7}>
                    {_item.tags.map((tag) => { return <div style={{ backgroundColor: '#f8f8f8', padding: '5px 10px 8px 10px', borderRadius: '100px' }}><h7>{tag}</h7></div> })}
                </Row>
            </div>
        </Card>);
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
                        {cardd(_item, key, width)}
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
                    <Spacing space={{ lg: 20 }} />
                    <h6 style={{ fontWeight: '100' }}>{'Because you liked items under "' + oneArr.shared + '"'}</h6>
                    <Spacing space={{ lg: 15 }} />
                    <div style={{
                        overflow: 'auto',
                        whiteSpace: 'nowrap'
                    }}>
                        <Row spacing={15}>{items(oneArr.arr, '450px')}</Row>
                    </div>
                    <Spacing style={{ borderBottom: '1px solid lightgrey' }} space={{ lg: 25 }} />
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
                    oneItemView ?
                        <React.Fragment>
                            <div
                                onClick={() => setOneItemView(null)}
                                className={''} style={{ position: 'absolute', textAlign: 'left', left: 0, right: 0, zIndex: '999', cursor: 'pointer' }}>
                                <Spacing space={{ lg: 100 }} />
                                <Row spacing={10}>
                                    <Icon
                                        src={'https://websiteimages.b-cdn.net/back_arrow_black.svg'}
                                        size={'md'}
                                    ></Icon>
                                    <h6 style={{ fontWeight: '900' }}>{browse ? 'Back to browsing' : 'Back to tour list'}</h6>
                                </Row>
                                <Spacing space={{ lg: 30 }} />
                                {cardd(oneItemView, oneItemView.key, null, '700px')}
                                <Spacing space={{ lg: 30 }} />
                            </div> </React.Fragment > :
                        <Container className={'arten_explore_page'}>
                            <Spacing space={{ lg: 100 }} />
                            <h3 style={{ fontWeight: '500' }}>{browse ? 'Browse and add items' : 'Your generated tour'}</h3>
                            {!browse && <Spacing space={{ lg: 30 }} />}
                            {browse && <div>
                                <Spacing space={{ lg: 40 }} />
                                <h5 style={{ fontWeight: '500' }}>{'More recommendations for you'}</h5>
                                {/* <Spacing space={{ lg: 10 }} /> */}
                            </div>}
                            {browse ?
                                <div>
                                    {suggestionsDiv}
                                    <Spacing space={{ lg: 50 }} />
                                    <h5 style={{ fontWeight: '500' }}>{'Other items in this museum'}</h5>
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
                                                    text: 'View tour list',
                                                }}
                                                style={{ width: '270px' }}
                                            />}
                                            <Link to={'/tour'}>
                                                <Button
                                                    onClick={() => dataSetStore.setTourList([..._items, ...browsingList])}
                                                    // onClick={() => setUserSelection('download_app')}
                                                    // shape={'bordered'}
                                                    text={{
                                                        text: 'Start my tour',
                                                    }}
                                                    style={{ width: '270px' }}
                                                /></Link>
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
