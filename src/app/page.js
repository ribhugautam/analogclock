"use client";
import React, { useEffect } from "react";

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
          <option value="Europe/Andorra">Europe/Andorra</option>
          <option value="Asia/Dubai">Asia/Dubai</option>
          <option value="America/La_Paz">America/La_Paz</option>
          <option value="Africa/El_Aaiun">Africa/El_Aaiun</option>
        </select>
      </div>

      <div className="clock__face rounded-full">
        <div className="aspect-square h-6 absolute Fmx-auto z-10 bottom-0 top-0 my-auto bg-white rounded-full " />
        <h3 className="text-white text-2xl font-bold ">12</h3>
        <h3 className="text-white font-bold text-2xl bottom-0 absolute ">06</h3>
        <div id="hour" className="hand hand--hours rounded-full" />
        <div id="minutes" className="hand hand--minutes rounded-full" />
        <div id="seconds" className="hand hand--seconds rounded-full" />
      </div>
    </div>
  );
}
