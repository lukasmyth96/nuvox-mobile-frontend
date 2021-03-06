import React, { useRef,  } from "react";
import useMouse from "@react-hook/mouse-position";
import Grid from '@material-ui/core/Grid';

import axios from "../../axiosInstance";
import styles from './Keyboard.module.css'
import TextBox from "../TextBox";
import Suggestions from "../Suggestions";
import SwipeKeyPad from "../SwipeKeyPad";


const Keyboard = () => {

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
            prompt: "",
            trace: [...trace.current]
        }
        trace.current = [];
        axios.post("/api/predict/", payload)
            .then(
                (response) => {
                    console.log(response.data.predicted_words[0]);
                }
            )
            .catch(
                error => console.log('Request failed!')
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
                <TextBox textValue="Hello world" />
                <Suggestions/>
                <SwipeKeyPad mouse={mouse} mouseTrailPoints={mouseTrailPoints} useMouseTarget={useMouseTarget} />
            </Grid>
        </div>
    );
}

export default Keyboard;
