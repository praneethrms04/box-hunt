import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [initialTimer, setInitialTimer] = useState(0);
  const [lastClickedTime, setLastClickedTime] = useState(Date.now());
  const [topPostion, setTopPosition] = useState("");
  const [leftPostion, setLeftPosition] = useState("");
  const [eventsArray, setEventsArray] = useState([]);
  const noOfClicks = useRef(0);
  const intervalId = useRef();

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        if (timer > 1) {
          setTimer((prev) => prev - 1);
        } else {
          resetTimeandPosions();
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [timer, isRunning]);

  // setting positions
  const resetTimeandPosions = () => {
    setTimer(initialTimer);
    setTopPosition(Math.floor(Math.random() * 100) + "px");
    setLeftPosition(Math.floor(Math.random() * 100) + "px");
  };

  //start
  const startHandler = () => {
    setIsRunning(true);
    setLastClickedTime(Date.now());
  };
  //pause
  const pauseHandler = () => {
    setIsRunning(false);
  };
  //reset
  const resetHandler = () => {
    setEventsArray([]);
    setTimer(initialTimer);
    setIsRunning(false);
    setLastClickedTime(Date.now());
    noOfClicks.current = 0;
  };

  // handle input filed text
  const handleTimerChangeHandler = (e) => {
    const value = e.target.value;
    setTimer(value);
    setInitialTimer(value);
  };

  // hadle box object
  const handleBoxObject = () => {
    noOfClicks.current += 1;
    const newClicked = Date.now();

    let diff = (newClicked - lastClickedTime) / 1000;
    let eventObj = {
      event: noOfClicks.current,
      time: diff,
    };
    setEventsArray((prev) => [...prev, eventObj]);
    // setLastClickedTime(newClicked);
    resetTimeandPosions();
  };

  return (
    <div className="App  py-6 flex flex-col justify-center items-center">
      <div className="py-4">
        <h2 className="text-2xl text-center"> Box- Hunt</h2>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-3">
          <button
            className="px-4 py-2 border border-black  text-center uppercase font-semibold rounded-md"
            onClick={startHandler}
          >
            Start
          </button>
          <button
            className="px-4 py-2 border border-black  text-center uppercase font-semibold rounded-md"
            onClick={pauseHandler}
          >
            Pause
          </button>
          <button
            className="px-4 py-2 border border-black  text-center uppercase font-semibold rounded-md"
            onClick={resetHandler}
          >
            Reset
          </button>
        </div>
        <input
          type="number"
          value={timer}
          onChange={handleTimerChangeHandler}
          className="px-4 py-2 border w-[150px] border-black font-semibold rounded-md"
        />
      </div>

      <div className="relative border border-black h-44 w-96 py-12 mt-4 rounded-md">
        {isRunning && timer ? (
          <div
            onClick={handleBoxObject}
            className=" bg-red-400 h-12 w-12"
            style={{
              position: "absolute",
              top: topPostion,
              left: leftPostion,
            }}
          ></div>
        ) : null}
      </div>

      <div className="py-4">
        <table className="">
          <thead>
            <tr>
              <th className="border border-slate-400 px-4 py-1">
                Mouse Click Number
              </th>
              <th className="border border-slate-400 px-4 py-1"> </th>
              <th className="border border-slate-400 px-4 py-1">
                Reaction Time
              </th>
            </tr>
          </thead>
          <tbody>
            {eventsArray && eventsArray.length > 0 ? (
              eventsArray?.map((event, ind) => (
                <tr key={ind}>
                  <td className="border border-slate-400 px-4 py-1">
                    {event.event}
                  </td>
                  <td className="border border-slate-400 px-4 py-1"> </td>
                  <td className="border border-slate-400 px-4 py-1">
                    {event.time} sec
                  </td>
                </tr>
              ))
            ) : (
              <div className="text-center py-3 flex justify-center items-center">No Clicks Right Now</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
