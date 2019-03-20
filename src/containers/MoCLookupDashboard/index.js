import React from 'react';
import { connect } from 'react-redux';

import mocStateBranch from '../../state/mocs';

import AddPersonForm from '../../components/AddPersonForm';
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
            <div>
            <MocLookUp 
                allMocNamesIds={allMocNamesIds}
            />
            <h1>Add a candidate</h1>
            <AddPersonForm />
            </div>
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
