import React from 'react';
import Text from '../Text/Text';

function Paragraph(props) {
  function spans(spans) {
    return spans.map((_text) => <Text level={{ lg: 'span' }} {..._text} />);
  }

  let _spans = spans(props.spans);
  return <Text text={_spans} level={props.level} style={props.style} />;
}

Paragraph.defaultProps = {
  spans: [],
  style: {},
  level: { lg: 'h5' },
};

export default Paragraph;
