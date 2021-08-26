import React, { Component } from 'react';
import './Spot.css';

export default class Spot extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const {
            width,
            col,
            row,
            isEnd,
            isStart,
            isBarrier,
            neighbors,
            parent,
            visited,
            distance,
            hScore,
            gScore,
            fScore,
            mouseIsPressed,
            onMouseDown,
            onMouseEnter,
            onMouseUp
        } = this.props;

        const spotType = isEnd ? 'spot-end' :
            isStart ? 'spot-start' :
            isBarrier ? 'spot-barrier' :
            ''
        return (
            <div
            	id={`spot-${row}-${col}`}
            	className={`spot ${spotType}`}
                style={{width: width, height: width}}
            	onMouseDown={() => onMouseDown(row, col)}
        		onMouseEnter={() => onMouseEnter(row, col)}
        		onMouseUp={() => onMouseUp()}
        	></div>
        )
    }
}