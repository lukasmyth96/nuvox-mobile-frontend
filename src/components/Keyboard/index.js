import React, {useRef, useState} from "react";
import useMouse from "@react-hook/mouse-position";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from "../../axiosInstance";
import styles from './Keyboard.module.css'


const Keyboard = () => {

    const trace = useRef([]);
    const target = useRef(null);
    const mouse = useMouse(target, {
        fps: Infinity,
        enterDelay: 0,
        leaveDelay: 0
    });

        // Get prediction
    if (!mouse.isDown && trace.current.length > 0) {
        console.log('Sending request!')
        const payload = {
            prompt: "Hello what is your",
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
        console.log(trace.current);
    }

    let drawPts = useRef([]);
    const drawing = [];
    if (mouse.isDown) {
        // An array is a terrible data structure for this :P
        if (drawPts.current.length === 50) drawPts.current.shift();
        drawPts.current.push(mouse);
        for (let i = 0; i < drawPts.current.length; i++) {
            const {pageX, pageY } = drawPts.current[i];
            const transparency = 0.5 + 0.5 * (i / 50);
            const size = Math.round(1 + 5 * (i / 50));

            drawing.push(
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: pageX,
                        top: pageY,
                        width: size,
                        height: size,
                        backgroundColor: `rgba(255, 80, 80, ${transparency})`,
                        borderRadius: "50%",
                        boxShadow: `0px 0px 5px 5px rgba(255, 80, 80, ${transparency})`
                    }}
                />
            );
        }
    } else {
        drawPts.current = [];
    }

    return (
        <div className={styles.keyboardContainer}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                spacing={1}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={styles.paper}>Keyboard text goes here...</Paper>
                </Grid>
                <Grid container item spacing={1}>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>Suggestion 1</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>Suggestion 2</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>Suggestion 3</Paper>
                    </Grid>
                </Grid>

                <Grid container item spacing={1} ref={target}>
                    {drawing}
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>A B C</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>D E F</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>G H I</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>J K L</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}> </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>M N O</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>P Q R S</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>T U V</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} className={styles.paper}>W X Y Z</Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Keyboard;
