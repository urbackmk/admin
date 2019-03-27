import React from 'react';
import { connect } from 'react-redux';

import mocStateBranch from '../../state/mocs';
import selectionStateBranch from '../../state/selections';

import AddPersonForm from '../../components/AddPersonForm';
import MocLookUp from '../../components/MocLookup';

class MoCLookUpDashboard extends React.Component {
    componentDidMount() {
        const {
            requestMocIds,
        } = this.props;
        requestMocIds();
    }

    render() {
        const {
            allMocNamesIds,
            saveCandidate,
        } = this.props;
        return (
            <div>
            <MocLookUp 
                allMocNamesIds={allMocNamesIds}
            />
            <h1>Add a candidate</h1>
            
            <AddPersonForm 
                saveCandidate={saveCandidate}
            />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  allMocNamesIds: mocStateBranch.selectors.getAllMocsIds(state),
});

const mapDispatchToProps = dispatch => ({
    requestMocIds: () => dispatch(mocStateBranch.actions.requestMocIds()),
    saveCandidate: (person) => dispatch(mocStateBranch.actions.saveCandidate(person)),
    changeMode: (value) => dispatch(selectionStateBranch.actions.changeMode(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoCLookUpDashboard);
