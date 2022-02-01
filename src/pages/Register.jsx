//components
import { useState, useContext } from "react";
import { Context } from "../context/Context";
import { Api } from '../services/Api.js';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const Navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    let data = {
      user: {
        display_name: username,
        email: email,
        password: password
      },

    }
    const response = await Api(
      `users`,
      data,
      "postWithoutToken", user,
      dispatch, Navigate
    )
    if (response != undefined && response.status != undefined) {
      if (response.status != 201) {
        setError(true);
        if (response.status == 422) {
          toast.error("email has already been taken")
        } else {
          toast.error(response.statusText)
        }
      } else {
        response.data.authorizationtoken = response.headers.authorization
        toast.success("Congratulations, your account has been successfully created.")
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        Navigate('/');
      }
    } else {
      setError(true);
      toast.error("Unauthorized")
    }
  };
  return (
    <>
      <div className="mx-2 md:w-1/2 md:mx-auto text-center">
        <section className="App h-screen w-full flex justify-center items-center bg-gray-100 ">
          <div className="w-full max-w-md bg-gray-800" >
            <form onSubmit={handleSubmit} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
              <div className="px-4 pb-4">
                <label htmlFor="username" className="text-sm block font-bold  pb-2">USER NAME</label>
                <input type="text" name="username" required
                  onChange={(e) => setUsername(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="John bull" />
              </div>
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
                    px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
              </div>

            </form>
            {error && <div>Something went wrong!</div>}
          </div>
        </section>
      </div>



    </>
  );
};

export default Register;
