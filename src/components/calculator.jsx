import React from 'react';

class Calculator extends React.Component {
    render() {
        const { actions } = this.props;
        return (
            <div className="calculator">
                <p>{ this.props.value }</p>
                <button onClick={ actions.addOne }>+1</button>
                <button onClick={ actions.substractOne }>-1</button>
                <button onClick={ actions.doubleValue }>{String.fromCharCode(215)}2</button>
            </div>
        );
    }
}

export default Calculator;