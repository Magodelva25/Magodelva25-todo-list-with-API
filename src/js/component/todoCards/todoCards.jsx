import React, { useState } from "react";
import "./todoCards.css";

// onClick={() => setActive(true)}
// const [value, setInputVale] = useState("active");
// onKeyDown = {(e) => {
//     e.key === "Enter" ? setInputVale("false") : setInputVale("true")
// }}


export const TodoCard = (props) => {
    

    const [active, setActive] = useState("false");
    
    
    
    return (
    <div className="card-container">
            <div className="content">
                <div className="card-header">
                <p contentEditable={active} maxLength="40" onKeyDown = {(e) => {
                  e.key === "Enter" ? setActive(false) : null;
                  }}>{props.title}
                </p>
                <i className="fa-regular fa-pen-to-square edit-icon" onClick={() => setActive(true)}></i>
                </div> 
                <div className="input-area">
                    <textarea className="text-area" maxLength="140" placeholder="Describe tu tarea" contentEditable={active} ></textarea>
                </div>
                <div className="delete-icon"><i className="fa fa-trash" onClick={props.function}></i></div>
            </div>
        </div>
    )
}