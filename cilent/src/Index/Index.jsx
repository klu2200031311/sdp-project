import axios from "axios";
import React, { useEffect, useState } from "react";

function Index() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/managePublicNotice")
      .then((res) => {
        if (res.data.Status === "Success") {
          const publicNotices = res.data.Result;
          setData(publicNotices);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSlideChange = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };
  return (
    <div>
      <div className="hero_area">
        <header className="header_section" style={{ backgroundColor: "white" }}>
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <a className="navbar-brand" href="/index">
                <span>Student</span>{" "}
                <span style={{ color: "red" }}>Management</span>
                <span> System</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className=""> </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="btn btn-success" href="/studentLogin">
                      <span>Student Login</span>
                      <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <li className="nav-item active">
                    <a className="btn btn-success" href="/adminlogin">
                      <span>Admin Login</span>
                      <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <section className="slider_section">
          <div className="slider_bg_box">
            <img src="images/slider-bg.jpg" alt="" />
          </div>
          <div
            id="customCarousel1"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {data.map((publicNotice, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7 col-lg-6">
                        <div className="detail-box">
                          <h4>
                            <span style={{ color: "red" }}>
                              {publicNotice.noticetitle}
                            </span>
                            <br />
                            <br />
                            <span style={{ color: "blue" }}>
                              {publicNotice.entrydate.slice(0, 16)}
                            </span>
                          </h4>
                          <br />
                          <h5 style={{ color: "black" }}>
                            {publicNotice.noticemessage}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="container">
              <ol className="carousel-indicators">
                {data.map((_, index) => (
                  <li
                    key={index}
                    data-target="#customCarousel1"
                    data-slide-to={index}
                    className={index === activeIndex ? "active" : ""}
                    onClick={() => handleSlideChange(index)}
                  ></li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Index;
