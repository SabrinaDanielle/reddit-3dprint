import React from "react";

const Loading = () => (
  <section className="hero  is-large">
    <div className="hero-body">
      <h2 className="subtitle hero-header">
        Grabbing some post...just a moment, please...
      </h2>
      <progress className="progress is-small is-primary" max="100">
        15%
      </progress>
      <progress className="progress is-danger" max="100">
        30%
      </progress>
      <progress className="progress is-medium is-dark" max="100">
        45%
      </progress>
      <progress className="progress is-large is-info" max="100">
        60%
      </progress>
    </div>
  </section>
);

export default Loading;
