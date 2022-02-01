//components
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PostBody from "../components/Postbody";
import Loading from "./Loading";
import { Api } from '../services/Api.js';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

//context
import { Context } from "../context/Context";

const Post = () => {
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const Navigate = useNavigate();
  const { postId } = useParams();

  const { user, dispatch, isFetching } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await Api(`posts/${postId}`, {}, "getWithoutToken", user,
        dispatch, Navigate);
      if (res.status != 200) {
        toast.error(res.statusText)
      }
      setPost(res.data);
      setLoaded(true);
    };
    getPost();
  }, [postId]);

  return (
    <>
      {!loaded ? (
        <Loading />
      ) : (
        <>

          <PostBody
            authUser={user}
            postData={post.post}
          />

        </>
      )}
    </>
  );
};

export default Post;
