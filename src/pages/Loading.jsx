//loading animation gif
import LoadingAnimation from "../assests/loading.gif";

const Loading = () => {
  return (
    <>
      <div className="w-4/6 md:w-1/4 mx-auto text-center">
        <img src={LoadingAnimation} alt="Loading..." className="w-full" />
      </div>
    </>
  );
};

export default Loading;
