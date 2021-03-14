import React from "react";
import Grid from "@material-ui/core/Grid";

import TextBox from "../TextBox";
import Suggestions from "../Suggestions";
import SwipeKeyPad from "../SwipeKeyPad";
import styles from "./Keyboard.module.css";

const Keyboard = (props) => {
    return (
        <div className={styles.keyboardContainer}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                spacing={1}>
                <TextBox
                    textValue={props.text}/>
                <Suggestions
                    suggestions={props.suggestions}
                    onSuggestionClicked={props.onSuggestionClicked}/>
                <SwipeKeyPad
                    mouse={props.mouse}
                    mouseTrailPoints={props.mouseTrailPoints}
                    useMouseTarget={props.useMouseTarget}/>
            </Grid>
        </div>
    );
}

export default Keyboard;
