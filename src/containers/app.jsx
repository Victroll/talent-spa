import React from 'react';
import TalentTree from './talentTree';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class App extends React.Component {
    render () {
        return (
            <TalentTree />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        value: store.value
    };
}

export default connect(
    mapStateToProps
)(App);