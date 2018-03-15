import React from 'react';
import PropTypes from 'prop-types';

class TalentTooltip extends React.Component {
    render() {
        return(
            <div className='talent-tooltip' >
                <div className='left-arrow' />
                <strong>{ this.props.title }</strong>
                <hr/>
                { this.props.desc }
                { this.props.hasPoints ?
                    <div>
                        <hr/>
                        Max. points: { this.props.maxPoints }
                    </div>
                    : null
                }
            </div>
        );
    }
}

TalentTooltip.propTypes = {
    title:      PropTypes.string.isRequired,
    desc:       PropTypes.string.isRequired,
    hasPoints:  PropTypes.bool.isRequired,
    maxPoints:  PropTypes.number
}

export { TalentTooltip };