//components
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "./Model";
import ModalForm from "./ModalForm";
import toast, { Toaster } from "react-hot-toast";
import { Api } from '../services/Api.js';
import SectionContainer from "./SectionContainer.jsx";
import PageTitle from "./PostHeading";
import Comments from "./Comments";
import { Context } from "../context/Context";
import { useNavigate } from 'react-router-dom';
import FormatDate from '../services/FormatDate'

const PostBody = ({ authUser, postData }) => {
  const Navigate = useNavigate();

  const [commentShow, setcommentShow] = useState(false)
  const { user, dispatch, isFetching } = useContext(Context);

  const ShowComments = () => {
    setcommentShow(true);
  }
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  async function handleDelete() {
    setDeleteModal(!deleteModal);

    const { id } = selectedPost;

    let res = await Api(`posts/${id}`, {}, "delete", user, dispatch, Navigate)
    if (res.status != 204) {
      if (res.status == 401) {
        toast.error(res.data.error)
      } else {
        toast.error(res.statusText)
      }

    } else {

      toast.success("Your article has been deleted")
      Navigate('/');
    }

  };

  function deleteToggle(selectedPostid = null) {
    setSelectedPost(selectedPostid.postData);
    setDeleteModal(!deleteModal);
  };
  function commentToggle(selectedPostid = null) {
    setcommentShow(true);
    if (postData.commentModal <= 0) {
      postData.comment_count++

    }
    setSelectedPost(selectedPostid.postData);
    setCommentModal(!commentModal);
  };
  return (
    <>
      <SectionContainer>
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div className="flow-root ">
                    <dd className=" text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={postData.created_at}>
                        {FormatDate(postData.created_at)}
                      </time>
                    </dd>
                    {authUser != null && authUser.id == postData.user.id &&
                      <dd className="float-right">
                        <div className="  pt-2 pb-2 text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 
px-4 rounded focus:outline-none focus:shadow-outline">
                          <Link
                            to={`/write/${postData.id}`}>Edit this Article
                          </Link>
                        </div>
                        <div className="pt-2">
                          <div className="  pt-2 pb-2 text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 
px-4 rounded focus:outline-none focus:shadow-outline">
                            <div
                              className="cursor-pointer" onClick={() =>
                                deleteToggle({ postData })}>Delete this Article

                            </div>
                          </div>
                        </div>
                      </dd>
                    }
                  </div>
                </dl>
                <div>
                  <PageTitle>{postData.title}</PageTitle>
                </div>
              </div>
            </header>
            <div
              className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >

              <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                    <li className="flex items-center space-x-2" key={postData.user.id}>

                      <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{postData.user.display_name}</dd>


                      </dl>
                    </li>
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
                <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">{postData.body}</div>
                <div className="flex justify-end	font-small text-gray-500">
                  <div> Last updated on   {FormatDate(postData.updated_at)} </div>
                </div>

                {postData.comment_count > 0 && !commentShow &&
                  <div className=" pt-2 pb-2 text-center text-gray-700 dark:text-white-300 bg-gray-300">
                    <div onClick={ShowComments} className="cursor-pointer" >View all {postData.comment_count} comments
                    </div>
                  </div>

                }
                {postData.comment_count > 0 && commentShow &&
                  <Comments postId={postData.id} />
                }
                {authUser != undefined && authUser != null ?
                  <div className=" pt-2 pb-2 text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 
                  px-4 rounded focus:outline-none focus:shadow-outline">
                    <div onClick={() =>
                      commentToggle({ postData })} className="cursor-pointer" > Add Comments

                    </div>
                  </div>
                  :
                  <div className=" pt-2 pb-2 text-center text-gray-700 dark:text-white-300 bg-gray-300">
                    <Link
                      to="/login"

                    >LOGIN to comment on this Article
                    </Link>
                  </div>


                }
              </div>
              <footer>
                <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link
                    to="/"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
      <Modal isOpen={deleteModal} setIsOpen={setDeleteModal} title="Delete the Article" body="Are you sure you want to delete your Article?" handleDelete={handleDelete} />
      <ModalForm edit={false} isOpen={commentModal} setIsOpen={setCommentModal} selectedPost={selectedPost} content="" />
    </>
  );
};

export default PostBody;
