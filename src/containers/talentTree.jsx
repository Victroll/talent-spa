import React from 'react';
import { connect } from 'react-redux';
import { TALENT_TREE_CONTAINER_ID } from '../constants/names';
import ModalTalent from './modalTalent';
import Talent from '../components/talent';
import Draggable from 'gsap/Draggable';
import * as Actions from '../actions';
import ModalIcon from './modalIcon';
import Button from 'react-toolbox/lib/button/Button';

class TalentTree extends React.Component {
    constructor(props) {
        super(props);

        this.addNewTalent = this.addNewTalent.bind(this);
        this.openModalTalent = this.openModalTalent.bind(this);
    }

    openModalTalent(id) {
        this.props.openModalTalent(id);
    }

    componentDidUpdate() {
        const that = this;

        Draggable.create(".talent",
        {
            type: "x,y",
            edgeResistance: 0.65,
            bounds: "#talent-tree-container",
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
                that.openModalTalent(event.target.id);
            }
        });
    }

    addNewTalent() {
        this.props.addNewTalent(
            <Talent id={ "talent" + Object.keys(this.props.talentsObj).length }
            key={ "talent" + Object.keys(this.props.talentsObj).length } />
        );
    }

    render() {
        const { talentsObj } = this.props;
        const talents = [];

        for (let id in talentsObj)
            talents.push(talentsObj[id].talent);

        return (
            <div className="talent-tree-container" 
            id={ TALENT_TREE_CONTAINER_ID }>
                <Button icon='add' onClick={ this.addNewTalent } raised/>
                <hr />
                { talents }
                <ModalTalent />
                <ModalIcon />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        talentsObj: store.talents
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewTalent: (talent) => dispatch(Actions.addNewTalent(talent)),
        openModalTalent: (id) => dispatch(Actions.openModalTalent(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalentTree);