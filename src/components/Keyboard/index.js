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
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="stretch"
              spacing={0}>
                <Grid item xs={12}>
                    <Paper className={styles.paper}>xs=12</Paper>
                </Grid>
                <Grid container item spacing={0}>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                </Grid>

                <Grid container item spacing={0} ref={target}>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={styles.paper}>xs=6</Paper>
                    </Grid>
                </Grid>
            </Grid>
    );
}

export default Keyboard;
