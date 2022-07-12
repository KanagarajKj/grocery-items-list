import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

import './index.css';

const getLocalStorageData = ()=> {
  let localGroceries = localStorage.getItem('groceries')

  if(localGroceries) {
    localGroceries = JSON.parse(localStorage.getItem('groceries'))
    return localGroceries
  }else {
    return [];
  }
}

getLocalStorageData()

const App = () => {
  const [grocery,setGrocery] = useState({title:'',price:''})
  const [groceries, setGroceries] = useState(getLocalStorageData());
  const [isEditing,setIsEditing] = useState(false)
  const [editId,setEditId] = useState(null)

    const changeHandler = (e) => {
      const key = e.target.name;
      const value = e.target.value;
      setGrocery({ ...grocery, [key]: value });
    };

  const submitHandler = (e) =>{
    e.preventDefault();

if(!grocery.title || !grocery.price){
  alert('Enter All the Inputs')
}
else if(isEditing) {
let EditedGroceries = groceries.map((item) => {
  if(item.id === editId){
    return { ...item, title: grocery.title, price: grocery.price };
  }else {
    return item;
  }
})
setGroceries(EditedGroceries)
localStorage.setItem('groceries', JSON.stringify(EditedGroceries));
setGrocery({ title: '', price: '' });
setIsEditing(false)
setEditId(null)
}else{
  let newGrocery = { ...grocery, id: uuidv4() };
  let newGroceries = [...groceries,newGrocery];
  setGroceries(newGroceries);
  localStorage.setItem('groceries', JSON.stringify(newGroceries));
  setGrocery({ title: '', price: '' });
}
  }
  
const deleteGrocery = (id) =>{
  let deletedGrocery = groceries.filter((grocery) => grocery.id !== id);
  setGroceries(deletedGrocery);
  localStorage.setItem('groceries', JSON.stringify(deletedGrocery));
}

const updateGrocery = (id) => {
  setIsEditing(true)
  let updatedGrocery = groceries.find((grocery) => grocery.id === id )
  setGrocery(updatedGrocery)
  setEditId(id)
}


return (
  <>
    <form className="form" onSubmit={submitHandler}>
      <div className="form_control">
        <label htmlFor="title">Grocery Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter the grocery"
          name="title"
          value={grocery.title}
          onChange={changeHandler}
        />
      </div>
      <div className="form_control">
        <label htmlFor="price">Grocery price</label>
        <input
          type="number"
          id="price"
          placeholder="Enter the price ₹"
          name="price"
          value={grocery.price}
          onChange={changeHandler}
        />
      </div>
      <button className="add_btn">{isEditing ? 'Update' : 'Add'}</button>
    </form>

    <ul className='list'>
      {groceries.map((grocery) => {
        const { id, title, price } = grocery;
        return (
          <li key={id}>
            <h2>{title}</h2>
            <h2>₹{price}</h2>
            <span>
              <button onClick={() => updateGrocery(id)}>Edit</button>
              <button onClick={() => deleteGrocery(id)}>Delete</button>
            </span>
          </li>
        );
      })}
    </ul>
  </>
);
  
}

export default App