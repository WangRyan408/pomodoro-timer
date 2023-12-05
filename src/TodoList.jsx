import React from 'react';
import { useState, useEffect, useCallback, useMemo, createElement } from 'react';
import './TodoList.css';


function TodoList() {

const [list, setList] = useState([]);
const [value, setValue] = useState('');

const addToList = () => {

if (list.length < 5){
    let tempArr = list;
    tempArr.push(value);
    setList(tempArr);
    setValue("");
}
  };

  const deleteItem = (index) => {

    let temp = list.filter((item, i) => i !== index);
  
    setList(temp);
  
  };


    return (
        <div className="todolist">
            <div id="To-Do">
                <div id="listContainer">
                    <div id="listTitle">To Do List &#40;Limit 5&#41;</div>
                    <div id="list">
                    <ul>{list.length > 0 && list.map((item, i) => 
                        <li id={`li-${i}`} className={'li-container'}>
                            <p id={`item-${i}`} className={'listElem'}>{item}</p> {/*Actual To-Do Comment/Note */}
                            <p onClick={() => deleteItem(i)} className={'deleteButton'}>X</p> {/* Button to Delete To-Do Entry */} 
                        </li>)}
                    </ul>
                    </div>
                </div>
                <div id="taskInput">
                    <input id="task" type="text" name="userTask" value={value} onChange={(e) => setValue(e.target.value)}></input>
                    <button id="submit" name="submit" onClick={addToList} type="submit">Click to Add</button>
                </div>
            </div> 
        </div>
    );

}


export default TodoList;