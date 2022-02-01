//components
import { useContext, useState } from "react";
import Loading from "./Loading";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
//context
import { Context } from "../context/Context";
import { Api } from '../services/Api.js';

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const { user, dispatch, isFetching } = useContext(Context);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      post: {
        title: title,
        body: desc
      },

    }

    const res = await Api(
      `posts`,
      data,
      "post",
      user,
      dispatch,
      Navigate

    )
    if (res.status != 201) {
      toast.error(res.statusText)
    } else {
      toast.success("Your article has been published");
      Navigate("/posts/" + res.data.post.id);
    }
  };

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="mx-2 md:w-1/2 md:mx-auto text-center p-20	">
          <h1 className="font-heading text-4xl md:text-5xl py-6 md:py-10">
            Create New post
          </h1>
          <div className="w-full bg-gray-800" >
            <form onSubmit={handleSubmit} className=" bg-white   ">
              <div className="px-4 pb-4">
                <label htmlFor="title" className="flex text-sm block font-bold  pb-2 justify-start">POST TITLE</label>
                <input type="text" name="title" required
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-5/6 md:w-full  p-1 border-2 rounded-lg border-gray-400"
                  placeholder="TITLE" />
              </div>
              <div className="px-4 pb-4">
                <label htmlFor="content" className="flex text-sm block font-bold pb-2 justify-start	">POST CONTENT</label>
                <textarea required
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-5/6 md:w-full h-96 mx-auto p-1 border-2 rounded-lg border-gray-400"
                  placeholder="CONTENT" />
              </div>
              <div>
                <button className="w-5/6 md:w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                    px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Write;
