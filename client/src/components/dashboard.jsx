import React from "react";
import "../css/dashboard.css";
import menuimg from "../pics/menu.png";
import doc1img from "../pics/doc1.jpg";
import doc2img from "../pics/doc2.jpg";
import doc3img from "../pics/doc3.jpg";
import doc4img from "../pics/doc4.jpeg";
import doc5img from "../pics/doc5.jpeg";
import doc6img from "../pics/doc6.jpeg";
import girlimg from "../pics/girl.jpg";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Chart } from "react-google-charts";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
export default function dashboard(props) {
  const { ready, user, setUser } = useContext(UserContext);
  const [out, setOut] = React.useState(null);
  async function logout() {
    try {
      await axios.post("/logout");
      setUser(null);
      setOut("/");
    } catch (error) {
      // Handle the error here
      alert("Unable to logout");
      console.error("Error during logout:", error);
    }
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !out) {
    return <Navigate to={"/login"} />;
  }
  function see() {
    console.log(user);
  }

  // if (props.login === false) {
  //   return <Navigate to="/login" replace={true} />;
  // }
  if (out) {
    console.log("redirected to index");
    return <Navigate to={out} replace={true} />;
  }

  const percentage = 40;
  const data = [
    ["Task", "Percentage"],
    ["Depressed", Math.floor(percentage)],
    ["Normal", 100 - percentage],
  ];

  const emotiondata = [
    "neutral",
    "neutral",
    "sad",
    "sad",
    "sad",
    "sad",
    "disgusted",
    "disgusted",
    "anger",
    "anger",
  ];
  const data2 = [["Emotion", "Frequency"]];
  emotiondata.forEach((emotion) => {
    const existingRow = data2.find((row) => row[0] === emotion);
    if (existingRow) {
      existingRow[1]++;
    } else {
      data2.push([emotion, 1]);
    }
  });
  return (
    <div className="dashboardpage">
      <section id="sidebar">
        <a href="#" className="brand">
          <i className="bx bxs-brain" />
          <span className="text1">OptimisticAir</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#dash">
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#analytics">
              <i className="bx bxs-doughnut-chart" />
              <span className="text">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#reportt">
              <i className="bx bxs-message-dots" />
              <span className="text">Report</span>
            </a>
          </li>
          <li>
            <a href="#helpingg">
              <i className="bx bxs-group" />
              <span className="text">Help Center</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout">
              <i className="bx bxs-log-out-circle" />
              <button onClick={logout} className="btn btn-light">
                <span className="text">Logout</span>
              </button>
            </a>
          </li>
          <ul></ul>
        </ul>
        {/* <button onClick={see}>see result</button> */}
      </section>
      <section id="content">
        <nav>
          <i className="bx bx-menu" />
          <form action="#">
            <div className="form-input">
              <button type="submit" className="search-btn">
                <i className="bx bx-search" />
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode" />
          <a href="#" className="notification" id="userpic">
            <Link to="/" replace={true}>
              <i className="bx bxs-home" />
            </Link>
          </a>
          <a href="#" className="profile">
            <img src={girlimg} />
          </a>
        </nav>
        <main>
          <div className="head-title" id="dash">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="box-info">
            <li>
              <img className="imggg" src={girlimg} />
              <span className="text">
                <h1>{user.firstname}</h1>
                {/* <h4> Student</h4> */}
                <div className="boxx2">
                  <p>Location : {user.location}</p>
                  {/* <p> Gender: Female</p> */}
                  <p>Age : {user.age}</p>
                  <p>Phone No. : {user.phoneno}</p>
                  <p>Email : {user.email}</p>
                  {/* <p>Weight: 55kg</p> */}
                </div>
              </span>
            </li>
          </ul>
          <section className="container" id="analytics">
            <div className="analysis">
              <h1 className="cng">Analysis</h1>
              <br />
              <h1 className="result">Overall result</h1>
              <div id="piechart" className="chart" />
              <Chart
                width={"400px"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                  pieHole: 0.4, // Adjust the size of the pie hole (0 to 1)
                  colors: ["red", "#008000"], // Green for result, gray for remaining
                  backgroundColor: "white",
                }}
                rootProps={{ "data-testid": "1" }}
              />

              <h3 className="txt">Score:250</h3>
              <br />
              <h1 className="result">Video Result</h1>
              {/* <div id="curve_chart" className="chart1" /> */}
              <Chart
                width={"400px"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data2}
                options={{
                  backgroundColor: "white",
                }}
                rootProps={{ "data-testid": "1" }}
              />
              <h3 className="txt">Score:120</h3>
            </div>
          </section>
          <div className="table-data" id="reportt">
            <div className="order">
              <div className="head">
                <h3>Report</h3>
                <i className="bx-bx-search" />
                <i className="bx bx-filter" />
                <a href="#" className="btn-download">
                  <i className="bx bxs-cloud-download" />
                  <span className="text">Download PDF</span>
                </a>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Test Id</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>SEPT1-23</p>
                    </td>
                    <td>01-09-23</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>SEPT2-23</p>
                    </td>
                    <td>08-09-23</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>SEPT3-23</p>
                    </td>
                    <td>16-09-23</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>SEPT4-23</p>
                    </td>
                    <td>24-09-23</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>OCT1-23</p>
                    </td>
                    <td>2-10-23</td>
                    <td>
                      <span className="status process">Process</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="helping" id="helpingg">
            <div className="help">
              <div className="help-box">
                <img src={menuimg} className="menu-icon" />
                <img src={doc1img} className="profile-pic" />
                <h4>Dr. Jenny</h4>
                <p>Doctor at MAX</p>
                <div className="socialsss">
                  <div className="phone1">
                    <i
                      className="bx bxs-phone-call"
                      style={{ color: "#ffffff" }}
                    />
                    <p>+1123456</p>
                  </div>
                  <div className="phone2">
                    <i className="bx bx-envelope" />
                    <p>maihudoc1@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="help-box">
                <img src={menuimg} className="menu-icon" />
                <img src={doc2img} className="profile-pic" />
                <h4>Dr. Mary</h4>
                <p>Counsellor at MAMC</p>
                <div className="socialsss">
                  <div className="phone1">
                    <i
                      className="bx bxs-phone-call"
                      style={{ color: "#ffffff" }}
                    />
                    <p>+11428936</p>
                  </div>
                  <div className="phone2">
                    <i className="bx bx-envelope" />
                    <p>maihudoc2@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="help-box">
                <img src={menuimg} className="menu-icon" />
                <img src={doc3img} className="profile-pic" />
                <h4>Dr. Biswas</h4>
                <p>Senior Doctor at AIIMS</p>
                <div className="socialsss">
                  <div className="phone1">
                    <i
                      className="bx bxs-phone-call"
                      style={{ color: "#ffffff" }}
                    />
                    <p>+1187256</p>
                  </div>
                  <div className="phone2">
                    <i className="bx bx-envelope" />
                    <p>maihudoc3@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="help-box">
                <img src={menuimg} className="menu-icon" />
                <img src={doc4img} className="profile-pic" />
                <h4>Dr. Gupta</h4>
                <p>Senior Counsellor at AIIMS</p>
                <div className="socialsss">
                  <div className="phone1">
                    <i
                      className="bx bxs-phone-call"
                      style={{ color: "#ffffff" }}
                    />
                    <p>+11561456</p>
                  </div>
                  <div className="phone2">
                    <i className="bx bx-envelope" />
                    <p>maihudoc4@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="help-box">
                <img src={menuimg} className="menu-icon" />
                <img src={doc5img} className="profile-pic" />
                <h4>Dr. Verma</h4>
                <p>Psychiatrist at MAMC</p>
                <div className="socialsss">
                  <div className="phone1">
                    <i
                      className="bx bxs-phone-call"
                      style={{ color: "#ffffff" }}
                    />
                    <p>+115891456</p>
                  </div>
                  <div className="phone2">
                    <i className="bx bx-envelope" />
                    <p>maihudoc5@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="help-box">
                <img src={menuimg} className="menu-icon" />
                <img src={doc6img} className="profile-pic" />
                <h4>Dr. Alis</h4>
                <p>Junior Counsellor at SDF</p>
                <div className="socialsss">
                  <div className="phone1">
                    <i
                      className="bx bxs-phone-call"
                      style={{ color: "#ffffff" }}
                    />
                    <p>+11761421</p>
                  </div>
                  <div className="phone2">
                    <i className="bx bx-envelope" />
                    <p>maihudoc6@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
