import React from 'react';
import { map } from 'lodash';
import {
  List, Radio, Row,
} from 'antd';

import EventCard from '../../components/EventCard';
import { FEDERAL_STATE_RADIO_BUTTONS, PENDING_EVENTS_TAB } from '../../constants';


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class FederalStateRadioSwitcher extends React.Component {
    constructor(props) {
        super(props);
        this.onRadioChange = this.onRadioChange.bind(this);
    }

    onRadioChange({target}) {
        const {
          changeRadioButton
        } = this.props;
        changeRadioButton(target.value)
    }

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
                        onChange={this.onRadioChange}
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
