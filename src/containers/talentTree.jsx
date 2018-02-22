import React from 'react';
import { connect } from 'react-redux';
import { TALENT_TREE_CONTAINER_ID } from '../constants/names';
import Talent from '../components/talent';
import Draggable from 'gsap/Draggable';
import '../styles/index.css';

class TalentTree extends React.Component {
    componentDidMount() {
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

    render() {
        const { talents } = this.props;

        return (
            <div className="talent-tree-container" 
            id={ TALENT_TREE_CONTAINER_ID }>
                <Talent id={ "talent00" } xPos={ 0 } yPos={ 0 } />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        talents: store.talents
    };
}

export default connect(
    mapStateToProps
)(TalentTree);