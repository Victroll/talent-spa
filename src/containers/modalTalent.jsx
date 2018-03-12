import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Rodal from 'rodal';
import FormIcon from '../components/formIcon';
import 'rodal/lib/rodal.css';
import Button from 'react-toolbox/lib/button/Button';

class ModalTalent extends React.Component {

    render() {
        return (
            <Rodal visible={ this.props.isOpen } 
            onClose={ this.props.closeModal }
            height={ 400 } >
                <h3>Talent configuration</h3>
                <hr/>
                <form>
                    <div className='row'>
                        <div className='large-12 columns'>
                            <label>Talent name
                                <input type='text' placeholder='talent name' />
                            </label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='large-12 columns'>
                            <label>Talent icon
                                <br />
                                <FormIcon />
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <Button onClick={ this.props.updateTalent } label='Ok' raised />
                    <Button onClick={ this.props.closeModal } label='Cancel' raised />
                </form>
            </Rodal>               
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