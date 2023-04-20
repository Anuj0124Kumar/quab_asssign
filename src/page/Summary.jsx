import React from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Summary() {
  let { id } = useParams();

  const [oneMovie, setOneMovie] = useState([]);

  const URL = "https://api.tvmaze.com/search/shows?q=all";

  async function fetchData() {
    let res = await fetch(URL);
    let data = await res.json();

    setOneMovie(data);
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeOut);
  }, []);

  id = Number(id);

  return (
    <div  className="mainHead" >
      <Navbar />

      {oneMovie.map((Item) => {
        if (Item.show.id === id) {
          return (
            <div className="container d-flex justify-content-center p-5 onMobile" >
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={
                    Item.show.image !== null
                      ? Item.show.image.medium
                      : "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg"
                  }
                  className="card-img-top"
                  alt="..."
                  style={{minHeight:"200px",minWidth:"300px"}}
                /> 
              </div>
              <div className="card-body p-5 desc " style={{ fontSize:"20px", fontWeight:"600" }}>
                <h4 style={{color:"brown",marginLeft:"190px"}} className="head" >{ Item.show.name}</h4>
                <p className="card-text para" style={{marginLeft:"190px"}}>
                  {Item.show.summary.slice(3,Item.show.summary.length-4)}
                </p>
                <button type="button" className="btn btn-primary para"  style={{marginLeft:"190px"}}>Book Now</button>
              </div>
              
            </div>
          );
        } else {
          return <></>;
        }
      })}
    </div>
  ); 
}
