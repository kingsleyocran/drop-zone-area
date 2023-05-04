"use client";

import React, { useState } from "react";
import CustodianTile from "./CustodianTile";
import UploadModal from "./UploadModal";

function ListArea() {
  const [data, setdata] = useState([]);

  function addData(val) {
    setdata((previousData) => [...previousData, val]);
  }

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="w-full">
      {/* List */}
      <div className="h-[calc(100vh-200px)] bg-neutral-100 w-full px-12 ">
        <div className="bg-white h-full w-full rounded-2xl flex flex-col gap-4 p-6 overflow-y-auto">
          {data.map((e) => (
            <CustodianTile key={e.name} data={e} />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="h-[120px] bg-neutral-100 w-full flex flex-col justify-center items-center">
        <button
          type="button"
          onClick={() => openModal()}
          className="bg-blue-500 py-3 px-6 rounded-xl text-white hover:bg-blue-800 transition-all"
        >
          Add new custodian
        </button>
      </div>

      <UploadModal
        isOpen={isOpen}
        closeModal={closeModal}
        onChange={(object) => {
          addData(object);
        }}
      />
    </div>
  );
}

export default ListArea;
