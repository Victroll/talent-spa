import React from 'react';
import { connect } from 'react-redux';
import { TALENT_TREE_CONTAINER_ID } from '../constants/names';
import Talent from '../components/talent';
import Draggable from 'gsap/Draggable';
import * as Actions from '../actions';
import '../styles/index.css';

class TalentTree extends React.Component {
    constructor(props) {
        super(props);

        this.addNewTalent = this.addNewTalent.bind(this);
    }

    componentDidUpdate() {
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
            onClick: () => {
            }
        });
    }

    addNewTalent() {
        this.props.addNewTalent(
            <Talent id={ "talent" + this.props.talents.length }
            key={ "talent" + this.props.talents.length } />
        );
    }

    render() {
        const { talents } = this.props;

        return (
            <div className="talent-tree-container" 
            id={ TALENT_TREE_CONTAINER_ID }>
                { talents }
                <button onClick={ this.addNewTalent }>+</button>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        talents: store.talents
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewTalent: (talent) => dispatch(Actions.addNewTalent(talent))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalentTree);