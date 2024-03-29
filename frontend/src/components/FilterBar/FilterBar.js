import React from 'react'
import "./FilterBar.css"

// Filter bar for both english & non-English. Non-English will render an additional input for searching in English
// Functions for searching, displaying sorted & fave objects called on button clicks

export function FilterBar(props) {
  
        return (
            <div className="languagesDiv">
                    {props.language !== "englishDefinitions" && <input className="input" onChange={props.handleTranslate} placeholder="Enter word in English to get translation"></input>}

                <div className="translatorButtonDiv">
                    {props.language !== "englishDefinitions" && <button className="translatorButton" onClick={props.foreignClick}>Get translation</button>}
                </div>  

                    <input className="input" onChange={props.handleChange} placeholder="Enter search here"></input>
                    
                <div className="buttonDiv">
                    <button className="searchButton" onClick={props.handleClick}>Search</button>
                    <button className="getAllButton" onClick={props.handleClick}>Get All</button>
                    <button className="sortByWeekButton" onClick={props.handleSort}>Sort by week</button>
                    <button className="favouriteButton" onClick={props.displayFave}>Show favourites</button>
                </div>
            </div>
        )
}
