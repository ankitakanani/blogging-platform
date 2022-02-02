//components
import { useContext, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

//pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Listing from "./components/Listing";
import PostBody from "./components/Postbody";
import Write from "./pages/Write";
import WriteEdit from "./pages/WriteEdit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FourZeroFour from "./pages/404";
import { history } from './services/history';

//context
import { Context } from "./context/Context";
import toast, { Toaster } from "react-hot-toast";
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();  
function App() {
  const { user } = useContext(Context);
  // const Navigate = useNavigate();

  let token = "";

  if (user) token = user.authorizationtoken;

  return (

    <Router history={history}>
      <Fragment>
        <div className="App box-border">
          <Navbar />
          <Toaster />
          <Routes >
            <Route exact path="/" element={<Listing />} />
            <Route exact path="/posts" element={<Listing />} />
            <Route exact path="/posts/:postId" element={<PostBody />} />
            <Route path="/write" element={token ? <Write /> : <Navigate to="/login" /> } />
            <Route path="/write/:postId" element={token ? <WriteEdit /> : <Navigate to="/login" /> } />
            <Route path="/login" element={token ? <Navigate to="/" />: <Login /> } />
            <Route path="/register" element={token ? <Navigate to="/" />: <Register /> } />
            <Route path='*' element={<FourZeroFour />} />
          </Routes>
          <Footer />
        </div>
      </Fragment>
    </Router>
  );
}
export default App;
