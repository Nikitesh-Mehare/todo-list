import React, { useEffect, useState } from 'react'

function Todolist() {

    let [inputData, setInputData]= useState()
    let [taskList, setTaskList]= useState([])
    let [toggleBtn, setToggleBtn]=useState(true)
    let [updateditem, setUpdatedItem]= useState()


    function getItems(){
        let list=JSON.parse(localStorage.getItem("task"));
        if(list){
            return list;
        }
        else{
            return [];
        }
    }
    useEffect(()=>{
        localStorage.setItem("task", JSON.stringify(taskList));
        
        
    },[taskList])
 
    function addItem(){

        if(!inputData){
            alert("Please enter data in input field ")
        }
        else if(inputData && !toggleBtn){
        
                let newData=taskList.map((item)=>{
                    if(item.id===updateditem){
                        return {...item, name:inputData}
                    }
                    return item
                })

                setTaskList(newData)
                setToggleBtn(true)
                setInputData('')

        }
        else{
            let newInputData={id:new Date().getTime().toString(), name:inputData}
            setTaskList([...taskList, newInputData])
             setInputData('')


        }
    }
   
    function editItem(id){
       let editedItem= taskList.find((ele)=>{
        return ele.id===id

       })
       setInputData(editedItem.name)
       setToggleBtn(false)
       setUpdatedItem(id)
    
    }  
    
    function deleteItem(id){
        let upList= taskList.filter((item)=>{
            return item.id!=id
        })
        setTaskList(upList)
        
    }
    
    


  return (
   <>
     <div className='container'>
        <div className='row'>
            <div className='col-md-4 mx-auto box'>
            <h3 align="center"> Todo List</h3>
                <input className='form-control' placeholder='Enter Some Task' value={inputData} onChange={(e)=>setInputData(e.target.value)}></input>

                {
                    toggleBtn ? <i class="bi bi-plus-lg addTask" onClick={addItem}></i> : <i class="bi bi-pencil addTask" onClick={addItem}></i>
                }
                
                
                <div className='taskarea'>
                    <ul>

                        {
                            taskList.map((item)=>{
                                return(
                                    <>
                                     <li>{item.name} <i class="bi bi-pencil" onClick={()=>editItem(item.id)}></i><i class="bi bi-trash" onClick={()=>deleteItem(item.id)}></i></li>
                                    </>
                                )
                            })
                        }
                        
                    
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
   </>
  )
}

export default Todolist