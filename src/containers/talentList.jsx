import React from 'react';
import PropTypes from 'prop-types'
import List from 'react-toolbox/lib/list/List';
import TalentItem from '../components/talentItem';

class TalentList extends React.Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            className: 'talent-list bottom-shadow'
        };
    }

    showImage(i, talent) {
        var canvas = document.getElementById(i);
        var ctx = canvas.getContext('2d');
        var img = document.getElementById(i + 'Img');
        ctx.drawImage(img,
            talent.posX * 128,
            talent.posY * 128, 128, 128, 0, 0, 40, 40);
    }

    renderTalent(talent) {
        return (
            <TalentItem 
            key={ talent.talent.key }
            id={ talent.talent.key } 
            caption={ talent.name }
            posX={ talent.posX }
            posY={ talent.posY }
            isSelected={ this.props.preselected.has(talent.talent.key) } />
        );
    }

    handleScroll() {
        // Check list scrollTop
        let list = document.getElementsByClassName('talent-list')[0];

        if (list.scrollTop === 0)
            this.setState({...this.state, 
                className: 'talent-list bottom-shadow'
            });
        else if (list.scrollTop + list.offsetHeight === list.scrollHeight)
            this.setState({...this.state, 
                className: 'talent-list top-shadow'
            });
        else
            this.setState({...this.state, 
                className: 'talent-list top-bottom-shadow'
            });
    }

    render() {
        return (
            <div id='talent-list-div' onScroll={ this.handleScroll }>
                <List className={ this.state.className } selectable ripple>
                    { this.props.talents.map((current) => this.renderTalent(current)) }
                </List>
            </div>
        );
    }
}

TalentList.propTypes = {
    talents: PropTypes.array,
    preselected: PropTypes.any
}

export default TalentList;