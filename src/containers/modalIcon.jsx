import React from 'react';
import Rodal from 'rodal';
import * as Actions from '../actions';
import { connect } from 'react-redux';
import 'rodal/lib/rodal.css';
import Dialog from 'react-toolbox/lib/dialog/Dialog';

class ModalIcon extends React.Component {
    constructor(props) {
        super(props);

        this.showIcons = this.showIcons.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isOpen)
            setTimeout(this.showIcons, 100);
            //this.showIcons();
    }

    showIcons() {
		var mtx = this.props.iconMatrix;
		var canvas = document.getElementById('iconModalCanvas');
		var ctx = canvas.getContext('2d');

		for (var i = 0; i < 30; i++)
			for (var j = 0; j < 16; j++) {
				var icon = mtx[i][j];
				ctx.drawImage(icon, i * 128, j * 128, 128, 128, i * 128 + 10 * (i + 1), j * 128 + 10 * (j + 1), 128, 128);
			}
    }

    updateIconForm(event) {
        var canvas = document.getElementById('iconModalCanvas');
		var rect = canvas.getBoundingClientRect();
		var x = Math.round((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
		var y = Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);

		var ix = Math.floor(x / 138);
		var iy = Math.floor(y / 138);

		this.props.updateIcon(ix, iy);

		this.props.closeModal();
    }
    
    render() {
        return (
            <Dialog className='modal' theme={{body: 'no-padding'}} active={ this.props.isOpen }>
                <canvas id='iconModalCanvas' width="4140" height="2208"
                    onClick={ (e) => this.updateIconForm(e) }></canvas>
            </Dialog>
        );
    }
}

const mapStateToProps = (store) => {
    let mtx = [];
    for (var i = 0; i < 30; i++) {
        var r = [];
        for (var j = 0; j < 16; j++) {
            var icon = document.createElement('img');
            icon.src = './images/icons/full.png';
            r.push(icon);
        }
        mtx.push(r);
    }

    return {
        isOpen: store.modalIcon.isOpen,
        iconMatrix: mtx
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(Actions.closeModalIcon()),
        updateIcon: (x, y) => dispatch(Actions.updateFormICon(x, y))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalIcon);