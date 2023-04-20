import React from "react";
import { Link } from "react-router-dom";

export default function MovieDataRander(props) {
  let image = props.MoviePass.show.image;
  let name = props.MoviePass.show.name;
  let language = props.MoviePass.show.language;
  let rating = props.MoviePass.show.rating.average;
  let id = props.MoviePass.show.id;
  return (
    <div className="my-3 ">
      <div>
        <div>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={
                image !== null
                  ? image.medium
                  : "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg"
              }
              className="card-img-top"
              alt="No Found"
            />
            <div className="card-body desc">
              <h5 className="card-title">{name}</h5>
              <p
                class="card-text"
                style={{ color: "brown" }}
              >{`Language : ${language}, Rating : ${
                rating !== null ? rating : "not yet"
              }`}</p>
              <Link to={`Movie/${id}`} className="btn btn-primary">
                Go To Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//{`Movie/${id}`}
