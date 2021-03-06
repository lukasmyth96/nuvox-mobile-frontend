import React, {useRef, useState} from "react";
import useMouse from "@react-hook/mouse-position";
import Grid from '@material-ui/core/Grid';

import axios from "../../axiosInstance";
import styles from './Keyboard.module.css'
import TextBox from "../TextBox";
import Suggestions from "../Suggestions";
import SwipeKeyPad from "../SwipeKeyPad";

const removeLastWord = text => {
    const words = text.split(' ');
    words.pop();
    return words.join(' ');
}

const replaceLastWord = (text, replacement) => {
    return replacement ? (removeLastWord(text) + replacement) : text;
}


const Keyboard = () => {
    let [text, setText] = useState("");
    let [suggestions, setSuggestions] = useState([]);
    let trace = useRef([]);
    let mouseTrailPoints = useRef([]);
    let useMouseTarget = useRef(null);
    const mouse = useMouse(useMouseTarget, {
        fps: Infinity,
        enterDelay: 0,
        leaveDelay: 0
    });

    // Get prediction
    if (!mouse.isDown && trace.current.length > 0) {
        const payload = {
            prompt: text,
            trace: [...trace.current]
        }
        trace.current = [];
        axios.post("/api/predict/", payload)
            .then(
                (response) => {
                    const action = response.data.action;
                    if (action === 'type') {
                        // Add predicted word to sentence.
                        const predictedWords = response.data.predicted_words;
                        if (predictedWords.length){
                            setText(currentText => currentText + predictedWords[0]);
                            setSuggestions(predictedWords.slice(1, 4));
                        }
                    } else if (action === 'delete') {
                        // Delete last predicted word.
                        setText(currentText => removeLastWord(currentText))
                    }
                }
            )
            .catch(
                error => alert(error.message)
            )
    }

    if (mouse.isDown && (mouse.x !== null && mouse.y !== null)) {
        trace.current.push(
            {
                x: (mouse.x / mouse.elementWidth),
                y: (mouse.y / mouse.elementHeight),
                t: 0
            }
        )
    }

    return (
        <div className={styles.keyboardContainer}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                spacing={1}>
                <TextBox
                    textValue={text}/>
                <Suggestions
                    suggestions={suggestions}
                    onSuggestionClicked={(suggestion) => setText(currentText => replaceLastWord(currentText, suggestion))}/>
                <SwipeKeyPad
                    mouse={mouse}
                    mouseTrailPoints={mouseTrailPoints}
                    useMouseTarget={useMouseTarget}/>
            </Grid>
        </div>
    );
}

export default Keyboard;
