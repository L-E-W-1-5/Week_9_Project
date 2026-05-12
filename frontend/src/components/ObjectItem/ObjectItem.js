import React from 'react'
import './ObjectItem.css'

// Component for displaying object items (mapped inside ObjectList) -- add, delete and edit functionality passed down from App

export function ObjectItem(props) {

    function onClicks() {

        props.handleEdit()
    }

    return (
        <div className="item-container">
            <img alt="example not available" src={props.example}></img>

            <div className="item-text">
                <div className="titleDiv">
                    <h2 className="titles">{props.title}</h2>
                    <h2 className="titles">{props.englishTitle}</h2>
                </div>

                <p className='week'>Week {props.week}</p>

                <p>{props.definition}</p>

                <div className="linksDiv">
                    <a href={props.links}>{props.links}</a>
                </div>

                <div className="buttonDiv">
                    <button className="buttons" onClick={props.handleDelete}>Delete  🗑</button>
                    <button className="buttons" onClick={onClicks}>Edit  📝</button>
                    <button className="buttons" onClick={props.handleFavourite}>Favourite ⭐️</button>
                </div>
            </div>
        </div>
    )
}