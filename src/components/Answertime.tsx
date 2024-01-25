import React, { useEffect, useState, useRef } from 'react';

type Props = {
  duration: number;
  onTimeUp: () => void;
};

const Answertime: React.FC<Props> = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0);
  let intervalRef: React.MutableRefObject<number> = useRef(0);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCounter((cur: number) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setProgress(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
    // eslint-disable-next-line
  }, [counter]);

  return (
    <>
      <div className="w-full bg-gray-200 h-1.5">
        <div
          className="bg-blue-600 h-1.5 transition-all ease-out duration-1000"
          style={{
            width: `${progress}%`,
            backgroundColor: `${
              progress < 40 ? 'lightgreen' : progress < 70 ? 'orange' : 'red'
            }`
          }}
        ></div>
      </div>
    </>
  );
};

export default Answertime;
