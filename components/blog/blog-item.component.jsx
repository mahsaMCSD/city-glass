import React from "react";

const BlogItem = ({ imageUrl,url, title, description }) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <a href={url} className="card text-white text-center">
      <img className="card-image" src={imageUrl} alt="Card image" />
      <div className="card-img-overlay main-page-blur px-5">
        <h4 className="m-3">{title}</h4>
        <p className="card-text">{description}</p>
      </div>
    

    </a>
  </div>
);

export default BlogItem;
