import { Link } from "react-router-dom";

export default function Pagination({ totalPages, currentPage, endPoint, postId }) {
  // console.log(postId)
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <>
      {!prevPage && (
        <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
          Previous
        </button>
      )}
      {prevPage && endPoint == "Posts" && (
        <Link to={currentPage - 1 === 1 ? `/posts/` : `/posts?page=${currentPage - 1}`}>
          <button rel="previous">Previous</button>
        </Link>
      )}
      {prevPage && endPoint == "Comments" && (
        <Link to={currentPage - 1 === 1 ? `/posts/` + postId : `/posts/${postId}/comments?page=${currentPage - 1}`}>
          <button rel="previous">Previous</button>
        </Link>
      )}
      <span>
        {currentPage} of {totalPages}
      </span>
      {!nextPage && (
        <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
          Next
        </button>
      )}
      {nextPage && endPoint == "Posts" && (
        <Link to={`/posts?page=${currentPage + 1}`}>
          <button rel="next">Next</button>
        </Link>
      )}
      {nextPage && endPoint == "Comments" && (
        <Link to={`/posts/${postId}/comments?page=${currentPage + 1}`}>
          <button rel="next">Next</button>
        </Link>
      )}
    </>
  )
}
