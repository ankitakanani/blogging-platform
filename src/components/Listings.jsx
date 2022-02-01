//components
import Listing from "./Listing";


const Listings = ({ posts, authUser }) => {
  const POSTS_PER_PAGE = posts.meta.per_page
  const initialDisplayPosts = posts.posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: posts.meta.current_page,
    totalPages: Math.ceil(posts.meta.total_entries / POSTS_PER_PAGE),
  }

  return (
    <>
      <Listing
        posts={posts}
        authUser={authUser}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />

    </>
  );
};

export default Listings;
