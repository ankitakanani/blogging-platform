//components
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
//context
import { Context } from "../context/Context";
import { Api } from '../services/Api.js';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const [password, setPassword] = useState("");
  const { user, dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {

    e.preventDefault();

    dispatch({ type: "LOGIN_START" });


    let data = {
      user: {
        email: email,
        password: password
      }

    }
    var response = await Api(
      `users/sign_in`,
      data,
      "postWithoutToken", user,
      dispatch,
      Navigate
    )
    if (response != undefined && response.status != undefined) {
      if (response.status != 201) {
        if (response.status == 401) {
          toast.error(response.data.error)
        } else {
          toast.error(response.statusText)
        }
        dispatch({ type: "LOGIN_FAILURE" });
      } else {
        response.data.authorizationtoken = response.headers.authorization
        toast.success("Successfully logged in")
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      }
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.error("Unauthorized")
    }
  };


  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="mx-2 md:w-1/2 md:mx-auto text-center">

          <section className="App h-screen w-full flex justify-center items-center bg-gray-100 ">
            <div className="w-full max-w-md bg-gray-800" >
              <form onSubmit={handleSubmit} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                <div className="px-4 pb-4">
                  <label htmlFor="email" className="text-sm block font-bold  pb-2">EMAIL ADDRESS</label>
                  <input type="email" name="email" required
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="Johnbull@example.com" />
                </div>
                <div className="px-4 pb-4">
                  <label htmlFor="password" className="text-sm block font-bold pb-2">PASSWORD</label>
                  <input type="password" name="password" required
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300" placeholder="Enter your password" />
                </div>
                <div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                    px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
                </div>
                <div className="my-4 md:my-6">OR</div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  <Link to="/register" >Register</Link>
                </button>
              </form>

            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;
