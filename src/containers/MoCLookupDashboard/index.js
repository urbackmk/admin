import React from 'react';
import { connect } from 'react-redux';

import mocStateBranch from '../../state/mocs';
import selectionStateBranch from '../../state/selections';

import AddPersonForm from '../../components/AddPersonForm';
import MocLookUp from '../../components/MocLookup';
import FederalStateRadioSwitcher from '../../components/FederalStateRadioSwitcher';
import MocTable from '../../components/MocTable';

class MoCLookUpDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.onRadioChange = this.onRadioChange.bind(this);
    }

    componentDidMount() {
        const {
            requestMocIds,
            changeMode,
            getCongressBySession,
        } = this.props;
        requestMocIds();
        getCongressBySession('116');
        changeMode('candidate')
    }

    onRadioChange({ target }) {
        const {
          changeMocEndpoint
        } = this.props;
        changeMocEndpoint(target.value)
    }

    render() {
        const {
            allMocNamesIds,
            saveCandidate,
            radioValue,
            candidateKeySavePath,
            the116theCongress,
        } = this.props;
        return (
            <div>
                <FederalStateRadioSwitcher 
                    onRadioChange={this.onRadioChange}
                    defaultValue={radioValue}
                />
                {/* <MocLookUp 
                    allMocNamesIds={allMocNamesIds}
                /> */}
                <MocTable mocs={the116theCongress} />
                <AddPersonForm 
                    usState={radioValue !== 'federal' ? radioValue : ''}
                    saveCandidate={saveCandidate}
                    candidateKeySavePath={candidateKeySavePath}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  allMocNamesIds: mocStateBranch.selectors.getAllMocsIds(state),
  radioValue: selectionStateBranch.selectors.getActiveFederalOrState(state),
  candidateKeySavePath: selectionStateBranch.selectors.getPeopleNameUrl(state),
  the116theCongress: mocStateBranch.selectors.get116thCongress(state),
});

const mapDispatchToProps = dispatch => ({
    getCongressBySession: (congressSession) => dispatch(mocStateBranch.actions.getCongressBySession(congressSession)),
    requestMocIds: () => dispatch(mocStateBranch.actions.requestMocIds()),
    saveCandidate: (path, person) => dispatch(mocStateBranch.actions.saveCandidate(path, person)),
    changeMode: (value) => dispatch(selectionStateBranch.actions.changeMode(value)),
    changeMocEndpoint: (value) => dispatch(selectionStateBranch.actions.changeFederalStateRadio(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoCLookUpDashboard);
