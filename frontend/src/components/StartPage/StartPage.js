import React from 'react'
import "./StartPage.css"
import logos from "../../images/Who are you gonna call (1).gif"

export function StartPage(props) {

    return (
        <div className="start-container">
            <div className="imageDivs">
                <img className="animation-logo" src={logos} alt="logo" />
            </div>

            <h3 id="title" className="chooseYourLanguage">Choose Your Language</h3>

            <div className="langButtonDiv">
                <button id="langButtonEnglish" className="langButtonEnglish allButtons" name="englishDefinitions" onClick={props.handleLanguage}></button>
                <button className="langButtonSpanish allButtons" name="spanishDefinitions" onClick={props.handleLanguage}></button>
                <button className="langButtonFrench allButtons" name="frenchDefinitions" onClick={props.handleLanguage}></button>
                <button className="langButtonGerman allButtons" name="germanDefinitions" onClick={props.handleLanguage}></button>
            </div>
        </div>
    )
}

