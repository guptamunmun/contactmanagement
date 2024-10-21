import React,{useState ,useEffect} from "react";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import { uuidv7 } from "uuidv7";

import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY ="contacts";
 const [contacts,setContacts] = useState([]);

 const addContactHandler = (contact) => {
  console.log(contact);
  setContacts([...contacts,{id:uuidv7(),...contact}])
 } 

 const removeContactHandler = (id) =>{
const newContactList = contacts.filter((contact) => {
  return contact.id !==id;
});
setContacts(newContactList)
 }

 useEffect(()=>{
  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if(retriveContacts) setContacts(retriveContacts);
 },[]);

 useEffect(()=>{
localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
 },[contacts]);

  return (
 <div className="ui container">
  <Router>
  <Header/>
  <Routes>
   
   <Route path="/add"
   render ={(props) => {
   <AddContact {...props}  addContactHandler={addContactHandler} />}}
    />
  <Route path="/" 
  exact
 render={(props) => {<ContactList {...props} 
 contacts ={contacts} 
 getContactId={removeContactHandler}/>}} />
  </Routes>

   
  </Router>
   
 </div>
  );
}

export default App;
