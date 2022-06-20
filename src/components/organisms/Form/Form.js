import React from 'react';
import FormUtil from '../../../stores/utils/FormUtil';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import ErrorCard from '../../atoms/ErrorCard/ErrorCard';
import Popover from '../../atoms/Popover/Popover';
import Spacing from '../../atoms/Spacing/Spacing';

function Form(props) {
  let fields_space = <Spacing space={{ lg: 10 }} />;
  let _errMsgs = FormUtil.errMsgs(props.errorMessages);
  return (
    <Popover
      appear={_errMsgs}
      trigger={
        <Align align={'start'}>
          <Card>
            {props.fields.map((field, key) => (
              <React.Fragment key={key}>
                {key !== 0 && fields_space}
                {field}
              </React.Fragment>
            ))}
          </Card>
        </Align>
      }
      content={
        _errMsgs && (
          <React.Fragment>
            <Spacing space={{ lg: 20 }} />
            <ErrorCard>
              <Align align={{ lg: 'start' }}>{_errMsgs}</Align>
            </ErrorCard>
          </React.Fragment>
        )
      }
    />
  );
}

export default Form;
