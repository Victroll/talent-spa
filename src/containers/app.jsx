import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Calculator from '../components/calculator';

class App extends React.Component {
    render () {
        const { value, actions } = this.props;
        return (
            <Calculator actions={ actions } value={ value } />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        value: store.value
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            addOne: () => dispatch(Actions.addOne()),
            substractOne: () => dispatch(Actions.substractOne()),
            doubleValue: () => dispatch(Actions.doubleValue())
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);