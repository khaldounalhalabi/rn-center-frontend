import React, { useEffect } from "react";

const HandleTimer = (
  minutes: number,
  seconds: number,
  setMinutes: React.Dispatch<any>,
  setSeconds: React.Dispatch<any>,
) => {
  useEffect(() => {
    let timerId: any;
    if (minutes > 0 || seconds > 0) {
      timerId = setTimeout(() => {
        if (seconds === 0) {
          setSeconds(59);
          setMinutes((prevMinutes: number) => prevMinutes - 1);
        } else {
          setSeconds((prevSeconds: number) => prevSeconds - 1);
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [minutes, seconds]);
};

export default HandleTimer;
