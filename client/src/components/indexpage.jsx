import React from "react";
import { Link } from "react-router-dom";
import "../css/indexpage.css";
import pic1 from "../pics/img1.png";
import pic2 from "../pics/cartoon.png";
import { useContext } from "react";
import { UserContext } from "../UserContext";
export default function indexpage(props) {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="indexpage">
        <header className="header">
          <a href="#" className="logo">
            OptimisticAir
          </a>
          <nav className="navbar">
            <a href="#" style={{ "--i": "1" }} className="active">
              Home
            </a>
            <a href="#testsec" style={{ "--i": "3" }}>
              Take Test
            </a>
            <a href="#foot" style={{ "--i": "4" }}>
              Contacts
            </a>
            {user ? (
              <Link to="/dashboard" style={{ "--i": "5" }}>
                Dashboard
              </Link>
            ) : (
              <Link to="/login" style={{ "--i": "5" }}>
                Login
              </Link>
            )}
          </nav>
          <div className="social-media">
            <a href="#" style={{ "--i": "1" }}>
              <i className="bx bxl-twitter" />
            </a>
            <a href="#" style={{ "--i": "2" }}>
              <i className="bx bxl-facebook" />
            </a>
            <a href="#" style={{ "--i": "3" }}>
              <i className="bx bxl-instagram" />
            </a>
          </div>
        </header>
        <section className="home">
          <div className="home-content">
            <h1>Dealing with Depression?</h1>
            <h3>Lets Find Out</h3>
            <p>
              Hello, our model primarily forecasts whether you or your close
              ones may be experiencing depression. Please keep in mind that the
              results may not be entirely accurate, but we will endeavor to
              offer the most valuable guidance on seeking assistance through our
              platform.This website is designed to offer you a tailored solution
              that aligns with the level of depression you are currently
              experiencing. Our dedicated team strives to present you with the
              finest solution that is currently available in the market.
            </p>
          </div>
          <div className="home-img">
            <div className="rhombus">
              <img src={pic1} alt="noimg" />
            </div>
          </div>
          <div className="rhombus2"></div>
        </section>
        <section className="testsec" id="testsec">
          <div className="sec">
            <div className="quiz">
              <h1 className="test">Depression Test!!</h1>
            </div>
            <div className="second">
              <img className="depression" alt="pic" src={pic2} />
              <div className="rules">
                <div className="inside">
                  <h2>What is the quiz about?</h2>
                  <img
                    width={50}
                    height={50}
                    src="https://img.icons8.com/ios-filled/50/depression.png"
                    alt="depression"
                  />
                </div>
                <div className="inrules">
                  <section>
                    <h1>01</h1>
                    <h3>Why should you take this test?</h3>
                    <ul>
                      <li>
                        <p>
                          This is advisable for someone who may be experiencing
                          depression.
                        </p>
                      </li>
                      <li>
                        <p>
                          Feel free to take these tests if you have <br />
                          doubts about your mental behavior.
                        </p>
                      </li>
                      <li>
                        <p>
                          These tests are designed to enhance
                          <br /> your self awareness.
                        </p>
                      </li>
                    </ul>
                  </section>
                  <section>
                    <h2>02</h2>
                    <h3>How to take a Test ?</h3>
                    <ul>
                      <p></p>
                      <li>
                        Please make sure your Internet connection is strong to
                        ensure a smooth experience.
                      </li>
                      <p />
                      <p></p>
                      <li>
                        Carefully read all the questions, and <br />
                        select whatever comes to your mind first.
                      </li>
                      <p />
                      <p></p>
                      <li>Make sure your video and mic are turned ON.</li>
                      <p />
                    </ul>
                  </section>
                </div>
                <div>
                  <h1 className="notes">Note:</h1>
                  <p className="warning">
                    This quiz is <span>NOT</span> intended for diagnostic
                    purposes. The diagnosis of mental health disorders must be
                    conducted by a licensed mental health provider or a medical
                    doctor. We highly value your privacy, and all results remain
                    entirely anonymous..
                  </p>
                </div>
                <div className="button">
                  <Link to="/test" className="butt">
                    Take Test
                  </Link>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
        <div id="foot">
          <div className="row">
            <div className="col">
              <p>
                <b>About Us:</b>
                <br /> We are team Artistic Algos, our model basically focuses
                on predicting the level of depression based on your response
                through audio and video. Take our test and be open to us so that
                required help could be provided.
                <br />
                <b>Note:</b> <br />
                Depression is not something that is easily taken, it's a serious
                problem. Do reach out to us.
              </p>
            </div>
            <div className="col">
              <h3>
                Office{" "}
                <div className="underline">
                  <span />
                </div>
              </h3>
              <p>ADGITM</p>
              <p>Shastri Park,New Delhi</p>
              <p className="email-id">artist@gmail.com</p>
              <h4>+91-001123456</h4>
            </div>
            <div className="col">
              <h3>
                Links
                <div className="underline">
                  <span />
                </div>
              </h3>
              <ul>
                <li>
                  <a href>Home</a>
                </li>
                <li>
                  <a href="#testsec" className="setblack">
                    Take Test
                  </a>
                </li>
                <li>
                  <a href="#foot" className="setblack">
                    About Us
                  </a>
                </li>
                <li>
                  <Link to="/login" className="setblack">
                    Account
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h3>
                Newsletter
                <div className="underline">
                  <span />
                </div>
              </h3>
              <form>
                <i className="far fa-envelope" />
                <input
                  type="email"
                  placeholder="Enter your email id"
                  required
                />
                <button type="submit">
                  <i className="fas fa-arrow-right" />
                </button>
              </form>
              <div className="social-icons">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i className="fab fa-instagram" />
                <i className="fab fa-whatsapp" />
              </div>
            </div>
          </div>
          <hr />
          <p className="copyright">© 2023 All Rights Reserved </p>
        </div>
      </div>
    </>
  );
}
