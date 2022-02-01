//components
import { Link } from "react-router-dom";
// import { useState } from 'react'
// import Pagination from './Pagination'
import CommentLists from './CommentList'
//assets
// import DefaultCover from "../assests/default.jpg";
import Loading from "../pages/Loading";
import ApiConfig from "../config/apiConfig"
// import axios from "axios";
import { Api } from '../services/Api.js';
import { Context } from "../context/Context";

//hooks
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const Navigate = useNavigate();

  const { user, dispatch, isFetching } = useContext(Context);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await Api(`posts/${postId}/comments`, {}, "getWithoutToken", user,
        dispatch, Navigate);

      if (res.status != 200) {
        toast.error(res.statusText)
      }
      setComments(res.data);
      setLoaded(true);
    };
    fetchComments();
  }, [loaded, comments]);
  return (
    <>
      {!loaded ? (
        <Loading />
      ) : (
        <>

          <CommentLists comments={comments} postId={postId} />

        </>
      )}
    </>
  );
};

export default Comments;
