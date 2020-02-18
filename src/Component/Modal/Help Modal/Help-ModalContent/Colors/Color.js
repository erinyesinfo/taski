import React, { Component } from 'react';

class Color extends Component {
    handleColor = color => this.props.handleColor(color);
    render() {
        const { color } = this.props;
        const inlineStyling = { background: color };
        return (
            <div className='colors-color' onClick={() => this.handleColor(color)}
                key={color}    
                style={inlineStyling}>
            </div>
        );
    };
};

export default Color;
