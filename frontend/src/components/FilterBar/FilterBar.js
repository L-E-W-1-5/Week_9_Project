import React from 'react'
import "./FilterBar.css"

// Filter bar for both english & non-English. Non-English will render an additional input for searching in English
// Functions for searching, displaying sorted & fave objects called on button clicks

export function FilterBar(props) {
  
        return (
            <div className="languageDiv">

                {props.language !== "englishDefinitions" && <input className="input" onChange={props.handleTranslate} placeholder="Enter word in English to get translation"></input>}

                <div className="translatorButtonDiv">

                    {props.language !== "englishDefinitions" && <button className="translatorButton all-buttons" onClick={() => props.handleClick('getByTitle')}>Get translation</button>}
               
                </div>  

                <input className="input" onChange={props.handleChange} placeholder="Enter search here"></input>
                    
                <div className="buttonDiv">
                    <button className="searchButton all-buttons" onClick={() => props.handleClick('getByTitle')}>Search</button>
                    <button className="getAllButton all-buttons" onClick={() => props.handleClick('getAll')}>Get All</button>
                    <button className="sortByWeekButton all-buttons" onClick={props.handleSort}>Sort by week</button>
                    <button className="favouriteButton all-buttons" onClick={props.displayFave}>Show favourites</button>
                </div>

               
            </div>
        )
}
