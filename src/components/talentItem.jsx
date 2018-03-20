import React from 'react';
import ListItem from 'react-toolbox/lib/list/ListItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTrigger } from '../actions';

class TalentItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 'talentItem' + props.id,
            isSelected: props.isSelected,
            value: 'min'
        };

        this.showImage = this.showImage.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    showImage() {
        var canvas = document.getElementById(this.state.key);
        var ctx = canvas.getContext('2d');
        var img = document.getElementById(this.state.key + 'Img');
        ctx.drawImage(img,
            this.props.posX * 128,
            this.props.posY * 128, 128, 128, 0, 0, 40, 40);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isSelected !== prevState.isSelected)
            this.state.isSelected ?
            this.props.addTrigger() :
            this.props.removeTrigger();
    }

    selectItem() {
        this.setState({...this.state,
            isSelected: !this.state.isSelected
        });
    }

    render() {
        return(
            <ListItem 
            key={ this.state.key } 
            caption={ this.props.caption }
            selectable
            className={ this.state.isSelected ? 'item-selected' : '' }
            onClick={ this.selectItem } >
                <canvas id={ this.state.key } height='40' width='40'>
                    <img src='./images/icons/full.png' id={ this.state.key + 'Img' }
                    onLoad={ this.showImage }
                    alt='' />
                </canvas>
            </ListItem>
        );
    }
}

TalentItem.propTypes = {
    id:         PropTypes.string.isRequired,
    caption:    PropTypes.string.isRequired,
    posX:       PropTypes.number.isRequired,
    posY:       PropTypes.number.isRequired
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addTrigger: () => dispatch(updateTrigger(props.id, true)),
        removeTrigger: () => dispatch(updateTrigger(props.id, false))
    };
}

export default connect(null, mapDispatchToProps)(TalentItem);