import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import Center from '../../atoms/Center/Center';
import Container from '../../atoms/Container/Container';
import Image from '../../atoms/Image/Image';
import Spacing from '../../atoms/Spacing/Spacing';
import CentralPage from '../CentralPage/CentralPage';

function OptionsPage(props) {
    const [messageDisplayed, setMessageDisplayed] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            setMessageDisplayed(true)
        }, 3000);
    });

    return (
        !messageDisplayed ?
            <CentralPage body={<div>
                <Image
                    src={'https://i.ibb.co/PtchbP1/correct.png'}
                    style={{ width: '70px' }}
                ></Image>
                <Spacing space={20}></Spacing>
                <h4>{'You have successfully connected to your profile'}</h4></div>}></CentralPage>
            :
            <div style={{ width: '50%' }}>
                <CentralPage body={
                    <React.Fragment>
                        <h2>{'Welcome!'}</h2>
                        <Spacing space={{ lg: 50 }} />
                        <h6 style={{ fontWeight: '900' }}>{'Please select one of the options'}</h6>
                        <Spacing space={{ lg: 25 }} />
                        <Link to={'/generate'}>
                            <Button
                                // onClick={() => switchState()}
                                text={{
                                    text: 'Generate a Tour List',
                                }}
                                icon={{
                                    src: 'https://i.ibb.co/6m7rp1c/engineering.png',
                                    size: 'xlg'
                                }}
                            />
                        </Link>
                        {/* <Spacing space={{ lg: 6 }} />
                    <h7 style={{ color: 'gray' }}>{'You can edit the list later'}</h7> */}
                        <Spacing space={{ lg: 20 }} />
                        <Link to={'/create_list'}>
                            <Button
                                // onClick={() => switchState()}
                                shape={'bordered'}
                                text={{
                                    text: 'Create a List From Scratch',
                                }}
                                icon={{
                                    src: 'https://i.ibb.co/hXKwKh8/choice-1.png',
                                    size: 'lg'
                                }}
                            />
                        </Link>
                        {/* https://i.ibb.co/GQTqyvX/choice.png*/}
                    </React.Fragment>}
                />
            </div>
    );
}

export default OptionsPage;
