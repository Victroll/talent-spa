import React from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'react-flexbox-grid';
import { closeModalSettings, updateTalentTreeSettings } from '../actions';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';

class ModalSettings extends React.Component {
    constructor(props) {
        super(props);

        this.setTrigger = this.setTrigger.bind(this);
        this.saveSettings = this.saveSettings.bind(this);

        this.actions = [
            { label: 'Save', id: 'save-talent', onClick: this.saveSettings },
            { label: 'Cancel', id: 'cancel-talent', onClick: this.props.closeModal }
        ];

        this.state = {
            triggerValue: this.props.settings.triggerValue
        };
    }

    setTrigger(value) {
        this.setState({...this.state,
            triggerValue: value
        });
    }

    saveSettings() {
        this.props.updateSettings(this.state);
    }

    render() {
        return (
            <Dialog className='modal' title='Talent tree settings' 
            actions={ this.actions } active={ this.props.isOpen }
            onOverlayClick={ this.props.closeModal } >
                <Row>
                    <Col xs={ 12 }>
                        Trigger talents with
                        <hr/>
                    </Col>
                </Row>
                    <RadioGroup name='trigger' value={ this.state.triggerValue }
                    onChange={ this.setTrigger }>
                        <RadioButton label='Points at max' value='max'/>
                        <RadioButton label='One or more points' value='min'/>
                    </RadioGroup>
            </Dialog>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        isOpen: store.modalSettings.isOpen,
        settings: store.talentTreeSettings
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModalSettings()),
        updateSettings: (state) => dispatch(updateTalentTreeSettings(state))
    };
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ModalSettings);