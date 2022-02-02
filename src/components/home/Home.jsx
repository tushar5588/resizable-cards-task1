import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader"

const Home = () => {

  //state declarations


  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  //api call

  useEffect(() => {
    axios.get("http://localhost:3001/getdata").then((res) => {
      setApiData(res.data);
      setLoading(true);
    });
  });

  //ui elements

  return (
    <>
      {loading ? (
        <div className="wrapper">
          <div className="cards_wrap">
            <div className="card_item">
              <div className="card_inner">
                <div className="card_bottom">
                  <div className="card_category">{apiData[0].heading}</div>
                  <div className="card_info">
                    <p className="title">{apiData[0].subheading}</p>
                    <p>{apiData[0].text}</p>
                  </div>
                  <div className="buttons">
                    <Link className="button" to={`/add/${apiData[0]._id}`}>
                      Add
                    </Link>

                    <Link className="button" to={`/update/${apiData[0]._id}`}>
                      Update
                    </Link>
                  </div>
                  <div className="card_creator">API Calls@{apiData[0].api}</div>
                </div>
              </div>
            </div>

            <div className="card_item2">
              <div className="card_inner">
                <div className="card_bottom">
                  <div className="card_category">{apiData[1].heading}</div>
                  <div className="card_info">
                    <p className="title">{apiData[1].subheading}</p>
                    <p>{apiData[1].text}</p>
                  </div>
                  <div className="buttons">
                    <Link className="button" to={`/add/${apiData[1]._id}`}>
                      Add
                    </Link>

                    <Link className="button" to={`/update/${apiData[1]._id}`}>
                      Update
                    </Link>
                  </div>
                  <div className="card_creator">API Calls@{apiData[1].api}</div>
                </div>
              </div>
            </div>

            <div className="card_item3">
              <div className="card_inner">
                <div className="card_bottom">
                  <div className="card_category">{apiData[2].heading}</div>
                  <div className="card_info">
                    <p className="title">{apiData[2].subheading}</p>
                    <p>{apiData[2].text}</p>
                  </div>
                  <div className="buttons">
                    <Link className="button" to={`/add/${apiData[2]._id}`}>
                      Add
                    </Link>

                    <Link className="button" to={`/update/${apiData[2]._id}`}>
                      Update
                    </Link>
                  </div>
                  <div className="card_creator">API Calls@{apiData[2].api}</div>
                </div>
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

export default Home;
