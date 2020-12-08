import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import createdAt from "../../../utility";

const Article = (props) => {
  const [isLoading, setIsloading] = useState();
  const { article } = props;

  useEffect(() => {
    setIsloading(true);
    if (article !== undefined) {
      setIsloading(false);
    }
  }, [props, article]);

  const {
    author,
    title,
    selftext,
    created,
    score,
    thumbnail,
  } = article.data.children[0].data;
  const posted = createdAt(created);
  return (
    <section className="section content is-medium ">
      {/* <h3 className="title is-1">Article </h3> */}
      {isLoading && <div>Loading...</div>}
      {
        <>
          <div className="is-block">
            <h1 className="title is-2 ">{title}</h1>
            <p className="subtitle">--{author}</p>
            <p>{posted}</p>
            <p>
              <span className="icon">
                <i className="fas fa-home" />
              </span>
              <span className="score">score:</span> {score}
            </p>
          </div>

          {thumbnail && selftext && <img alt={title} src={thumbnail} />}
          {
            <article className="content notification is-primary is-medium box container">
              <p>
                {" "}
                {selftext === "" ? (
                  <img alt={title} src={thumbnail} />
                ) : (
                  selftext
                )}
              </p>
            </article>
          }
        </>
      }
    </section>
  );
};

Article.propTypes = {
  article: PropTypes.shape([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

export default Article;
