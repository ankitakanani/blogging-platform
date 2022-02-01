//components
import { useLocation,useSearchParams } from "react-router-dom";
// import axios from "axios";
// import Cover from "../components/Cover";
import Listings from "../components/Listings";
import Loading from "./Loading";
import ApiConfig from "../config/apiConfig"
import { Context } from "../context/Context";
import { Api } from '../services/Api.js';
import toast from "react-hot-toast";

//hooks
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { search } = useLocation();
  const { user, dispatch,isFetching } = useContext(Context);
  const Navigate = useNavigate();

  useEffect(() => {
       const fetchPosts = async () => {
      const res = await Api(`posts${search}`, {}, "getWithoutToken",  user,
      dispatch,Navigate);
      if(res.status!=200){
        toast.error(res.statusText)
      }
      setPosts(res.data);
      setLoaded(true);
    };
    fetchPosts();
  }, [search, loaded]);


  return (
    <>
      {!loaded ? (
        <Loading />
      ) : (
        <>
          <Listings posts={posts} authUser={user}  />
        </>
      )}
    </>
  );
};

export default Home;
