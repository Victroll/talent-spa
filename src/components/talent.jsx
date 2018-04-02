import React from 'react';
import { connect } from 'react-redux';
import '../styles/index.css';
import { TalentTooltip } from './tooltipped';

class Talent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false
        };

        this.showImage = this.showImage.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
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
            ctx.fillText(this.props.currentPoints + '/' + this.props.maxPoints, 50, 78);
        }

        if (!this.props.editMode && this.props.disabled) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, 80, 80);
        }
    }

    componentDidUpdate() {
        this.showImage();
    }

    showTooltip() {
        this.setState({...this.state, showTooltip: true});
    }

    hideTooltip() {
        this.setState({...this.state, showTooltip: false});
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.name !== undefined;
    }
    
    render() {
        return (
            <div id={ this.props.id } className="talent" 
            style={ this.state.showTooltip ? {zIndex: '4'} : {} } >
                <canvas id={ this.props.id + 'Canvas' }
                onMouseOver={ this.showTooltip } 
                onMouseOut={ this.hideTooltip }
                style={{borderRadius: '2px'}}
                height="80" 
                width="80">
                    <img src="./images/icons/full.png" id={ this.props.id + 'Img' } 
                    onLoad={ this.showImage }
                    alt='' />
                </canvas>
                { this.state.showTooltip ?
                    <TalentTooltip 
                    title={ this.props.name }
                    desc={ this.props.description }
                    hasPoints={ this.props.hasPoints }
                    maxPoints={ this.props.maxPoints } />
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = function(store, ownProps) {
    const talentInfo = store.talents[ownProps.id + 'Canvas'];
    // When this talent has been removed
    if (talentInfo === undefined) return {};
    return {
        name: talentInfo.name,
        icon: {
            posX: talentInfo.posX,
            posY: talentInfo.posY
        },
        description: talentInfo.desc,
        hasPoints: talentInfo.hasPoints,
        initPoints: talentInfo.initPoints,
        currentPoints: talentInfo.currentPoints,
        maxPoints: talentInfo.maxPoints,
        triggersTalent: talentInfo.triggersTalent,
        disabled: talentInfo.disabled,
        editMode: store.editMode
    }
}

export default connect(
    mapStateToProps
)(Talent);