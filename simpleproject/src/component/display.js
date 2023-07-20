import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { gettingDataFromServer } from '../slice/tasksSlice';

const Display = () => {
    let {tasksList}=useSelector((state)=>state.tasks);
  
    let dispatch=useDispatch();
    let [nextval,setNextVal]=useState(0);
    let [currentPage,setCurrentPage]=useState(0);

    useEffect(()=>{

         let task=0;
        dispatch(gettingDataFromServer(nextval));
    },[nextval])

   console.log("Hello");
   
      let nextpage=()=>{
         setNextVal(nextval+5);
         //dispatch(gettingDataFromServer(nextval));
         setCurrentPage((prepage)=>prepage+5);
    }
    let previouspage=()=>{
        if(currentPage>0){
          setCurrentPage((prevpage)=>prevpage-5);
        }
    }
     let currentData = tasksList.slice(currentPage,currentPage+5);
  return (
    <div>
        {
            currentData.map((task,index)=>{
                return(
                    <div>
                    <h1>{` ${task.id} ${task.title}`}</h1>
                    <h6>{task.body}</h6>
                    </div>
                   )
           })}

      <button onClick={previouspage}>Previouspage</button>
      <button onClick={nextpage}>Nextpage</button>
    
    </div>
  )
}

export default Display;