import React, { useRef } from "react";
import useMouse from "@react-hook/mouse-position";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from "../../axiosInstance";
import styles from './Keyboard.module.css'
import MouseTrail from "../MouseTrail";
import TextBox from "../TextBox";


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

                <Grid container item spacing={1} ref={useMouseTarget}>
                    <MouseTrail mouse={mouse} mouseTrailPoints={mouseTrailPoints} />
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
