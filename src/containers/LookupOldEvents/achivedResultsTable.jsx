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
