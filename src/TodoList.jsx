import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import './TodoList.css';

function addTask() {
let userInput = document.getElementById("task");
let list = document.getElementById("listymclistface");
let length = document.querySelectorAll("#listymclistface li").length;


console.log(userInput);
console.log(length);
console.log(list);
    list.innerHTML += `<li class=listElem id=list-${length}>${userInput.value}<div class=strike id=done-${length}>Done</div><div class=delete id=delete-${length}>X</div></li>`;
    userInput.value = "";
}

//Removes user selected 
function removeTask() {

}

function crossOutTask() {

}



function TodoList() {


    return (
        <div className="todolist">
            <div id="To-Do">
                <div id="listContainer">
                    <div id="listTitle">To-do List</div>
                    <div id="list">
                        <ul id="listymclistface">

                        </ul>
                    </div>
                </div>
                <div id="taskInput">
                    <input id="task" type="text" name="userTask"></input>
                    <button id="submit" name="submit" onClick={addTask} type="submit">Submit</button>
                </div>
            </div> 
        </div>
    );

}


export default TodoList;