import React from 'react';
import { connect } from 'react-redux';
import {
    Table,
} from 'antd';

import activism from '../../assets/img/icon-flags/activism.svg';
import campaign from '../../assets/img/icon-flags/campaign.svg';
import hrOne from '../../assets/img/icon-flags/hr-one.svg';
import inPerson from '../../assets/img/icon-flags/in-person.svg';
import mfol from '../../assets/img/icon-flags/mfol.svg';
import nextGen from '../../assets/img/icon-flags/next-gen.svg';
import phoneIn from '../../assets/img/icon-flags/phone-in.svg';
import staff from '../../assets/img/icon-flags/staff.svg';

const iconFlagMap = {
    activism: activism,
    campaign: campaign,
    'hr-one': hrOne,
    'in-person': inPerson,
    mfol: mfol,
    'next-gen': nextGen,
    'phone-in': phoneIn,
    staff: staff,
};

const ResultsTable = ({ allOldEvents }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'displayName',
            key: 'displayName',
        }, 
        {
            title: 'Meeting Type',
            dataIndex: 'meetingType',
            key: 'meetingType',
        },
        {
            title: 'Icon',
            render: (text, record) => <img
                src={iconFlagMap[record.iconFlag]}
                // not sure why the below line isn't working
                // src={`../../assets/img/icon-flags/${record.iconFlag}.svg`}
                alt={record.iconFlag}
                width={30} 
            />,
            key: 'iconFlag',
        },
        {
            title: 'State',
            render: (text, record) => {
                // record.state is required
                if (record.district) {
                    return `${record.state}-${record.district === 'At-Large' ? '00' : record.district}`;
                }
                return record.state;
            },
            key: 'state',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Date',
            render: (text, record) => `${record.dateString} ${record.Time}`,
            key: 'dateString',
        },
        {
            title: 'ADA',
            dataIndex: 'ada_accessible',
            key: 'ada_accessible',
        },
        {
            title: 'Verified?',
            // this data doesn't exist yet
            // display as a checkbox in the future?
            dataIndex: 'verified',
            key: 'verified',
        },
    ];

    return (
        <Table dataSource={allOldEvents} columns={columns}/>
    );
};
    
function mapStateToProps(state) {
    return {
        allOldEvents: state.events.allOldEvents,
    };
}

export default connect(mapStateToProps)(ResultsTable);
