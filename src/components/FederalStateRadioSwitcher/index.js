import React from 'react';
import { map } from 'lodash';
import {
  Radio, 
  Row,
  Badge,
} from 'antd';

import { FEDERAL_STATE_RADIO_BUTTONS } from '../../constants';
import './style.scss';

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
                        className="federal-state-radio-group"
                        >
                        {map(FEDERAL_STATE_RADIO_BUTTONS, (key) => {
                            return (
                                <RadioButton key={key} value={key}>
                                    <Badge key={key} count={this.props.eventsCounts[key]}>
                                        {key}
                                    </Badge>
                                </RadioButton>
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
