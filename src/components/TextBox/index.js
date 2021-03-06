import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './TextBox.module.css';

const TextBox = ({textValue}) => {

    return (
        <Grid item xs={12}>
            <Paper elevation={3} className={styles.paper}>
                <textarea className={styles.textArea} rows={3} value={textValue}/>
            </Paper>
        </Grid>
    );

}

export default TextBox
