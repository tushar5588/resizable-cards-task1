import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Add.css";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const Add = () => {

  //declarations

  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  //api call

  useEffect(() => {
    axios.get(`http://localhost:3001/getdata2/${id}`).then((res) => {
      setApiData(res.data);
      setLoading(true);
    });
  });

  //add operation handler


  const [heading, setHeading] = useState(apiData.heading);
  const [subheading, setSubheading] = useState(apiData.subheading);
  const [text, setText] = useState(apiData.text);
  const data = {
    heading: heading,
    subheading: subheading,
    text: text,
    api: apiData.api + 1,
  };

  const add = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/update/${id}`, data).then((res) => {
      alert(res.data.message);
      navigate("/");
    });
  };


  //ui elements
  
  return (
    <>
      {loading ? (
        <div className="contact-wrapper2">
          <div className="container2">
            <div className="contact-box2">
              <div className="left2"></div>
              <div className="right2">
                <h2>Add Data</h2>
                <input
                  type="text"
                  className="field2"
                  placeholder="Heading"
                  name="heading"
                  value={heading}
                  onChange={(event) => setHeading(event.target.value)}
                />
                <input
                  type="text"
                  className="field2"
                  placeholder="Subheading"
                  name="subheading"
                  value={subheading}
                  onChange={(event) => setSubheading(event.target.value)}
                />
                <textarea
                  placeholder="Enter text..."
                  className="field2"
                  name="text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                <button onClick={add} className="btn2">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Add;
