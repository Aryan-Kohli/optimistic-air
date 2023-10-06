import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/registerpage.css";
export default function registerpage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        firstname,
        lastname,
        email,
        location,
        phoneno,
        password,
        age,
      });
      alert("registered Successfully");
    } catch (e) {
      alert("not regsitered");
    }
  }
  return (
    <div className="registerpage">
      <section className="main">
        <div className="login-box">
          <form id="loginform" onSubmit={registerUser}>
            <h2>Register</h2>
            <span className="new">
              <div className="input-box">
                <input
                  type="text"
                  onChange={(ev) => setFirstname(ev.target.value)}
                  required=""
                />
                <label>First Name</label>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  onChange={(ev) => setLastname(ev.target.value)}
                  required=""
                />
                <label>Last Name</label>
              </div>
            </span>
            <div className="input1-box">
              <input
                type="text"
                onChange={(ev) => setEmail(ev.target.value)}
                required=""
              />
              <label>Email Address</label>
            </div>
            <div className="input1-box">
              <input
                type="text"
                onChange={(ev) => setLocation(ev.target.value)}
                required=""
              />
              <label>Location</label>
            </div>
            <div className="input1-box">
              <input
                type="text"
                onChange={(ev) => setPhoneno(ev.target.value)}
                required=""
              />
              <label>Phone Number</label>
            </div>
            <div className="input1-box">
              <input
                type="password"
                onChange={(ev) => setPassword(ev.target.value)}
                required=""
              />
              <label>Password</label>
            </div>
            <div className="input1-box">
              <input
                type="number"
                onChange={(ev) => setAge(ev.target.value)}
                id="pass"
                required=""
              />
              <label>Age</label>
            </div>
            <button type="submit" className="submit" id="but">
              Register
            </button>
            <Link to="/login" className="register-link">
              <p>
                Already have an account ? <a href="#">Login Now</a>
                <br />
              </p>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}
