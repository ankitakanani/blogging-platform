//components
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import Pagination from './Pagination'
//assets
import FormatDate from '../services/FormatDate'

import Modal from "./Model";
import toast, { Toaster } from "react-hot-toast";
import { Api } from '../services/Api.js';
import { Context } from "../context/Context";
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Loading from "../pages/Loading";

const Listing = () => {
  const Navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const { user, dispatch, isFetching } = useContext(Context);
  const authUser = user
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [initialDisplayPosts, setinitialDisplayPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filteredBlogPosts, setfilteredBlogPosts] = useState([]);
  const { search } = useLocation();
  const [searchValue, setSearchValue] = useState('')
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Api(`posts${search}`, {}, "getWithoutToken", user,
        dispatch, Navigate);
      if (res.status != 200) {
        toast.error(res.statusText)
      }
      setPosts(res.data);
      setinitialDisplayPosts(res.data.posts.slice(0, res.data.meta.per_page))
      setfilteredBlogPosts(res.data.posts.filter((frontMatter) => {
        const searchContent = frontMatter.title + frontMatter.body + frontMatter.user.display_name
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
      }))
      setPagination({
        currentPage: res.data.meta.current_page,
        totalPages: Math.ceil(res.data.meta.total_entries / res.data.meta.per_page),
      })
      setLoaded(true);
    };
    fetchPosts();
  }, [searchValue,search, loaded]);

  async function handleDelete() {
    const { id } = selectedPost;
    setLoaded(false)
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
    setLoaded(true)
    deleteToggle()
  };
  function deleteToggle(selectedPostid = null) {
    setSelectedPost(selectedPostid);
    setDeleteModal(!deleteModal);
  };
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts


  return (
    <>
      {!loaded ? (
        <Loading />
      ) : (
        <>
          <div className="w-screen">
            <div className="w-1/2 mx-auto  ">
              <div className="divide-y">
                <div className="pt-6 pb-8 space-y-2 md:space-y-5">
                  <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    All Posts
                  </h1>
                  <div className="relative max-w-lg">
                    <input
                      aria-label="Search articles"
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search articles"
                      className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
                    />
                    <svg
                      className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <ul>
                  {!filteredBlogPosts.length && 'No posts found.'}
                  {displayPosts.map((frontMatter) => {
                    const { id, created_at, title, body, comment_count, user } = frontMatter
                    return (
                      <div>
                        <li key={id} className="py-12">
                          <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">

                            <dl>
                              <dt className="sr-only">Published on</dt>
                              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time dateTime={created_at}>{FormatDate(created_at)}</time>
                              </dd>
                            </dl>
                            <div className="space-y-3 xl:col-span-3">
                              <div className="flow-root ">

                                {authUser != null && authUser.id == user.id &&
                                  <div>
                                    <Link className="float-right  border-l-4 pt-1 px-4"
                                      to={`/write/${id}`}>  <img alt="icon" src="https://upload.wikimedia.org/wikipedia/commons/8/8a/OOjs_UI_icon_edit-ltr.svg"
                                        className="h-5 cursor-pointer" />
                                    </Link>
                                    <div className="float-right px-4" onClick={() =>
                                      deleteToggle({
                                        id
                                      })}>
                                      <img alt="icon" src="https://upload.wikimedia.org/wikipedia/commons/3/34/Icon_delete_2019_1.svg" className="h-7 cursor-pointer" />
                                    </div>
                                  </div>
                                }
                                <h3 className="text-2xl font-bold leading-8 tracking-tight">
                                  <Link to={`/posts/${id}`} className="text-gray-900 dark:text-gray-100">
                                    {title}
                                  </Link>
                                </h3>

                                <div className="flex flex-wrap text-green-500">


                                  {user.display_name}
                                </div>

                              </div>

                              <div className="prose text-gray-500 max-w-none dark:text-gray-400 truncate">
                                {body}
                              </div>
                              <div className="text-base font-medium leading-6 text-green-500">
                                <div className="flex justify-end	font-small text-gray-500">
                                  <div> comment: {comment_count} </div>
                                </div>
                                <Link
                                  to={`/posts/${id}`}
                                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                  aria-label={`Read "${title}"`}
                                >
                                  Read more &rarr;
                                </Link>

                              </div>
                            </div>
                          </article>

                        </li>
                        <hr></hr>
                      </div>
                    )
                  })}
                </ul>
                <div className="pt-6 pb-8 space-y-2 md:space-y-5">
                  <nav className="flex justify-between">
                    {pagination && pagination.totalPages > 1 && !searchValue && (
                      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} endPoint="Posts" />
                    )}
                  </nav>
                </div>
              </div>

            </div>
          </div>
          <Modal isOpen={deleteModal} setIsOpen={setDeleteModal} title="Delete the Article"
            body="Are you sure you want to delete your Article?" handleDelete={handleDelete} setLoaded={setLoaded} />
        </>
      )}
    </>
  );
};

export default Listing;
