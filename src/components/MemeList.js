import React from "react";


const MemeList = (props) => {
    const [memeList, setMemeList] = React.useState({
        topText: props.topText,
        bottomText: props.bottomText,
        randomImage: props.randomImage
    })
    
    return(
        <div className="meme--list">
                <li key={props.id} id ={props.id}>
                    <img src={memeList.randomImage} className="meme--image"/>
                    <h2 className="meme--text top">{memeList.topText}</h2>
                    <h2 className="meme--text bottom">{memeList.bottomText}</h2>
                    <div className="deleteButton" id={props.id}>
                        <button className = "deleteButton" onClick={props.deleteMeme}>Delete</button>
                    </div>
                </li>
            </div>    
    )
}

export default MemeList; 