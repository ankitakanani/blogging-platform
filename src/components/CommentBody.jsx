//components
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import Pagination from './Pagination'
import Modal from "./Model";
import ModalForm from "./ModalForm";
import toast, { Toaster } from "react-hot-toast";
import { Api } from '../services/Api.js';
import { Context } from "../context/Context";
import { useNavigate } from 'react-router-dom';
import FormatDate from '../services/FormatDate'
import Loading from "../pages/Loading";

const CommentBody = ({ postId }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { user, dispatch, isFetching } = useContext(Context);
  const authUser = user
  const [commentModal, setCommentModal] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchComments = async () => {
      const res = await Api(`posts/${postId}/comments`, {}, "getWithoutToken", user,
        dispatch, Navigate);

      if (res.status != 200) {
        // toast.error(res.statusText)
      }
      setComments(res.data);
      setLoaded(true);
      setPagination({
        currentPage: res.data.meta.current_page,
        totalPages: Math.ceil(res.data.meta.total_entries / res.data.meta.per_page),
      })
    };
    fetchComments();
  }, [loaded]);
  function commentToggle(selectedCommentid = null) {
    setSelectedComment(selectedCommentid.frontMatter);
    setCommentModal(!commentModal);
  };
  async function handleDelete() {
    setLoaded(false)
    const { id } = selectedComment;
    let res = await Api(`comments/${id}`, {}, "delete", user, dispatch, Navigate)
    if (res.status != 200) {
      if (res.status == 401) {
        toast.error(res.data.error)
      } else {
        toast.error(res.statusText)
      }
    } else {
      toast.success("Your comment has been removed")
    }
    setLoaded(true)
    deleteToggle();
  };
  function deleteToggle(selectedCommentid = null) {
    // console.log(selectedCommentid)
    if(selectedCommentid!=null){
      setSelectedComment(selectedCommentid.frontMatter);
    }else{
      setSelectedComment(null)
    }
    
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      {!loaded ? (
        <Loading />
      ) : (
        <>
          <div className="divide-y">
            <div className="pt-1 pb-1 space-y-2 md:space-y-5">
              <div className=" font-small ">
                All Comments
              </div>
            </div>
            <ul>
              {comments.comments.map((frontMatter) => {
                const { id, created_at, content, user } = frontMatter
                return (
                  <div>
                    <li key={id} className="py-2">
                      <article className="space-y-2 ">
                        <dl>
                          <dt className="sr-only">Commented by</dt>
                          <dd className="text-base font-small leading-6 text-green-500 dark:text-gray-400">
                            {user.display_name}
                            <span className="text-grey-500">
                              :
                            </span>
                          </dd>
                          {authUser != null && authUser.id == user.id &&
                            <div>
                              <div className="float-right  border-l-4 pt-1 px-4" onClick={() =>
                                commentToggle({ frontMatter })} >
                                <img alt="icon" src="https://upload.wikimedia.org/wikipedia/commons/8/8a/OOjs_UI_icon_edit-ltr.svg"
                                  className="h-5 cursor-pointer" />
                              </div>
                              <div className="float-right px-4" onClick={() =>
                                deleteToggle({ frontMatter })} >
                                <img alt="icon" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Icon_delete_2019_1.svg"
                                  className="h-7 cursor-pointer" />
                              </div>
                            </div>
                          }
                          <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                            {content}
                          </div>
                          <dt className="sr-only">Commented on</dt>
                          <dd className="text-base font-small leading-6  text-green-500 dark:text-gray-400">
                            <time dateTime={created_at}>{FormatDate(created_at)}</time>
                          </dd>
                        </dl>
                        <div>
                        </div>
                      </article>
                    </li>
                    <hr></hr>
                  </div>
                )
              })}
            </ul>
          </div>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} endPoint="Comments" postId={postId} />
          )}
          <Modal isOpen={deleteModal} setIsOpen={setDeleteModal} title="Delete the Comment"
            body="Are you sure you want to delete your Comment?" handleDelete={handleDelete} setLoaded={setLoaded} />
          <ModalForm
            edit={true} isOpen={commentModal} setIsOpen={setCommentModal} selectedPost={selectedComment}
             setLoaded={setLoaded} />
        </>
      )}
    </>
  );
};

export default CommentBody;
