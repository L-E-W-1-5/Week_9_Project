import './App.css';
import { FilterBar } from './components/FilterBar/FilterBar.js'
import { Header } from './components/Header/Header.js'
import { Input } from './components/Input/Input.js'
import { ObjectList } from './components/ObjectList/ObjectList.js'
import { StartPage } from './components/StartPage/StartPage.js'
import { useState, useEffect} from 'react'

import {useFetch} from './hooks/useFetch';

//const url = "http://localhost:3001/api"
const url = "https://across-the-globe-backend.onrender.com/api"

function App() {

  // Object/or set of objects sent to ObjectList
  const [object, setObject] = useState([])
  // State for languages
  const [language, setLanguage] = useState('englishDefinitions')
  // Input sent from FilterBar for the specific English get request
  const [input, setInput] = useState("")
  // Foreign search input sent from FilterBar for the specific get request
  const [translateSearch, setTranslateSearch] = useState("")

  // Visibility for the 'create new object' Input Component
  const [isVisible, setVisible] = useState()
  // Visibility for the 'Edit Object' Input Component
  const [isEditVisible, setEditVisible] = useState()
  // Visibility for the Start Page
  const [isStartPageVisible, setIsStartPageVisible] = useState(true)

  // Id of the object to be edited
  const [editObject, setEditObject] = useState([])
  // State for the favourites 
  const [faveArray, setfaveArray] = useState([])

  const { data, setAction, } = useFetch()
          
        


        useEffect(() => {

          async function fetchData() {
            
           let fulfilled = await data;
           console.log(fulfilled)

           let result = fulfilled.payload.sort((a, b) =>
              a.title?.localeCompare(b.title)
            );

            setObject(result);
          }

          if (data) fetchData();

        }, [data]);




  // change the language from a button click on either startpage or header

  function handleLanguage(e) {

    setLanguage(e.target.name)

    changeStartState();

    setObject([]);
  }

  // Function that sets the editObject state to be the id of the item to edit (passed down to object list and mapped to object items) 
  // also calls the function that makes the edit input box visible 
  
  function handleObjectState(object) {
    
    handleVisibilityEdit();

    setEditObject(object);
  }

  // function that is passed down to the filter bar that takes in the state of the the text input in the main search bar (English Search Bar)
   
  function handleChange(e) {

    setInput(e.target.value);  
  }

  // function that is passed down to the filter bar that takes in the state of the the text input in the translate search bar (Foreign Search Bar)
   
  function handleTranslateSearch(e) {

    setTranslateSearch(e.target.value);
  }

// function that: toggles whether the 'Add New Resource' box is visible or not (toggled on button click); sets the wholeEditObject array to empty array (resetting input fields for add new resource)

const handleVisibility = event => {

  setVisible(current => !current);

  setEditObject([])
}

// function that toggles whether the 'Edit' box is visible or not (toggled on button click)

const handleVisibilityEdit = event => {

  setEditVisible(current => !current);

  setEditObject({})
}

// function that toggles whether the StartPage is visible or not 

const changeStartState = event => {

  if (isStartPageVisible) {

    setIsStartPageVisible(current => !current);
  }
}

  // function that: if no search input, runs get all and sorts objects alphabetically by title (when clicking search button); if there is search input, runs getByTitle function

  async function handleClick(type) {

    if (type === 'getAll') {

      handleGetAll()  // TODO: Seperate this function out so that the getAll button will getAll regardless of whether there's input in the serchbar.
                              
    } else if (type === 'getByTitle'){

      getByTitle();  // TODO: Create an error if search button is pressed with no input in the searchbar.

    }
  }


  // Function to get all when no input has been entered in the searchbar, makes fetch request for all objects (called inside handleClick or handleTranslation)

  async function handleGetAll() {   //TODO: Can i delete this function and just add the setAction into the handkeClick?

    setAction({ request:'getAll',
                language: language
              })           
  }

  // fetch request for specific object(s) (called inside handleClick)

  async function getByTitle() {

    if (language === 'englishDefinitions'){

      if (input === ""){
        alert('You must enter something in a search box to search by title.');
        return;
      }

      setAction({ request: 'getByTitle',
                  language: language,
                  title: input
                })
    }else{

      if (translateSearch === ""){
        alert('You must enter something in a search box to search by title.');
        return;
      }

      setAction({ request: 'getByForeignTitle',
                  language: language,
                  title: translateSearch
                })
    }
  }


  // post request for new object (handed down to input component)

  async function handleNewObject(newObject) {

    const objectToAdd = await fetch(`${url}/${language}`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(newObject)
    })

    let data = await objectToAdd.json();

    let brandNewObject = data.payload[0];

    const objectToAddOnScreen = [...object, brandNewObject];

    setObject(objectToAddOnScreen);
  }

  // edit request for specific object (handed down edit-sepcific input component)

  async function handleEdit(changes) {

    const targetEditObject = object.filter(itemToEdit => { return itemToEdit.id === editObject.id })

    const editedItem = createEditObject(targetEditObject, changes)

    await fetch(`${url}/${language}/${editObject.id}`, {

      method: 'PATCH',

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(editedItem[0])
    })
  }

  // function that creates a new edited object (if values empty, original ones are kept) - called inside handleEdit 

  function createEditObject(original, newEdit) {

    const keys = Object.keys(newEdit)

    for (let i = 0; i < keys.length; i++){

      if(newEdit[keys[i]]){

        original[0][keys[i]] = newEdit[keys[i]] 
      }
    }
    return original
  }

  // delete request for specific object (handed down to object list component and then object component)

  async function handleDelete(id) {

    if(alert("Are you sure you wish to delete this item?")){ // TODO: Make this a yes/no box.
      alert("Deleted!")
    }

    for (let i = 0; i < object.length; i++) {

      if (object[i].id === id) {

        await fetch(`${url}/${language}/${id}`, {

          method: "DELETE"
        })
        const deleted = [...object.slice(0, i), ...object.slice(i + 1)];

        setObject(deleted);
      }
    } return
  }

  // function that sorts the objects in ascending order (by week)

  function sortByWeek() {

    let sortedObjects = [...object].sort((a, b) => { return a.week - b.week });

    setObject(sortedObjects);
  }

  // function that populates the new favourited items into the faveArray state (but no duplicates)

  function favourite(id) {

    const editFavourite = object.filter(fave => { return fave.id === id });

    if (!faveArray.includes(editFavourite[0])) {

    const newArray = [...faveArray, editFavourite[0]];

    setfaveArray(newArray);
    }
  }

  // function that displays the favourite list on button click 

  function displayFavourite() {

    setObject(faveArray);
  }

  

  return (

    <div className="App">
      <div className="start-page" style={{ visibility: isStartPageVisible ? 'visible' : 'hidden' }}>
        <StartPage handleLanguage={handleLanguage}></StartPage>
      </div>

      <div className="main-container">
        <div className="languages">
          <Header language={language} handleLanguage={handleLanguage}></Header>
        </div>

        <div className="search-bar">
          <FilterBar language={language} handleClick={handleClick} handleTranslate={handleTranslateSearch} handleChange={handleChange} handleSort={sortByWeek} displayFave={displayFavourite}></FilterBar>
        </div>
      </div>

      <div className="form-container" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        <Input visibility={handleVisibility} handleNewObject={handleNewObject} language={language} required={true} wholeEditObject={editObject}></Input>
      </div>

      <div className="form-container" style={{ visibility: isEditVisible ? 'visible' : 'hidden' }}>
        <Input visibility={handleVisibilityEdit} handleNewObject={handleEdit} language={language} required={false} wholeEditObject={editObject}></Input>
      </div>

      <div className="main-container">
        <button className="addNewButton" onClick={handleVisibility}>Add New Resource</button>
        <ObjectList object={object} handleFavourite={favourite} handleDelete={handleDelete} handleEdit={handleObjectState} ></ObjectList>
      </div>
    </div>
  );
}

export default App;
