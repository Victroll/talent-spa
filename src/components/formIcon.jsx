import React from 'react';
import * as Actions from '../actions';
import { connect } from 'react-redux';

class FormIcon extends React.Component {
    constructor(props) {
        super(props);
        this.showImage = this.showImage.bind(this);
    }

    showImage() {
		let icon = document.createElement('img');
		icon.src = './images/icons/full.png';
		icon.onload = () => {
			let canvas = document.getElementById('iconCanvas');
			let ctx = canvas.getContext('2d');
            ctx.drawImage(icon, 
                this.props.posX * 128, 
                this.props.posY * 128, 128, 128, 0, 0, 80, 80);
		}

    }

    componentDidMount() {
		this.showImage();
    }
    
    componentDidUpdate() {
		this.showImage();
	}
    
    render() {
        return (
            <canvas id='iconCanvas' height='80' width='80' 
            onClick={ this.props.openIconModal }></canvas>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        id: store.currentTalentId,
        posX: store.formIcon.posX,
        posY: store.formIcon.posY
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openIconModal: () => dispatch(Actions.openModalIcon())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormIcon);