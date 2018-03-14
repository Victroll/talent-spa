import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-toolbox/lib/tooltip';

const TalentTooltip = ({children, talentInfo}) => {
    const TooltippedComponent = Tooltip(({desc, hasPoints, initPoints, maxPoints, children, props}) =>
        
        <div {...props}>
        {children}
            <hr/>
            <strong>Description</strong>
            <br/>
            { desc }
        </div>
    );

    

    return (
        <TooltippedComponent
        children={ children }
        talentInfo={ talentInfo }
        tooltip={ talentInfo.name }
        />
    );
}

TalentTooltip.propTypes = {
    children:   PropTypes.any.isRequired,
    talentInfo: PropTypes.object.isRequired
}

export {TalentTooltip};