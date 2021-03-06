import React from 'react';
import Grid from "@material-ui/core/Grid";

import Key from '../Key';


const Suggestions = () => {
    return (
        <Grid container item spacing={1}>
            <Key contents="Suggestion 1"/>
            <Key contents="Suggestion 2"/>
            <Key contents="Suggestion 3"/>
        </Grid>
    );
}

export default Suggestions;
