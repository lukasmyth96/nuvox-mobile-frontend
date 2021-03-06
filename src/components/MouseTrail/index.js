import React from "react";

const MouseTrail = ({mouse, mouseTrailPoints}) => {
    const pointsToRender = [];
    if (mouse.isDown) {
        if (mouseTrailPoints.current.length === 50) mouseTrailPoints.current.shift();
        mouseTrailPoints.current.push(mouse);
        for (let i = 0; i < mouseTrailPoints.current.length; i++) {
            const {pageX, pageY} = mouseTrailPoints.current[i];
            const transparency = 0.5 + 0.5 * (i / 50);
            const size = Math.round(1 + 5 * (i / 50));

            pointsToRender.push(
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
        mouseTrailPoints.current = [];
    }

    return pointsToRender;
}

export default MouseTrail;
