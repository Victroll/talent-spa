import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Rodal from 'rodal';
import FormIcon from '../components/formIcon';
import 'rodal/lib/rodal.css';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';

class ModalTalent extends React.Component {

    actions = [
        { label: 'Save', onClick: this.props.updateTalent },
        { label: 'Cancel', onClick: this.props.closeModal }
    ];

    render() {
        return (
            <Dialog className='modal' title='Talent configuration' actions={ this.actions } active={ this.props.isOpen }>
                <Input type='text' label='Name' maxLength={ 12 } />
                <Input type='text' multiline label='Description' maxLength={ 12 } />               
                <FormIcon />
            </Dialog>           
        );
    }
}

const mapStatsToProps = (store) => {
    return {
        isOpen: store.modalTalent.isOpen
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(Actions.closeModalTalent()),
        updateTalent: () => dispatch(Actions.updateTalent())
    };
}

export default connect(
    mapStatsToProps,
    mapDispatchToProps
)(ModalTalent);