import React from 'react';
import Color from './Color';
import './Colors.css';

const Colors = ({ colors, handleColor }) => {
    return (
        <div className='colors'>
            {colors.map(color => (
                    <Color key={color}
                        color={color}
                        handleColor={handleColor}
                    />
                )
            )}
        </div>
    );
};

export default Colors;