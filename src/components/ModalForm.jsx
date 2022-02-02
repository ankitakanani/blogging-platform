
import { useState, useEffect, useContext } from "react";
import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

//context
import { Context } from "../context/Context";
import { Api } from '../services/Api.js';

const ModalForm = ({ edit, isOpen, setIsOpen, selectedPost,setLoaded }) => {
  const Navigate = useNavigate();
  const [commentcontent, setComment] = useState("");
  const [init, setInit] = useState(false)
  const { user, dispatch, isFetching } = useContext(Context);
  async function AddComments(e) {
    e.preventDefault();
    setIsOpen(false);
    setInit(false)
    setLoaded(false)
    const { id } = selectedPost;
    let data = {
      comment: {
        post_id: id,
        content: commentcontent
      },

    }
    const res = await Api(
      `comments`,
      data,
      "post",
      user,
      dispatch,
      Navigate

    )
    if (res.status != 201) {
      toast.error(res.statusText)
    } else {
      toast.success("Your comment has been submitted");
    }
   setLoaded(true)
  };
  async function EditComments(e) {
    e.preventDefault();
    setIsOpen(false);
    setLoaded(false)
    setInit(false)
    const { id } = selectedPost;
    let data = {
      comment: {
        content: commentcontent
      },

    }
    const res = await Api(`comments/${id}`, data, 'patch', user, dispatch, Navigate);
    if (res.status != 200) {

      toast.error(res.statusText)


    } else {
      toast.success("Your comment has been changed")
    }
    setLoaded(true)
  };

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={clsx(
        "fixed inset-0 z-20 flex items-center justify-center overflow-y-auto",
      )}
    >
      <div className="flex flex-col bg-gray-200 text-black w-96 py-4 px-2 text-center">

        <form onSubmit={!edit ? AddComments : EditComments} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
          <div className="px-2 pb-2">
            <label htmlFor="content" className="flex text-sm block font-bold pb-2 justify-start	">COMMENT CONTENT</label>
            <textarea required
              name="content" value={!init && selectedPost!=null? selectedPost.content : commentcontent}
              onChange={(e) => {
                setComment(e.target.value)
                setInit(true)
              }}
              className="w-5/6 md:w-full h-50 mx-auto p-1 border-2 rounded-lg border-gray-400"
              placeholder="CONTENT" />
          </div>


          <button
            className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            type="submit"
          >
            Save Comment    </button>
          <button
            className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              setInit(false)
              setIsOpen(false)
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </Dialog>
  )
}
export default ModalForm;