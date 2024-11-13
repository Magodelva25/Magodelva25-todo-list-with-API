import React, { useState } from "react";

export const Home = () => {

	const [inputValue, setInputVale] = useState("");
	const [todosList, setTodos] = useState ([]);

	return (
		<div className="container-fluid">
			<div className="wrapper">
				<h1>Mi lista de tareas</h1>
				<h3>{todosList.length} tasks</h3>
				<input 
				type="text"
				onChange={(e) => setInputVale(e.target.value)}
				placeholder="New to do task"
				onKeyDown = {(e) => {
					if(e.key === "Enter") {
						setTodos(todosList.concat(inputValue));
					}
				}}
				value={inputValue}></input>
				<div className="Todo-List">
					<div className="cardBoard">
						{todosList.map((item, index) => (
						<todoCard task = {item} key={""} /> <i className="fa fa-trash" onClick = {() => setTodos(todosList.filter((item, currentIndex) => index != currentIndex))} </i>
						 
						))}
					</div>	
				</div>
			</div>
		</div>
	);
}
