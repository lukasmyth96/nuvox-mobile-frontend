import React, {useRef, useState} from "react";
import useMouse from "@react-hook/mouse-position";

import axios from "../../axiosInstance";
import useInterval from "../../hooks/useInterval";
import {replaceLastWord, removeLastWord} from "../../utils/string_funcs";
import keyAtPoint from "../../utils/key_at_point";
import Keyboard from "../../components/Keyboard";

const EyeTrackingModeKeyboard = () => {
    let [text, setText] = useState("");
    let [suggestions, setSuggestions] = useState([]);
    let latestPoint = useRef(undefined);
    let keyIdBuffer = useRef([]);
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

    let running = useRef(false);
    const delay = 100; // ms
    useInterval(
        () => {
            if (latestPoint.current !== undefined) {
                trace.current.push(latestPoint.current);
                keyIdBuffer.current.push(keyAtPoint(latestPoint.current.x, latestPoint.current.y).id);
            }
            console.log(keyIdBuffer.current);
        }, running.current ? delay : null
    );

    if (mouse.isDown) {
        running.current = true;
        latestPoint.current =
            {
                x: (mouse.x / mouse.elementWidth),
                y: (mouse.y / mouse.elementHeight),
            }
    } else {
        running.current = false;
        latestPoint.current = undefined;
        trace.current = [];
        keyIdBuffer.current = [];
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
