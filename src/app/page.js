"use client";
import React, { useEffect } from "react";
import { timeZones } from "@/lib/timeZone";

export default function Home() {

  const [timeZone, setTimeZone] = React.useState("UTC");

  function updateClock() {
    const date = new Date();

    const time = Intl.DateTimeFormat("en-US", {
      timeZone: timeZone === "UTC" ? undefined : timeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);

    const [hours, minutes, sec] = time.split(":");
    const seconds = sec.substring(0, 2);

    document.getElementById("hour").style.transform = `rotate(${
      hours * 30
    }deg)`;
    document.getElementById("minutes").style.transform = `rotate(${
      minutes * 6
    }deg)`;
    document.getElementById("seconds").style.transform = `rotate(${
      seconds * 6
    }deg)`;
  }

  useEffect(() => {
    updateClock();
    const interval = setInterval(() => {
      updateClock();
    }, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div className="h-screen bg-black w-screen flex flex-col items-center gap-10 p-10 justify-center">
      <h1 className="text-white font-bold text-3xl">ANALOG CLOCK</h1>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h3 className="text-white font-bold">Time Zone</h3>
        <select
          onChange={(e) => setTimeZone(e.target.value)}
          className="text-black text-center px-4 focus:outline-none py-1 rounded-xl"
        >
          <option value="UTC">Local Time</option>
          {timeZones.map((zone, index) => (
            <option key={index} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      <div className="clock__face rounded-full">
        <div className="aspect-square h-[1.2rem] absolute Fmx-auto z-10 bottom-0 top-0 my-auto bg-[#ffffff] shadow-[0_0_1rem_#172acf] rounded-full " />
        <h3 className="text-white text-2xl font-bold ">12</h3>
        <h3 className="text-white font-bold text-2xl bottom-0 absolute ">06</h3>
        <div id="hour" className="hand hand--hours origin-bottom rounded-full" />
        <div id="minutes" className="hand hand--minutes origin-bottom rounded-full" />
        <div id="seconds" className="hand hand--seconds origin-bottom rounded-full" />
      </div>
    </div>
  );
}
