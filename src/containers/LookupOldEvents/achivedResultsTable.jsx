import React from 'react';
import { connect } from 'react-redux';
import {
    Table,
} from 'antd';

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
            dataIndex: 'iconFlag',
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
