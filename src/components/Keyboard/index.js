import React, {useRef} from "react";
import useMouse from "@react-hook/mouse-position";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import styles from './Keyboard.module.css'


const Keyboard = () => {

    const target = useRef(null);
    const mouse = useMouse(target, {
        fps: 60,
        enterDelay: 100,
        leaveDelay: 100
    });

    console.log(mouse.x / mouse.elementWidth, mouse.y / mouse.elementHeight)

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
