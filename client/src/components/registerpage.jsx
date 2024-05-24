import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../css/registerpage.css";
export default function registerpage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [age, setAge] = useState("");
  const [gotologin, setgotologin] = useState(false);
  const [passtype, setpasstype] = React.useState("password");
  function change() {
    if (passtype == "password") setpasstype("text");
    else setpasstype("password");
  }
  async function registerUser(ev) {
    ev.preventDefault();
    if (password !== confirmpassword) {
      alert("password and confirm password does not match");
      return;
    }
    if (!firstname) {
      alert("Enter First Name");
      return;
    }
    if (!lastname) {
      alert("Enter Last Name");
      return;
    }
    if (!email) {
      alert("Enter Email");
      return;
    }
    if (!location) {
      alert("Enter Location");
      return;
    }
    if (!phoneno) {
      alert("Enter Phone Number");
      return;
    }
    if (!password) {
      alert("Enter Password");
      return;
    }
    if (!age) {
      alert("Enter Age");
      return;
    }
    const namePattern = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    if (!namePattern.test(firstname)) {
      alert("Enter valid First Name");
      return;
    }
    if (!namePattern.test(lastname)) {
      alert("Enter valid Last Name");
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert("Enter valid Email");
      return;
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneno)) {
      alert("Enter valid Phone Number");
      return;
    }
    const agePattern = /^[0-9]{2}$/;
    if (!agePattern.test(age)) {
      alert("Enter valid Age");
      return;
    }

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
      setgotologin(true);
    } catch (e) {
      alert("not registered");
    }
  }
  if (gotologin) {
    return <Navigate to="/login" replace={true} />;
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
              <span className="icon" onClick={change}>
                {passtype == "password" ? (
                  <ion-icon name="eye-off" />
                ) : (
                  <ion-icon name="eye" />
                )}
              </span>
              <input
                type={passtype}
                id="pass"
                onChange={(event) => setPassword(event.target.value)}
                required=""
              />
              <label>Password</label>
            </div>
            <div className="input1-box">
              <input
                type="password"
                onChange={(ev) => setconfirmpassword(ev.target.value)}
                required=""
              />
              <label>Confirm Password</label>
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
