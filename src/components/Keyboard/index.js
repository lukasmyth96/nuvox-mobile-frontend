import React, { useRef } from "react";
import useMouse from "@react-hook/mouse-position";

import styles from './Keyboard.module.css';

const Keyboard = () => {

  const target = useRef(null);
  const mouse = useMouse(target, {
    fps: 60,
    enterDelay: 100,
    leaveDelay: 100
  });

    return (
    <div>
      <h2>useMouse()</h2>
      <div className={styles.useMouseBox} ref={target}>
        <div>{JSON.stringify(mouse, null, 2)}</div>
      </div>
    </div>
    )
}

export default Keyboard;
