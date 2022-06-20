import React from 'react';
import Text from '../Text/Text';

function TextLogo(props) {
  let logo_font = {
    url: 'https://fonts.googleapis.com/css2?family=Sacramento&display=swap',
    id: 'sacramento',
    family: 'Sacramento, cursive',
  };
  return <Text {...props} font={logo_font}></Text>;
}

TextLogo.defaultProps = {
  level: { lg: 'h4' },
};

export default TextLogo;
