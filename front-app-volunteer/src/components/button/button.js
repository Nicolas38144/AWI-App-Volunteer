import React from "react";

import './button.css';

export default function Button(props) {
    return (     

        <div className="button">
            <button
                style={{
                    color: props.textColor,
                    backgroundColor: props.bgColor,
                    cursor: 'pointer',
                }}
            >
                {props.text}
            </button>
        </div>
    )
}