import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import FormIcon from '../components/formIcon';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import { Row, Col} from 'react-flexbox-grid';

class ModalTalent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            desc: this.props.desc,
            hasPoints: this.props.hasPoints,
            initPoints: this.props.initPoints,
            maxPoints: this.props.maxPoints,
            triggersTalent: this.props.triggersTalent
        };

        this.updateField = this.updateField.bind(this);
        this.updateTalent = this.updateTalent.bind(this);
        this.checkPoints = this.checkPoints.bind(this);
        this.checkTrigger = this.checkTrigger.bind(this);

        this.actions = [
            { label: 'Save', onClick: this.updateTalent },
            { label: 'Cancel', onClick: this.props.closeModal }
        ];
    }

    updateTalent() {
        this.props.updateTalent(this.state);
    }

    updateField(field, value) {

        if (field === 'initPoints' && value > this.state.maxPoints) return;
        if (field === 'maxPoints' && value < this.state.initPoints) return;

        this.setState({...this.state,
            [field]: value
        });
    }

    checkPoints() {
        this.setState({...this.state,
            hasPoints: !this.state.hasPoints
        });
    }

    checkTrigger() {
        this.setState({...this.state,
            triggersTalent: !this.state.triggersTalent
        });
    }

    componentWillReceiveProps(props) {
        this.setState({...this.state,
            name: props.name,
            desc: props.desc,
            hasPoints: props.hasPoints,
            initPoints: props.initPoints,
            maxPoints: props.maxPoints,
            triggersTalent: props.triggersTalent
        });
    }

    render() {
        return (
            <Dialog className='modal' title='Talent configuration' 
            actions={ this.actions } active={ this.props.isOpen }
            onOverlayClick={ this.props.closeModal } >
                <Row>
                    <Col xs={ 12 }>
                        <Input type='text' label='Name' value={ this.state.name } maxLength={ 12 } onChange={ (value) => this.updateField('name', value) } />
                    </Col>
                </Row>
                <Row>
                    <Col xs={ 12 }>
                        <Input type='text' multiline label='Description' value={ this.state.desc } onChange={ (value) => this.updateField('desc', value) } />
                    </Col>
                </Row>
                <Row center='xs'>
                        <FormIcon />
                </Row>
                <Checkbox checked={ this.state.hasPoints } label={ 'Has points?' } onChange={ this.checkPoints } />
                { this.state.hasPoints ?
                    <Row>
                        <Col xs={ 2 }>
                            <Input type='number' label='Initial points' value={ this.state.initPoints } onChange={(value) => this.updateField('initPoints', value)} />
                        </Col>
                        <Col xs={ 2 }>
                            <Input type='number' label='Max. points' value={ this.state.maxPoints } onChange={(value) => this.updateField('maxPoints', value)} />
                        </Col>
                    </Row>
                    : null }
                <Checkbox checked={ this.state.triggersTalent } label={ 'Triggers another talent?' } onChange={ this.checkTrigger } />
            </Dialog>           
        );
    }
}

const mapStatsToProps = (store) => {
    const values = store.talents[store.currentTalentId];
    return {
        isOpen: store.modalTalent.isOpen,
        name: values ? values.name : '',
        desc: values ? values.desc : '',
        hasPoints: values ? values.hasPoints : false,
        initPoints: values ? values.initPoints : 0,
        maxPoints: values ? values.maxPoints: 1,
        triggersTalent: values ? values.triggersTalent : false
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(Actions.closeModalTalent()),
        updateTalent: (state) => dispatch(Actions.updateTalent(state))
    };
}

export default connect(
    mapStatsToProps,
    mapDispatchToProps
)(ModalTalent);