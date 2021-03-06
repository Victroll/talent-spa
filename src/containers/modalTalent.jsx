import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import FormIcon from '../components/formIcon';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import { Row, Col} from 'react-flexbox-grid';
import TalentList from './talentList';

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
            { label: 'Save', id: 'save-talent', onClick: this.updateTalent },
            { label: 'Cancel', id: 'cancel-talent', onClick: this.props.closeModal }
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
        if (props.isOpen && !this.props.isOpen)
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
                        <Input id='talent-name' type='text' label='Name' value={ this.state.name } maxLength={ 24 } onChange={ (value) => this.updateField('name', value) } />
                    </Col>
                </Row>
                <Row>
                    <Col xs={ 12 }>
                        <Input id='talent-desc' type='text' multiline label='Description' value={ this.state.desc } onChange={ (value) => this.updateField('desc', value) } />
                    </Col>
                </Row>
                <Row center='xs'>
                        <FormIcon />
                </Row>
                <Checkbox className='talent-hasPoints' checked={ this.state.hasPoints } label={ 'Has points?' } onChange={ this.checkPoints } />
                { this.state.hasPoints ?
                    <Row>
                        <Col xs={ 2 }>
                            <Input id='talent-initial-points' type='number' label='Initial points' value={ this.state.initPoints } onChange={(value) => this.updateField('initPoints', value)} />
                        </Col>
                        <Col xs={ 2 }>
                            <Input id='talent-max-points' type='number' label='Max. points' value={ this.state.maxPoints } onChange={(value) => this.updateField('maxPoints', value)} />
                        </Col>
                    </Row>
                    : null }
                { this.props.otherTalents.length ?  
                <Checkbox checked={ this.state.triggersTalent } label='Triggers another talent?' onChange={ this.checkTrigger } />
                : null}
                { this.state.triggersTalent ? 
                    <Row>
                        <Col xs={ 5 }>
                            <TalentList 
                            talents={ this.props.otherTalents }
                            preselected={ this.props.trigger } />
                        </Col>
                    </Row>
                    : null}
            </Dialog>           
        );
    }
}

const mapStatsToProps = (store) => {
    const values = store.talents[store.currentTalentId];
    const otherTalents = [];

    for (let key in store.talents)
        if (key !== store.currentTalentId)
            otherTalents.push(store.talents[key]);

    return {
        isOpen: store.modalTalent.isOpen,
        name: values ? values.name : '',
        desc: values ? values.desc : '',
        hasPoints: values ? values.hasPoints : false,
        initPoints: values ? values.initPoints : 0,
        maxPoints: values ? values.maxPoints: 1,
        triggersTalent: values ? values.triggersTalent : false,
        trigger: values ? store.modalTalent.trigger : new Set(),
        otherTalents: otherTalents
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