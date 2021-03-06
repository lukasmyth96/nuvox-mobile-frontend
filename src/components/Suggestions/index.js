import React from 'react';
import Grid from "@material-ui/core/Grid";

import Key from '../Key';


const Suggestions = ({suggestions, onSuggestionClicked}) => {
    return (
        <Grid container item spacing={1}>
            <Key contents={suggestions[0]} onClick={() => onSuggestionClicked(suggestions[0])} />
            <Key contents={suggestions[1]} onClick={() => onSuggestionClicked(suggestions[1])} />
            <Key contents={suggestions[2]} onClick={() => onSuggestionClicked(suggestions[2])} />
        </Grid>
    );
}

export default Suggestions;
