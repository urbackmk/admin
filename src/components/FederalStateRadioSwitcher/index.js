import React from 'react';
import { map } from 'lodash';
import {
  Radio, 
  Row,
} from 'antd';

import { FEDERAL_STATE_RADIO_BUTTONS } from '../../constants';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class FederalStateRadioSwitcher extends React.Component {

    render () {
        return (
            <React.Fragment>
                <Row
                    type="flex"
                    justify="center"
                >
                    <RadioGroup 
                        defaultValue={FEDERAL_STATE_RADIO_BUTTONS[0]}
                        buttonStyle="solid"
                        onChange={this.props.onRadioChange}
                        >
                        {map(FEDERAL_STATE_RADIO_BUTTONS, (key) => {
                            return (
                                <RadioButton key={key} value={key}>{key}</RadioButton>
                            )
                        })
                        }
                    </RadioGroup>
                </Row>
            </React.Fragment>
        )
    }
}

export default FederalStateRadioSwitcher;
