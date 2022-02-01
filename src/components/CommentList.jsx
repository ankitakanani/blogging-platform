//components
import CommentBody from "./CommentBody";
import { Context } from "../context/Context";
import { useState, useEffect, useContext } from "react";


const CommentLists = ({ comments, postId }) => {
  const Comments_PER_PAGE = comments.meta.per_page
  const { user } = useContext(Context);
  const pagination = {
    currentPage: comments.meta.current_page,
    totalPages: Math.ceil(comments.meta.total_entries / Comments_PER_PAGE),
  }
  return (
    <>
      <div>
        <CommentBody
          authUser={user}
          comments={comments}
          postId={postId}
          userData={user}
          pagination={pagination}
          title="All Comments"
        />
      </div>
    </>
  );
};

export default CommentLists;
