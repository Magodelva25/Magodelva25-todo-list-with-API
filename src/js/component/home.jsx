import React, { useState, useEffect } from "react";
import { TodoCard } from "./todoCards/todoCards.jsx";

export const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState ([]);
	const [active, setActive] = useState ("false");


	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/users/Magodelva')
			.then(resp => resp.json())
			.then(respJson => {
				console.log(respJson)
				console.log(respJson.todos)
				const serverTodos = respJson.todos;
				setTodos(serverTodos)	
		})
		.catch(() => alert("User does not exist"))
		
	}, [])

	const createTodo = async (task) => {
		await fetch('https://playground.4geeks.com/todo/todos/Magodelva',{
			method: 'POST',
			body: JSON.stringify({
				"label": task,
				"is_done": false
			  }),
			headers: {
				'Content-Type': 'application/JSON'
			}
		}).then(resp => resp.json())
		.then(respJson => {
			const newTodos = [...todos, respJson];
			setTodos([...newTodos])
		});
	}
	const removeTodo = async (id) => {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, { 
			  method: 'DELETE', 
			  headers: {
				'Content-Type': 'application/json' 
			  }
			})
			.then(() => {
			  const newTodos = todos.filter((todo) => todo.id !== id);
			  setTodos(newTodos);
			})
			.catch((error) => console.error("Error al eliminar la tarea:", error));
		  };

		  const removeAllTodos = async () => {
			
			try {
			  for (const todo of todos) {
				await fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
				  method: 'DELETE',
				  headers: {
					'Content-Type': 'application/json'
				  }
				});
			  }
			  setTodos([]);
			  
			} catch (error) {
			  console.error("Error al eliminar todas las tareas:", error);
			}
		  };

	return (
		<div className="container-fluid">
			<div className="wrapper">
				<div className="input-hero">
				<h1>Cosas para hoy</h1>
				<h3>{todos.length} tasks</h3>
					<div className="input-bar">
						<input 
							type="text"
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="New Task"
							maxLength={40}
							onKeyDown = {(e) => {
							if(e.key === "Enter" && e.target.value === ""){
								alert("Debes añadir algo a tu tarea")
							}
							if(e.key === "Enter" && e.target.value.trim() !== "") {
								createTodo(e.target.value)
								setInputValue('')
							}
							}}
							value={inputValue}>
						</input>
						<button className="reset-button" onClick={() => removeAllTodos()}  disabled={todos.length === 0}>Reiniciar tasks</button>
					</div>
				</div>
				<div className="Todo-List">
					<div className="cardBoard">
						{ todos.map((item, index) => (
							<TodoCard title={item.label} function={() => removeTodo(item.id)}
							task={item.label} key={item.id}/> ))
						}
					</div>	
				</div>
			</div>
		</div>
	);
}

