import React from 'react';

import Key from "../Key";
import MouseTrail from "./MouseTrail";
import Grid from "@material-ui/core/Grid";

const SwipeKeyPad = ({mouse, mouseTrailPoints, useMouseTarget}) => {
    return (
        <Grid container item spacing={1} ref={useMouseTarget}>
            <MouseTrail mouse={mouse} mouseTrailPoints={mouseTrailPoints}/>
            <Key contents="A B C"/>
            <Key contents="D E F"/>
            <Key contents="G H I"/>
            <Key contents="J K L"/>
            <Key contents=" "/>
            <Key contents="M N O"/>
            <Key contents="P Q R S"/>
            <Key contents="T U V"/>
            <Key contents="W X Y Z"/>
        </Grid>
    );
}

export default SwipeKeyPad
