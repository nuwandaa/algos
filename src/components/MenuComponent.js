import React, { useState } from "react";
import "./MenuComponent.css";

export default function MenuComponent(props) {

    const [algorithm, setAlgorithm] = useState('bfs');
    const [vel, setVel] = useState(1);

    const setVelocity = (vel) => {
        props.setVelocity(vel);
        setVel(vel);
    };

    const algorithms = {
        dfs: props.dfs,
        bfs: props.bfs,
        astar: props.astar,
        greedyBfs: props.greedyBfs,
        rw: props.randomWalk,
        ucs: props.ucs
    };

    return (
        <div>
	        <div className="navbar">
	        	<button onClick={algorithms[algorithm]}>Start</button>
	        	{/*{
				    props.animationStarted === false ?
				        <button onClick={algorithms[algorithm]}>Start</button> :
				        <button>Pause</button>
				}*/}
				<div className="dropdown">
				    <button className="dropbtn">Algorithm ⬇</button>
				    <div className="dropdown-content">
				    	<div className="sidedrop">
					    	<button className="sidedropbtn">Uninformed &#8680;</button>
					    	<div className="sidedrop-content">
					    		<button 
						      		className={ algorithm === 'bfs' ? 'active': ''} 
						      		onClick={()=>{setAlgorithm('bfs')}}>
						      		BFS
					      		</button>
					      		<button 
									className={ algorithm === 'dfs' ? 'active': ''} 
									onClick={()=>{setAlgorithm('dfs')}} >
									DFS
								</button>
								<button 
									className={ algorithm === 'ucs' ? 'active': ''} 
									onClick={()=>{setAlgorithm('ucs')}} >
									Uniform Cost Search
								</button>
					    	</div>
				      	</div>
				      	<div className="sidedrop">
				      		<button className="sidedropbtn">Informed &#8680;</button>
				      		<div className="sidedrop-content">			      			
								<button 
									className={ algorithm === 'astar' ? 'active': ''} 
									onClick={()=>{setAlgorithm('astar')}}>
									A *
								</button>
								<button 
									className={ algorithm === 'greedyBfs' ? 'active': ''} 
									onClick={()=>{setAlgorithm('greedyBfs')}}>
									Greedy Best-First
								</button>
				      		</div>
				      	</div>
						<hr></hr>
						<button 
							className={ algorithm === 'rw' ? 'active': ''} 
							onClick={()=>{setAlgorithm('rw')}}>
							Random Walk
						</button>
				  	</div>
				</div>
				<div className="dropdown">
				    <button className="dropbtn">Velocity ⬇</button>
				    <div className="dropdown-content">
				      	<button className={ vel === 0.5 ? 'active': ''} onClick={()=>{setVelocity(0.5)}}>0.5</button>
						<button className={ vel === 1 ? 'active': ''} onClick={()=>{setVelocity(1)}}>1</button>
						<button className={ vel === 2 ? 'active': ''} onClick={()=>{setVelocity(2)}}>2</button>
				  	</div>
				</div> 	
				<button onClick={props.setStartNode}>Set Start</button>
				<button onClick={props.setEndNode}>Set End</button>
				<button onClick={props.reset}>Reset</button>
			</div>
			<div className="title">
				<h2>Welcome to <span>Algos</span>, a path search visualizer</h2>
				<h4>Click any white spot to create a barrier/wall</h4>
			</div>
		</div>

    )
}