"use client";

import React, { useState, useEffect } from "react";

function CustodianTile({ data }) {
  const [progress, setprogress] = useState(0);
  const [wProgress, setwProgress] = useState(0);

  useEffect(() => {
    let seconds = 0;
    const makeIteration = () => {
      if (seconds < 101) {
        setprogress(seconds);
        setwProgress()
        setTimeout(makeIteration, 400); // 1 second waiting
      }
      seconds += 1;
    };

    makeIteration();
  }, []);

  return (
    <div className="h-[120px] w-full bg-neutral-100 rounded-xl flex flex-row justify-between items-center pl-3 pr-6">
      <div className="flex flex-row items-center gap-8">
        {/* Image */}
        <div className="bg-neutral-400 rounded-xl h-[100px] w-[100px]">
          <img
            className="h-[100px] w-[100px] rounded-xl"
            src={data.file.preview}
            alt=""
          />
        </div>

        {/* Name */}
        <p className="">{data.name}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-row gap-4">
        <div className="h-[20px] w-[200px] bg-blue-100">
          <div
          style={{
            width: `${progress}%`
          }}
            className={`h-[20px] bg-blue-400 transition-all`}
          ></div>
        </div>

        <div className="w-12 flex flex-row justify-end"><p>{progress}%</p></div>
      </div>
    </div>
  );
}

export default CustodianTile;
