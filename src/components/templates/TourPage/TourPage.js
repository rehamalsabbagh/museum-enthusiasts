import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import Container from '../../atoms/Container/Container';
import { useAppContext } from '../../../Context';
import Row from '../../atoms/Row/Row';
import { verticalRooms, horizantalRooms } from './construct';
import Spacing from '../../atoms/Spacing/Spacing';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import Button from '../../atoms/Button/Button';
import Image from '../../atoms/Image/Image';
import Icon from '../../atoms/Icon/Icon';
// import usersStore from '../../../stores/UsersStore';

const save_src = 'https://i.ibb.co/ZYWgvpS/heart-3.png';
const save_colored_src = 'https://i.ibb.co/pKXLHQy/heart-2.png';

let count = 0;
function TourPage(props) {
    const { dataSetStore } = useAppContext();
    const { usersStore } = useAppContext();

    const [currentRoom, setCurrentRoom] = useState('1');
    const [likedItems, setLikedItems] = useState([]);



    useEffect(() => {
        dataSetStore.getDataSet();
    });

    function updateLikedItems(key) {
        if (!likedItems.includes(key)) {
            setLikedItems([...likedItems, ...[key]]);
        }
        else {
            let filteredLikedItems = likedItems.filter((item) => item !== key);
            setLikedItems(filteredLikedItems);
        }
    }


    function getRoomItems(RoomNumber) {
        if (dataSetStore.tourList) {
            let roomItems = toJS(dataSetStore.tourList).filter((item) => item.room === RoomNumber);
            let newArray = [];
            roomItems.forEach(item => {
                newArray.push({
                    position: item.position,
                    item: item
                })
            });
            return roomItems;
            return newArray;
        }
    }

    function items(arr) {
        return <React.Fragment>
            {arr.map((_item, key) => {
                console.log(_item)
                return <Card
                    style={{ width: arr.length === 1 ? '256px' : '216px', display: 'inline-block', marginLeft: '7px' }}
                    image={
                        <div
                            style={{
                                height: '100px',
                                backgroundImage: 'url(' + _item.image + ')',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                backgroundColor: 'rgb(255, 120, 120)',
                                // color: 'white',
                                height: '20px',
                                width: '20px',
                                position: 'absolute',
                                textAlign: 'center',
                                right: '7px',
                                top: '7px',
                            }}
                            >{_item.position}</div>
                        </div>
                    }>
                    <div style={{ position: 'relative' }}>
                        {/* <Row spacing={100}> */}
                        <p style={{ fontSize: '10px', margin: '0', top: '-6px', position: 'absolute', left: 0, }} >{_item.name}</p>
                        <Image
                            style={{ position: 'absolute', right: 0, top: '-10px', width: '20px' }}
                            onClick={() => updateLikedItems(key)}
                            src={likedItems.includes(key) ? save_colored_src : save_src}
                        ></Image>
                        {/* </Row> */}
                    </div>
                </Card>

            })}
        </React.Fragment>
    }

    let mapPortitionStyle = { width: '90px', height: '90px', position: 'relative', backgroundColor: '#e5e5e5' }
    let visibleMapPortitionStyle = { ...mapPortitionStyle, ...{ backgroundColor: 'lightgray' } }


    return (
        !dataSetStore.loading ?
            <Container>
                <iframe
                    style={{ width: '100vw', height: '100vh' }}
                    src="https://jubilee.moyosaspaces.com/"></iframe>
                <div style={{
                    width: '312px',
                    height: '638px',
                    position: 'fixed',
                    right: '0px',
                    bottom: '-2px',
                    backgroundImage: 'url(https://quirkykidz.co.uk/news/concrete/images/devices/iphone/iphone6.png)',
                    backgroundSize: '312px',
                    backgroundColor: '#e5e5e5',
                    borderRadius: '50px'
                }}>
                    <Spacing space={38}></Spacing>
                    <Row >
                        <div style={mapPortitionStyle}></div>
                        <div style={visibleMapPortitionStyle}>
                            {verticalRooms('3', getRoomItems('3'), ["6", "5", "10", "7"])}
                        </div>
                        <div style={mapPortitionStyle}></div>
                    </Row>
                    <Row >
                        <div style={visibleMapPortitionStyle}>
                            {horizantalRooms('2', getRoomItems('2'), ["8", "9", "10"])}
                        </div>
                        <div style={visibleMapPortitionStyle}></div>
                        <div style={visibleMapPortitionStyle}>
                            {horizantalRooms('4', getRoomItems('4'), ["5", "6"])}
                        </div>
                    </Row>
                    <Row >
                        <div style={mapPortitionStyle}></div>
                        <div style={visibleMapPortitionStyle}>
                            {verticalRooms('1', getRoomItems('1'), ["1", "6", "10", "5"])}
                        </div>
                        <div style={mapPortitionStyle}></div>
                    </Row>
                    <Spacing space={10}></Spacing>
                    <div
                        style={{
                            backgroundColor: ' #fff',
                            width: '270px',
                            textAlign: 'left',
                            borderRadius: '10px 10px 0px 0'
                        }}
                    >
                        <Spacing space={10}></Spacing>
                        <Row spacing={26}>
                            {/* <div style={{ width: '3px' }}></div> */}
                            <p style={{ fontSize: '12px', cursor: 'pointer', fontWeight: currentRoom === '1' ? '900' : '100', margin: '0px 0px 0px 7px' }} onClick={() => setCurrentRoom('1')}>Room 1</p>
                            <p style={{ fontSize: '12px', cursor: 'pointer', fontWeight: currentRoom === '2' ? '900' : '100', margin: 0 }} onClick={() => setCurrentRoom('2')}>Room 2</p>
                            <p style={{ fontSize: '12px', cursor: 'pointer', fontWeight: currentRoom === '3' ? '900' : '100', margin: 0 }} onClick={() => setCurrentRoom('3')}>Room 3</p>
                            <p style={{ fontSize: '12px', cursor: 'pointer', fontWeight: currentRoom === '4' ? '900' : '100', margin: 0 }} onClick={() => setCurrentRoom('4')}>Room 4</p>
                        </Row>
                        <div style={{
                            overflow: 'auto',
                            whiteSpace: 'nowrap'
                        }}>
                            <Row spacing={15}>{items(getRoomItems(currentRoom))}</Row>
                        </div>
                        <p style={{ fontSize: '12px', fontWeight: '900', margin: 9 }} >{'Other paintings in this room'}</p>
                        <div
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                height: '46px',
                            }}
                        >
                            <Button
                                style={{
                                    width: '100px',
                                    height: '30px',
                                    float: 'right',
                                    margin: '7px'
                                }}
                                primaryColor={'#e5e5e5'}
                                secondaryColor={'#1a73e7'}
                                text={{ text: 'End tour', level: 'h6' }}
                            ></Button>
                        </div>
                    </div>

                </div>
            </Container> : null
    );
}

export default TourPage;
