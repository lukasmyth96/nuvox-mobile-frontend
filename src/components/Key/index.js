import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import styles from "../Keyboard/Keyboard.module.css";

const Key = ({contents}) => {

    return (
        <Grid item xs={4}>
            <Paper elevation={3} className={styles.paper}>
                {contents}
            </Paper>
        </Grid>
    );
}

export default Key;
