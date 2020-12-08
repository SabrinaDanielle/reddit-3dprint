import React from "react";
import PropTypes from "prop-types";
import createdAt from "../../../utility";

const NoComments = (
  <section className="section">
    <div className="container">
      <h5>There are not any comments for this post</h5>
    </div>
  </section>
);

const Comments = (props) => {
  const { comments } = props;
  const commentsList = comments.data.children;

  return commentsList.length === 0 ? (
    NoComments
  ) : (
    <section className="section">
      <h3 className="title">Comments </h3>
      {commentsList.map((comment) => {
        const { author, body, created, score } = comment.data;
        const posted = createdAt(created);

        return (
          <div className="container block " key={`${author} ${created}`}>
            <div className="columns notification">
              <div className="column is-3 container">
                <p>{author}</p>
                <p>{posted}</p>
                <p>
                  <span className="score">score:</span> {score}
                </p>
              </div>

              <div className="column is-9">{body}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

Comments.propTypes = {
  comments: PropTypes.shape([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

export default Comments;
