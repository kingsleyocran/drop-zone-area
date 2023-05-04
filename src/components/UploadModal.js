"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadModal({ isOpen, closeModal, onChange }) {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const [name, setname] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles([
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setname("");
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  useEffect(() => {
    removeAll();
  }, [closeModal]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload image of the Custodian
                </Dialog.Title>

                {/* Drop zone */}
                <div
                  {...getRootProps()}
                  className="bg-neutral-100 mt-6 rounded-xl h-[400px] flex flex-col justify-center items-center"
                >
                  <input {...getInputProps()} />
                  <p>Drag and drop some files here, or click to select files</p>
                </div>

                {/* File Preview */}
                {files.length > 0 && (
                  <div>
                    <img
                      className="h-[100px] w-[100px] rounded-xl"
                      src={files[0]?.preview ?? ""}
                      alt=""
                    />
                  </div>
                )}

                {/* Text Input */}
                <div className="flex flex-col gap-2 mt-8">
                  <label htmlFor="custodian"> Custodian Name</label>
                  <input
                    type="text"
                    name="custodian"
                    value={name}
                    className="bg-neutral-100 w-full h-12 rounded-lg px-4"
                    placeholder="Enter the name of the custodian"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-6 flex flex-row gap-2 justify-end">
                  <button
                    onClick={() => {
                      onChange({ name: name, file: files[0] });
                      closeModal();
                    }}
                    type="button"
                    className={`${
                      files.length > 0 && name !== ""
                        ? "bg-blue-400 text-white"
                        : "bg-blue-100 text-blue-500"
                    } px-4 py-3 rounded-lg`}
                  >
                    Upload Custodian
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className={`bg-neutral-800 text-white px-4 py-3 rounded-lg`}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
