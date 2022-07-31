import React from 'react';

function itemPointDiv(items, number, style) {
    return <div
        style={{
            position: 'absolute',
            backgroundColor: items.find((item) => item.position === number) ? '#ff7878' : 'white',
            ...style
        }}
    >{number}</div>
}

export function verticalRooms(roomNumber, items, excludes) {
    return <React.Fragment>
        <div style={{ position: 'absolute', inset: 0, height: '10px' }}>
            <p style={{ fontSize: '12px', margin: 0 }} >{'Room ' + roomNumber}</p>
        </div>
        {excludes && !excludes.includes('1') && <div
            // TOP //
            style={{
                position: 'absolute',
                width: '50px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '1') ? '#ff7878' : 'white',
                top: 0,
                left: 0,
                right: 0,
            }}
        >{'1'}</div>}

        {excludes && !excludes.includes('2') && <div
            // LEFT TOP//
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '2') ? '#ff7878' : 'white',
                top: 10,
                left: 0,
            }}
        >{'2'}</div>}

        {excludes && !excludes.includes('3') && <div
            // LEFT TOP MIDDLE //
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '3') ? '#ff7878' : 'white',
                top: 27,
                left: 0,
            }}
        >{'3'}</div>}

        {excludes && !excludes.includes('4') && <div
            // LEFT BOTTOM MIDDLE //
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '4') ? '#ff7878' : 'white',
                top: 44,
                left: 0,
            }}
        >{'4'}</div>}
        {excludes && !excludes.includes('5') && <div
            // LEFT BOTTOM //
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '5') ? '#ff7878' : 'white',
                top: 61,
                left: 0,
            }}
        >{'5'}</div>}

        {excludes && !excludes.includes('6') && <div
            // BOTTOM //
            style={{
                position: 'absolute',
                width: '50px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '6') ? '#ff7878' : 'white',
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >{'6'}</div>}

        {excludes && !excludes.includes('7') && <div
            // RIGHT BOTTOM //
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '7') ? '#ff7878' : 'white',
                top: 61,
                right: 0,
            }}
        >{'7'}</div>}

        {excludes && !excludes.includes('8') && <div
            // RIGHT BOTTOM MIDDLE //
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '8') ? '#ff7878' : 'white',
                top: 44,
                right: 0,
            }}
        >{'8'}</div>}

        {excludes && !excludes.includes('9') && <div
            // RIGHT TOP MIDDLE //
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '9') ? '#ff7878' : 'white',
                top: 27,
                right: 0,
            }}
        >{'9'}</div>}
        {excludes && !excludes.includes('10') && <div
            // RIGHT TOP//
            style={{
                position: 'absolute',
                width: '7px',
                height: '12px',
                backgroundColor: items.find((item) => item.position === '10') ? '#ff7878' : 'white',
                top: 10,
                right: 0,
            }}
        >{'10'}</div>}
    </React.Fragment>
}

export function horizantalRooms(roomNumber, items, excludes) {
    return <React.Fragment>
        <div style={{ position: 'absolute', inset: 0, height: '10px' }}>
            <p style={{ fontSize: '12px', margin: 0 }} >{'Room ' + roomNumber}</p>
        </div>
        {excludes && !excludes.includes('1') && <div
            // LEFT BOTTOM //
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '1') ? '#ff7878' : 'white',
                top: 0,
                left: 61,
            }}
        >{'1'}</div>}

        {excludes && !excludes.includes('2') && <div
            // LEFT BOTTOM MIDDLE //
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '2') ? '#ff7878' : 'white',
                top: 0,
                left: 44,
            }}
        >{'2'}</div>}

        {excludes && !excludes.includes('3') && <div
            // LEFT TOP MIDDLE //
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '3') ? '#ff7878' : 'white',
                top: 0,
                left: 27,
            }}
        >{'3'}</div>}

        {excludes && !excludes.includes('4') && <div
            // TOP LIFT//
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '4') ? '#ff7878' : 'white',
                top: 0,
                left: 10,
            }}
        >{'4'}</div>}

        {excludes && !excludes.includes('5') && <div
            // LEFT //
            style={{
                position: 'absolute',
                width: '7px',
                height: '50px',
                backgroundColor: items.find((item) => item.position === '5') ? '#ff7878' : 'white',
                top: 0,
                left: 0,
                bottom: 0,
            }}
        >{'5'}</div>}

        {excludes && !excludes.includes('6') && <div
            // RIGHT BOTTOM //
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '6') ? '#ff7878' : 'white',
                bottom: 0,
                right: 61,
            }}
        >{'6'}</div>}

        {excludes && !excludes.includes('7') && <div
            // RIGHT BOTTOM MIDDLE //
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '7') ? '#ff7878' : 'white',
                bottom: 0,
                right: 44,
            }}
        >{'7'}</div>}

        {excludes && !excludes.includes('8') && <div
            // LEFT BOTTOM MIDDLE //
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '8') ? '#ff7878' : 'white',
                bottom: 0,
                right: 27,
            }}
        >{'8'}</div>}

        {excludes && !excludes.includes('9') && <div
            // RIGHT BOTTOM//
            style={{
                position: 'absolute',
                width: '12px',
                height: '7px',
                backgroundColor: items.find((item) => item.position === '9') ? '#ff7878' : 'white',
                bottom: 0,
                right: 10,
            }}
        >{'9'}</div>}

        {excludes && !excludes.includes('10') && <div
            // RIGHT //
            style={{
                position: 'absolute',
                width: '7px',
                height: '50px',
                backgroundColor: items.find((item) => item.position === '10') ? '#ff7878' : 'white',
                top: 0,
                right: 0,
                bottom: 0,
            }}
        >{'10'}</div>}
    </React.Fragment>
}
