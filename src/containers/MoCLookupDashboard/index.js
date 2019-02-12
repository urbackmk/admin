import React from 'react';
import { connect } from 'react-redux';

import mocStateBranch from '../../state/mocs';

import MocLookUp from '../../components/MocLookup';

class MoCLookUpDashboard extends React.Component {
    componentDidMount() {
        const {
            requestMocIds,
        } = this.props;
        requestMocIds()
    }

    render() {
        const {
            allMocNamesIds
        } = this.props;
        return (
            <MocLookUp 
                allMocNamesIds={allMocNamesIds}
            />
        );
    }
}

const mapStateToProps = state => ({
  allMocNamesIds: mocStateBranch.selectors.getAllMocsIds(state),
});

const mapDispatchToProps = dispatch => ({
  requestMocIds: () => dispatch(mocStateBranch.actions.requestMocIds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoCLookUpDashboard);
