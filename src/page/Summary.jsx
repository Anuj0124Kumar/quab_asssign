import React from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  let { id } = useParams();
  const navigate = useNavigate();

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

  const handelInput = () => {
    document.getElementById("cont").style.display = "none";
    document.getElementById("summaryPart").style.display = "none";
    document.getElementById("formPart").style.display = "block";
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    person: "",
  });

  const [formArray, setFormArray] = useState([]);

  useEffect(() => {
    const storedFormArray = JSON.parse(localStorage.getItem("formArray")) || [];
    setFormArray(storedFormArray);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    let { name, email, person } = formData;

    person = Number(person);

    if (name === "") {
      alert("name field is required");
      return;
    } else if (email === "") {
      alert("email field is required");
      return;
    } else if (!email.includes("@")) {
      alert("pls enter valid email Id");
      return;
    } else if (person > 4) {
      alert("The maximum number of tickets allowed per person is four.");
      return;
    } else {
      setFormArray([...formArray, formData]);
      localStorage.setItem(
        "formArray",
        JSON.stringify([...formArray, formData])
      );
      setFormData({ name: "", email: "", person: "" });

      document.getElementById("cont").style.display = "block";
      document.getElementById("summaryPart").style.display = "block";
      document.getElementById("formPart").style.display = "none";

      alert("Ticket Booked and Book another one !");
      navigate("/");
    }
  };

  return (
    <div className="mainHead">
      <Navbar />

      {oneMovie.map((Item,idx) => {
        if (Item.show.id === id) {
          return (
            <div className="container d-flex justify-content-center p-5 onMobile"  >
              <div className="card" style={{ width: "18rem" }} id="cont" >
                <img               
                  src={
                    Item.show.image !== null
                      ? Item.show.image.medium
                      : "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg"
                  }
                  className="card-img-top "
                  alt="..."
                  style={{ minHeight: "200px", minWidth: "300px" }}
                />
              </div>
              <div
                id="summaryPart"
                className="card-body p-5 desc "
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                <h4
                  style={{ color: "brown", marginLeft: "250px" }}
                  className="head"
                >
                  {Item.show.name}
                </h4>
                <p className="card-text para" style={{ marginLeft: "250px" }}>
                  {Item.show.summary.slice(3, Item.show.summary.length - 4)}
                </p>
                <button
                  onClick={handelInput}
                  type="button"
                  className="btn btn-primary para"
                  style={{ marginLeft: "250px" }}
                >
                  Book Now
                </button>
              </div>
              <form
                className="position-absolute z-index-2"
                style={{ display: "none" }}
                id="formPart"
              >
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                    placeholder={Item.show.name}
                  >
                    Movie
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                      defaultValue={Item.show.name}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail3"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Person
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="inputEmail3"
                      name="person"
                      value={formData.person}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handelSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          );
        } else {
          return <></>;
        }
      })}
    </div>
  );
}
