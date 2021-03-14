import React, {useRef, useState} from "react";
import useMouse from "@react-hook/mouse-position";

import axios from "../../axiosInstance";
import {replaceLastWord, removeLastWord} from "../../utils/string_funcs";
import Keyboard from "../../components/Keyboard";

const EyeTrackingModeKeyboard = () => {
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
                        if (predictedWords.length) {
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
                t: 0  // time is required but not currently used.
            }
        )
    }

    return (
        <Keyboard
            text={text}
            suggestions={suggestions}
            onSuggestionClicked={(suggestion) => setText(currentText => replaceLastWord(currentText, suggestion))}
            mouse={mouse}
            mouseTrailPoints={mouseTrailPoints}
            useMouseTarget={useMouseTarget}
        />
    );
}

export default EyeTrackingModeKeyboard;
