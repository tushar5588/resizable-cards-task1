import React, { useState, useEffect } from "react";
import "./Update.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader"
const Update = () => {

  // declarations 

  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  // api call

  useEffect(() => {
    axios.get(`http://localhost:3001/getdata2/${id}`).then((res) => {
      setApiData(res.data);
      setLoading(true);
    });
  });

  // update handler

  const [heading, setHeading] = useState(apiData.heading);
  const [subheading, setSubheading] = useState(apiData.subheading);
  const [text, setText] = useState(apiData.text);
  const data = {
    heading: heading ? heading : apiData.heading,
    subheading: subheading ? subheading : apiData.subheading,
    text: text ? text : apiData.text,
    api: apiData.api + 1,
  };

  const update = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:3001/update/${id}`, data).then((res) => {
      alert(res.data.message);
      navigate("/");
    });
  };

  // ui elements
  return (
    <>
      {loading ? (
        <div className="contact-wrapper">
          <div className="container">
            <div className="contact-box">
              <div className="left"></div>
              <div className="right">
                <h2>Update Data</h2>
                <input
                  type="text"
                  defaultValue={apiData.heading}
                  className="field"
                  placeholder="Heading"
                  value={heading}
                  onChange={(event) => setHeading(event.target.value)}
                />
                <input
                  type="text"
                  defaultValue={apiData.subheading}
                  className="field"
                  placeholder="SubHeading"
                  value={subheading}
                  onChange={(event) => setSubheading(event.target.value)}
                />
                <textarea
                  placeholder="Enter text..."
                  className="field"
                  defaultValue={apiData.text}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                <button onClick={update} className="btn">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader/>
      )}
    </>
  );
};

export default Update;
