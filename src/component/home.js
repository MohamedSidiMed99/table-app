
import './../App.css';
import {useState , useEffect } from "react";
import Axios from "axios";

function Home () {



    useEffect(() => {

        savedata();

      });
    /// --------------- declaration data for Saving---------------
    const [ID , setId] = useState("");
       const [newName , setNewName] = useState("");
       const [newdate , setDate] = useState("");
       const [newQuantity , setNewQuantity] = useState("Количество");
       const [newDistance , setNewDistance] = useState("Расстояние");
       
  /// --------------- declaration data for searching ---------------
    const [name , setName] = useState("");
    const [quantity , setQuantity] = useState(0);
    const [quantity2 , setQuantity2] = useState(0);
    const [data , setData] = useState([]);


     /// --------------- add new data function ---------------
     function AddData(){

     
        Axios.post("http://localhost:5000/addData",{
        newName:newName,
        newDate:newdate,
        newQuantity:newQuantity,
        newDistance:newDistance
      }).then((res)=>{
        // console.log(res.data);
       
        if(res.data === "added"){
            setNewName("");
            setDate("");
            setNewQuantity("");
            setNewDistance("");
            alert(`You added new data`);
           
        }
     })
     
   
     }

     /// --------------- function ---------------
    const savedata = () => {
  
      Axios.post("http://localhost:5000/data",{
        name:name,
        select1:quantity,
        select2:quantity2
      }).then((res)=>{
        // console.log(res.data);
        setData(res.data);
     })
      
     }

      /// --------------- update data function ---------------
  
     function updateData(){
        
        console.log("Update")

        Axios.post("http://localhost:5000/editData",{
            id:ID,
            newName:newName,
            newQuantity:newQuantity,
            newDistance:newDistance
          }).then((res)=>{
            // console.log(res.data);
           
            if(res.data === "Edited"){
               
                alert(`You had Edited  this ${ID}`);
               
            }else{
                console.log("error")
            }
         })
     }
 /// --------------- delete data function ---------------
     function deleteData(id){
    

        Axios.post("http://localhost:5000/delete",{
            id:id,
          }).then((res)=>{
         
            if(res.data === "deleted"){
              alert(` this ${id} has been deleted `);
            }
         })

     }
  
///----------- button  name AddEdit -------------
     const addEdit =()=>{
        if(ID === ""){
            return "Добавить данные";
        }else{
            return "Обновить данные";
        }
     }


    return (
        <div className="App">
      <header className="App-header">
         <h1>Test App </h1>
      </header>

      <div  className='AddData'><br/>
        <input type="text" value={newName} onChange={(event)=>{setNewName(event.target.value)}} placeholder="Название" /><br/>
        <input type="date" value={newdate} onChange={(event)=>{setDate(event.target.value)}}  placeholder="Date" /><br/>
        <input type="number" value={newQuantity} onChange={(event)=>{setNewQuantity(event.target.value)}}  placeholder="Количество" /><br/>
        <input type="number" value={newDistance} onChange={(event)=>{setNewDistance(event.target.value)}}  placeholder="Расстояние" /><br/>
        <button  className='btn' onClick={()=>{
            if(ID === ""){
                AddData();
            }else{
                updateData();
            }
            
            }}>{addEdit()}</button>
      </div>

      <div className="filter">
       <div className="filter-item">
            <label>max Количество</label> <br/>
            <select className="flt" value={quantity} onChange={(event)=>{setQuantity(event.target.value)}}>
                <option value="">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
            </select>
       </div>
       <div className="filter-item">
            <label>min Количество</label> <br/>
            <select className="flt" value={quantity2} onChange={(event)=>{setQuantity2(event.target.value)}}>
                <option value="">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
            </select>
      </div>
      </div>
     
     <div className="input">
        <input type="text" placeholder="поиск" onChange ={(event)=>{setName(event.target.value)}}/>
        {/* <button  onClick={ savedata }>поиск</button> */}
     </div>

      <table>
         <tr>
          <th>ID</th>
          <th>Дата</th>
          <th> Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
          <th>Удалить</th>
          <th>Обновить</th>
         </tr>
      
      {
          data.map((list,key)=>{
      return (
        <tr key={key}>
            <td>{list.ID}</td>
          <td>{list.date.substring(0, 10)}</td>
          <td>{list.name}</td>
          <td>{list.Quantity}</td>
          <td>{list.Distance}</td>
          <td><button className='delete' onClick={()=>deleteData(list.ID)}>Удалить</button></td>
          <td><button className='update' onClick={()=>{
            setId(list.ID);
            setNewName(list.name);
            setNewQuantity(list.Quantity);
            setNewDistance(list.Distance);
            
          }}>Обновить</button></td>
        </tr>
      ) 
        
        })

      }
      

      </table>

     <div className='creator'>
     <h3>Created by : Mohamed sidi mouhamed</h3>
     </div>
    </div>
    );
}

export default Home;