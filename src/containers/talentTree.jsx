import React from 'react';
import { connect } from 'react-redux';
import ModalTalent from './modalTalent';
import ModalSettings from './modalSettings';
import ModalList from './modalList';
import ModalSave from './modalSave';
import Talent from '../components/talent';
import Draggable from 'gsap/Draggable';
import * as Actions from '../actions';
import ModalIcon from './modalIcon';
import { Row, Col} from 'react-flexbox-grid';
import Button from 'react-toolbox/lib/button/Button';

class TalentTree extends React.Component {
    constructor(props) {
        super(props);

        this.addNewTalent = this.addNewTalent.bind(this);
        this.openModalTalent = this.openModalTalent.bind(this);
        this.openModalSettings = this.openModalSettings.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.increaseTalentPoints = this.increaseTalentPoints.bind(this);
        this.decreaseTalentPoints = this.decreaseTalentPoints.bind(this);
        this.removeTalent = this.removeTalent.bind(this);
        this.openModalSave = this.openModalSave.bind(this);
        this.loadTalents = this.loadTalents.bind(this);

        this.state = {
            isRemoving: false
        };
    }

    openModalTalent(id) {
        this.props.openModalTalent(id);
    }

    addNewTalent() {
        let id = 'talent' + Object.keys(this.props.talentsObj).length;
        this.props.addNewTalent(
            <Talent id={ id }
            key={ "talent" + Object.keys(this.props.talentsObj).length } />
        );
    }

    componentDidUpdate(prevProps) {
        const that = this;

        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.talentsToShow.forEach((talent, index) => {
                this.props.addLoadedTalent(
                    <Talent id={ talent.id.split('Canvas')[0] }
                    key={ talent.id.split('Canvas')[0] } />,
                    index
                );
            });
        }

        this.draggable = Draggable.create(".talent",
        {
            zIndexBoost: false,
            type: that.props.editMode ? "x,y" : "disabled",
            edgeResistance: 1,
            bounds: "#main-container",
            throwProps: true,
            liveSnap: true,
            snap: {
                x: (endValue) => {
                    return Math.round(endValue / 80) * 80;
                },
                y: (endValue) => {
                    return Math.round(endValue / 80) * 80;
                }
            },
            onClick: (event) => {
                if (that.props.editMode && that.state.isRemoving && event.button === 0) {
                    that.props.removeTalent(event.target.id);
                    that.setState({...that.state,
                        isRemoving: false
                    });
                } else if (that.props.editMode && event.button === 0)
                    that.openModalTalent(event.target.id)
                else if (!that.props.editMode && event.button === 0)
                    that.increaseTalentPoints(event.target.id);
                else if (!that.props.editMode && event.button === 2)
                    that.decreaseTalentPoints(event.target.id);
            }
        });
    }

    increaseTalentPoints(id) {
        this.props.increaseTalentPoints(id);
    }

    decreaseTalentPoints(id) {
        this.props.decreaseTalentPoints(id);
    }

    openModalSettings() {
        this.props.openModalSettings();
    }

    changeMode() {
        if (this.props.editMode) {
            this.props.activePlayMode();
            if (this.draggable) this.draggable.forEach((current) => current.disable());
        } else {
            this.props.activeEditMode();
            if (this.draggable) this.draggable.forEach((current) => current.enable());
        }
    }

    removeTalent() {
        this.setState({...this.state,
            isRemoving: true
        });
    }

    openModalSave() {
        this.props.openModalSave();
    }

    loadTalents() {
        this.props.openModalList();
    }

    render() {
        const { talentsObj } = this.props;
        const talents = [];

        for (let id in talentsObj)
            talents.push(talentsObj[id].talent);

        return (
            <div className='main-container'
            id='main-container'>
                <Row>
                    <Col xs={ 2 }>
                        <Button id='config-talents' icon='settings' onClick={ this.openModalSettings } raised disabled={ !this.props.editMode }/>
                    </Col>
                    <Col xs={ 2 }>
                        <Button id='save-talents' icon='save' onClick={ this.openModalSave } raised disabled={ !this.props.editMode }/>
                    </Col>
                    <Col xs={ 2 }>
                        <Button id='load-talents' icon='cloud_download' onClick={ this.loadTalents } raised disabled={ !this.props.editMode }/>
                    </Col>
                    <Col xs={ 2 }>
                        <Button id='add-talent' icon='add' onClick={ this.addNewTalent } raised disabled={ !this.props.editMode } />
                    </Col>
                    <Col xs={ 2 }>
                        <Button id='remove-talent' icon='remove' onClick={ this.removeTalent } raised disabled={ !this.props.editMode } />
                    </Col>
                    <Col xs={ 2 }>
                        <Button id='play-talents' 
                        icon={ this.props.editMode ? 'play_arrow' : 'mode_edit'} raised onClick={ this.changeMode } />
                    </Col>
                </Row>
                <hr />
                <canvas id={ 'talent-tree-background' }
                className='talent-tree-background' ></canvas>
                { talents.length ? 
                    <Row style={{ position: 'relative' }}>
                        { talents }
                    </Row>
                    : null }
                <ModalTalent />
                <ModalIcon />
                <ModalSettings />
                <ModalList />
                <ModalSave />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        talentsObj: store.talents,
        editMode: store.editMode,
        talentsToShow: store.talentsToShow,
        isLoading: store.isLoading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewTalent: (talent) => dispatch(Actions.addNewTalent(talent)),
        openModalTalent: (id) => dispatch(Actions.openModalTalent(id)),
        openModalSettings: () => dispatch(Actions.openModalSettings()),
        openModalList: () => dispatch(Actions.openModalList()),
        openModalSave: () => dispatch(Actions.openModalSave()),
        activeEditMode: () => dispatch(Actions.activeEditMode()),
        activePlayMode: () => dispatch(Actions.activePlayMode()),
        increaseTalentPoints: (id) => dispatch(Actions.increaseTalentPoints(id)),
        decreaseTalentPoints: (id) => dispatch(Actions.decreaseTalentPoints(id)),
        removeTalent: (id) => dispatch(Actions.removeTalent(id)),
        addLoadedTalent: (talent, index) => dispatch(Actions.addLoadedTalent(talent, index))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalentTree);