import React from "react";
import { v4 as uuidv4 } from 'uuid';
import MemeList from "./MemeList";

const Meme = () => {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    const [allMemeImages, setAllMemeImages] = React.useState([])
    const [listState, setListState] = React.useState([])

    // delete functions 
    const deleteMeme = (event) => {
        setListState(item => item.filter(each => each.id !== event.target.parentElement.id))
    }

    let mappedList = listState.map((item, index)=>{

        return(
            <MemeList {...item} 
                key = {item.id}
                allMemeImages = {allMemeImages}
                deleteMeme = {deleteMeme}
            />
        )
    })

    // storing imgs from api to state
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
    }, [])
    
    // grabbing an img from api 
    const getMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    // creating new meme
    const createMemeImage = () => {
        setListState(item => [
            ...item,
            {
                topText: meme.topText,
                bottomText: meme.bottomText,
                randomImage: meme.randomImage,
                id: uuidv4()
            }
        ])
    }
    
    // saving changes to meme
    const handleChange = (event) => {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <button 
                className="form--button"
                onClick={createMemeImage}
            >
               Create New Meme
            </button>
            <ul>
                {mappedList}
            </ul>
        </main>
    )
}

export default Meme;