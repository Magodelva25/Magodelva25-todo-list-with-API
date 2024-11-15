import React, { useState } from "react";
import { TodoCard } from "./todoCards/todoCards.jsx";

export const Home = () => {

	const [inputValue, setInputVale] = useState("");
	const [todosList, setTodos] = useState ([]);

	return (
		<div className="container-fluid">
			<div className="wrapper">
				<div className="input-hero">
				<h1>Cosas para hoy</h1>
				<h3>{todosList.length} tasks</h3>
					<div className="input-bar">
						<input 
							type="text"
							onChange={(e) => setInputVale(e.target.value)}
							placeholder="New Task"
							maxLength={40}
							onKeyDown = {(e) => {
							if(e.key === "Enter") {
								setTodos(todosList.concat(inputValue));
							}
							}}
							value={inputValue}>
						</input>
					</div>
				</div>
				<div className="Todo-List">
					<div className="cardBoard">
						{ todosList.map((item, index) => (
							<TodoCard title={item} function={() => setTodos(todosList.filter((item, currentIndex) => index != currentIndex))}
							task={item} key={""}/> ))
						}
					</div>	
				</div>
			</div>
		</div>
	);
}


