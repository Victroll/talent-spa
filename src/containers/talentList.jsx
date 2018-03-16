import React from 'react';
import PropTypes from 'prop-types'
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

class TalentList extends React.Component {
    showImage(i, talent) {
        var canvas = document.getElementById(i);
        var ctx = canvas.msGetInputContext('2d');
        var img = document.getElementById(i + 'Img');
        ctx.drawImage(img,
            talent.posX * 128,
            talent.posY * 128, 128, 128, 0, 0, 40, 40);
    }

    renderTalent(talent, i) {
        return (
            <ListItem caption={ talent.name }>
                <canvas id={ i } height='40' width='40'>
                    <img src="./images/icons/full.png" id={ this.props.id + 'Img' } 
                    onLoad={ () => {this.showImage(i, talent)} }
                    alt='' />
                </canvas>
            </ListItem>
        );
    }

    render() {
        return (
            <div>
                <List selectable ripple>
                    { this.props.talents.forEach((current, i) => this.renderTalent(current, i)) }
                </List>
            </div>
        );
    }
}

TalentList.propTypes = {
    talents: PropTypes.array
}

export default TalentList;