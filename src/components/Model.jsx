import * as React from "react"
import { Dialog } from "@headlessui/react"
import clsx from "clsx"


const Modal = ({ isOpen, setIsOpen, title, body, handleDelete,setLoaded }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={clsx(
        "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto",
      )}
    >
      <div className="flex flex-col bg-gray-200 text-black w-96 py-8 px-4 text-center">
        <Dialog.Overlay />

        <Dialog.Title className="text-black-500 text-3xl">
          {title}
        </Dialog.Title>
        <Dialog.Description className="text-xl m-2">
          {body}
        </Dialog.Description>
        <button
          className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          // onClick={() => handleDelete(false)}
          onClick={(e) => {
            setLoaded(false)
            handleDelete()
          }}
        >
          Yes, I'm sure.
        </button>
        <button
          className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  )
}
export default Modal;