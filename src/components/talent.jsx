import React from 'react';
import { connect } from 'react-redux';
import '../styles/index.css';

class Talent extends React.Component {
    constructor(props) {
        super(props);
        this.showImage = this.showImage.bind(this);
    }
    
    showImage() {
		var canvas = document.getElementById(this.props.id + "Canvas");
        var ctx = canvas.getContext('2d');
        var img = document.getElementById(this.props.id + "Img");
        ctx.drawImage(img, 
            this.props.icon.posX * 128, 
            this.props.icon.posY * 128, 128, 128, 0, 0, 80, 80);

        if (this.props.hasPoints) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(50, 60, 30, 20);
            ctx.font = "15pt Roboto";
            ctx.fillStyle = 'yellow';
            ctx.fillText(this.props.initPoints + '/' + this.props.maxPoints, 50, 78);
        }
    }

    componentDidUpdate() {
        this.showImage();
    }
    
    render() {
        return (
            <div id={ this.props.id } className="talent" >
                <canvas id={ this.props.id + 'Canvas' } 
                height="80" 
                width="80">
                    <img src="./images/icons/full.png" id={ this.props.id + 'Img' } 
                    onLoad={ this.showImage }
                    alt='' />
                </canvas>
            </div>
        );
    }
}

const mapStateToProps = function(store, ownProps) {
    const talentInfo = store.talents[ownProps.id + 'Canvas'];
    return {
        name: talentInfo.name,
        icon: {
            posX: talentInfo.posX,
            posY: talentInfo.posY
        },
        description: talentInfo.desc,
        hasPoints: talentInfo.hasPoints,
        initPoints: talentInfo.initPoints,
        maxPoints: talentInfo.maxPoints,
        triggersTalent: talentInfo.triggersTalent
    }
}

export default connect(
    mapStateToProps
)(Talent);