import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [mode , setMode] = useState("dark-mode"); // for theme

  const change = () => {
    if(mode === "dark-mode"){
      setMode("light-mode")
    }
    else {
      setMode("dark-mode")
    }
  }

  useEffect(() => {
    document.querySelector("body").className = mode;
    document.querySelector("body").style.backgroundColor = mode === "dark-mode" ? "black" : "white";
    document.querySelector("body").style.color = mode === "dark-mode" ? "white" : "black";
    
    const resultDataElement = document.querySelector(".result-data p");
    if (resultDataElement) {
      resultDataElement.style.color = mode === "dark-mode" ? "white" : "black";
    }
    
    const resultTitleElement = document.querySelector(".result-title p");
    if (resultTitleElement) {
      resultTitleElement.style.color = mode === "dark-mode" ? "white" : "black";
    }
    
    const boldElements = document.querySelectorAll(".result-data p b");
    boldElements.forEach(element => {
      element.style.color = mode === "dark-mode" ? "white" : "black";
    });
  }, [mode, resultData]);

  // for adding title image
  useEffect(() => {
    document.title = "Gemini";
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = assets.gemini_icon; // Set your favicon path here
    } 
  }, []);

  return (
      <div className={`main ${mode}`}>
        <div className="nav">
          <p>{mode == "dark-mode" ?<span>Gemini</span>  : <span className="gemini2">Gemini</span>}</p>
          <div className="cont">
            <button onClick={change} className="icon">
              { mode == "dark-mode" ?
              <FontAwesomeIcon icon={faMoon}/>
              : <FontAwesomeIcon icon={faSun} className="icon2img" />
              }
            </button>
            <img src={assets.user_icon3} alt="Not Visible" />
          </div>
        </div>
        <div className="main-container">
          {!showResult ? ( //false
            <>
              <div className="greet">
                <p>
                  <span>Hello, Banti</span>
                </p>
                <p className="secp">{ mode == "dark-mode" ? <p>How can I help You Today? </p>: <p className="whites">How can I help You Today?</p> }</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>
                    Get clear explanations for complex issues in technology,
                    finance, and daily life
                  </p>
                  <img src={assets.compass_icon} alt="Not available" />
                </div>
                <div className="card">
                  <p>
                    Stay ahead with the latest tech news, gadget reviews, and
                    software tutorials
                  </p>
                  <img src={assets.bulb_icon} alt="Not available" />
                </div>
                <div className="card">
                  <p>
                    Discover the best travel destinations, get safety tips, and
                    find the best times to visit
                  </p>
                  <img src={assets.message_icon} alt="Not available" />
                </div>
                <div className="card">
                  <p>
                    Get tips on staying healthy, find workout routines, and
                    learn about nutrition
                  </p>
                  <img src={assets.code_icon} alt="Not available" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon3} alt="Not available" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="Not available" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}

          {/* main-bottom */}
          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                id="input"
                name="input"
                placeholder="Ask Gemini"
              />
              <div className="action-img">
                <img
                  className="action-btn"
                  src={assets.gallery_icon}
                  alt="Not Available"
                />
                <img
                  className="action-btn"
                  src={assets.mic_icon}
                  alt="Not Available"
                />
                <img
                  onClick={() => onSent()}
                  className="action-btn"
                  src={assets.send_icon}
                  alt="Not Available"
                />
              </div>
            </div>
            <p className="bottom-info">
              Gemini can make mistakes, so double-check it
            </p>
          </div>
        </div>
      </div>
  );
};

export default Main;
