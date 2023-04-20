import React, { useEffect } from "react";
import MovieDataRander from "./MovieDataRander";
import { useState } from "react";

export default function MovieData() {
  const [Movie, setMovie] = useState([]);

  const URL = "https://api.tvmaze.com/search/shows?q=all";

  async function fetchData() {
    let res = await fetch(URL);
    let data = await res.json();

    setMovie(data);
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeOut);
  }, []);

  //console.log(Movie);

  return (
    <div className="container ">
      <div className="row">
        {Movie.map((MovieData,idx) => {
          return (
            <div className="col-md-4" key={idx}>
              <MovieDataRander MoviePass={MovieData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

//https://api.tvmaze.com/search/shows?q=all
