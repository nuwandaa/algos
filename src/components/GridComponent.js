import React, { Component } from 'react';
import MenuComponent from "./MenuComponent";
import Spot from './Spot';
import "./GridComponent.css";
import { breathFirstSearch, bfsShortestPath } from '../algorithms/breathFirstSearch';
import { depthFirstSearch, dfsShortestPath } from '../algorithms/depthFirstSearch';
import { aStarSearch } from '../algorithms/aStar';
import { greedyBestFirstSearch } from '../algorithms/greedyBestFirstSearch.js';
import { uniformCostSearch } from '../algorithms/uniformCostSearch';
import { randomWalkSearch } from '../algorithms/randomWalkSearch';

const ROWS = 20;
const COLS = 20;
const SPOT_WIDTH = 15;
const WIDTH = ROWS * SPOT_WIDTH;

export default class GridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            animationStarted: false,
            settingStartNode: false,
            settingEndNode: false,
            START_SPOT_COL: 1,
            START_SPOT_ROW: 9,
            END_SPOT_COL: 18,
            END_SPOT_ROW: 9,
            velocity: 50
        };

        this.bfs = this.bfs.bind(this);
        this.dfs = this.dfs.bind(this);
        this.astar = this.astar.bind(this);
        this.greedyBfs = this.greedyBfs.bind(this);
        this.randomWalk = this.randomWalk.bind(this);
        this.ucs = this.ucs.bind(this);
        this.resetGrid = this.resetGrid.bind(this);
        this.setStartNode = this.setStartNode.bind(this);
        this.setEndNode = this.setEndNode.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
    }

    componentDidMount() {
        const grid = this.generateGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        if (this.state.settingStartNode) {
            const newGrid = this.addStart(this.state.grid, row, col);
            this.setState({
                grid: newGrid,
                settingStartNode: false,
                START_SPOT_COL: col,
                START_SPOT_ROW: row
            });
        } else if (this.state.settingEndNode) {
            const newGrid = this.addEnd(this.state.grid, row, col);
            this.setState({
                grid: newGrid,
                settingEndNode: false,
                END_SPOT_COL: col,
                END_SPOT_ROW: row
            });
        } else {
            const newGrid = this.addBarrier(this.state.grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }

    handleMouseEnter(row, col) {
        if (!this.state.settingStartNode || !this.state.settingEndNode) {
            if (!this.state.mouseIsPressed) return;
            const newGrid = this.addBarrier(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    animateAlgorithm(spots, path) {
        this.setState({ animationStarted: true });
        for (let i = 0; i <= spots.length; i++) {
            if (i === spots.length) {
                setTimeout(() => {
                    this.animatePath(path);
                }, this.state.velocity * i);
                return;
            }
            setTimeout(() => {
                if (spots[i] !== undefined && !spots[i].isStart && !spots[i].isEnd) {
                    const spot = spots[i];
                    const parent = !spot.parent.isStart ? spot.parent : spot;
                    document.getElementById(`spot-${parent.row}-${parent.col}`).className = 'spot spot-visited';
                    document.getElementById(`spot-${spot.row}-${spot.col}`).className = 'spot spot-visiting';
                }

            }, this.state.velocity * i);
        }
    }
    animatePath(path) {

        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                if (!path[i].isStart && !path[i].isEnd) {
                    const spot = path[i];
                    document.getElementById(`spot-${spot.row}-${spot.col}`).className = 'spot spot-shortest-path';
                }
            }, this.state.velocity * i);
        }
        this.setState({ animationStarted: false });
    }

    bfs() {
        const spots = breathFirstSearch(
            this.state.grid,
            this.state.grid[this.state.START_SPOT_ROW][this.state.START_SPOT_COL],
            this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]
        );
        const path = bfsShortestPath(spots, this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]);
        this.animateAlgorithm(spots, path);
    }

    dfs() {
        const spots = depthFirstSearch(
            this.state.grid,
            this.state.grid[this.state.START_SPOT_ROW][this.state.START_SPOT_COL],
            this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]
        );
        const path = dfsShortestPath(spots, this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]);
        this.animateAlgorithm(spots, path);
    }

    astar() {
        const [spots, path] = aStarSearch(
            this.state.grid,
            this.state.grid[this.state.START_SPOT_ROW][this.state.START_SPOT_COL],
            this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]
        );
        this.animateAlgorithm(spots, path);
    }

    greedyBfs() {
        const [spots, path] = greedyBestFirstSearch(
            this.state.grid,
            this.state.grid[this.state.START_SPOT_ROW][this.state.START_SPOT_COL],
            this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]
        );
        this.animateAlgorithm(spots, path);
    }

    ucs() {
        const [spots, path] = uniformCostSearch(
            this.state.grid,
            this.state.grid[this.state.START_SPOT_ROW][this.state.START_SPOT_COL],
            this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]
        );
        this.animateAlgorithm(spots, path);
    }

    randomWalk() {
        const spots = randomWalkSearch(
            this.state.grid,
            this.state.grid[this.state.START_SPOT_ROW][this.state.START_SPOT_COL],
            this.state.grid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL]
        );
        this.animateAlgorithm(spots, []);
    }

    setStartNode() {
        this.setState({ settingStartNode: true });
    }

    setEndNode() {
        this.setState({ settingEndNode: true });
    }

    setVelocity(opt) {
        if (opt === 0.5) {
            this.setState({ velocity: 90 });
        } else if (opt === 1) {
            this.setState({ velocity: 50 });
        } else if (opt === 2) {
            this.setState({ velocity: 10 });
        }
    }

    resetGrid() {
        const grid = this.generateGrid();
        this.setState({ grid });
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (!grid[i][j].isStart && !grid[i][j].isEnd) {
                    document.getElementById(`spot-${i}-${j}`).className = 'spot';
                }
            }
        }
    }

    renderGrid() {
        const mouseIsPressed = this.state.mouseIsPressed;
        return (
            this.state.grid.map((row, rowIdx) => {
                return (
                    row.map((spot, spotIdx) => {
                        return (
                            <Spot
                            key={spotIdx}
                            width={SPOT_WIDTH}
                            col={spot.col}
                            row={spot.row}
                            isEnd={spot.isEnd}
                            isStart={spot.isStart}
                            isBarrier={spot.isBarrier}
                            visited={spot.visited}
                            distance={spot.distance}
                            neighbors={spot.neighbors}
                            parent={spot.parent}
                            hScore = { spot.hScore }
                            gScore = { spot.gScore }
                            fScore = { spot.fScore }
                            mouseIsPressed={mouseIsPressed}
                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                            onMouseEnter={(row, col) =>
                                this.handleMouseEnter(row, col)
                            }
                            onMouseUp={() => this.handleMouseUp()}
                            ></Spot>
                        )
                    })
                )
            })
        )
    }
    // GRID, SPOTS AND BARRIER CREATION
    generateGrid = () => {
        const grid = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                currentRow.push(this.createSpot(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    createSpot = (col, row) => {
        return {
            col,
            row,
            isStart: row === this.state.START_SPOT_ROW && col === this.state.START_SPOT_COL,
            isEnd: row === this.state.END_SPOT_ROW && col === this.state.END_SPOT_COL,
            h: Infinity,
            isClosed: false,
            isOpen: false,
            isBarrier: false,
            visited: false,
            distance: null,
            parent: null,
            hScore: 0,
            gScore: 0,
            fScore: 0,
            neighbors: [
                [col, row - 1 > 0 ? row - 1 : null],
                [col, row + 1 < ROWS ? row + 1 : null],
                [col - 1 > 0 ? col - 1 : null, row],
                [col + 1 < COLS ? col + 1 : null, row]
            ]
        };
    }

    addBarrier = (grid, row, col) => {
        const newGrid = grid.slice()
        const spot = newGrid[row][col];
        if (spot.isStart || spot.isEnd) {
            return newGrid;
        }
        const newSpot = {
            ...spot,
            isBarrier: !spot.isBarrier,
        };
        newGrid[row][col] = newSpot;
        return newGrid;
    }

    addStart = (grid, row, col) => {
        const newGrid = grid.slice()
        newGrid[this.state.START_SPOT_ROW][this.state.START_SPOT_COL].isStart = false;
        const spot = newGrid[row][col];
        const newSpot = {
            ...spot,
            isStart: true,
        };
        newGrid[row][col] = newSpot;
        return newGrid;
    }

    addEnd = (grid, row, col) => {
        const newGrid = grid.slice()
        newGrid[this.state.END_SPOT_ROW][this.state.END_SPOT_COL].isEnd = false;
        const spot = newGrid[row][col];
        const newSpot = {
            ...spot,
            isEnd: true,
        };
        newGrid[row][col] = newSpot;
        return newGrid;
    }


    render() {
        return (
            <div>
                <MenuComponent 
                    bfs={this.bfs} 
                    dfs={this.dfs} 
                    astar={this.astar}
                    ucs={this.ucs}
                    greedyBfs={this.greedyBfs}
                    randomWalk={this.randomWalk}
                    reset={this.resetGrid}
                    animationStarted={this.state.animationStarted}
                    setStartNode={this.setStartNode}
                    setEndNode={this.setEndNode}
                    setVelocity={this.setVelocity}
                />
                { this.state.settingStartNode || this.state.settingEndNode ?
                <div className='overlay'>Select the position of the node</div>
                : ''
                }

                <div className='grid' style={{'width': WIDTH, 'height': WIDTH}}>
                    {this.renderGrid()}
                </div>
            </div>
        )
    }
}