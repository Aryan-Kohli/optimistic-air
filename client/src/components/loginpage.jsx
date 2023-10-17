import React from "react";
import "../css/loginpage.css";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
export default function loginpage(props) {
  const [email, setemail] = React.useState();
  const [password, setpassword] = React.useState();
  const { setuser } = useContext(UserContext);
  const [redirect, setRedirect] = React.useState(false);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      props.setlogin(true);
      console.log(data);
      setuser(data);
      setRedirect(true);
    } catch (e) {
      alert("there is some error in backend");
    }
  }
  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }
  // if (props.login === true) return <Navigate to="/dashboard" replace="true" />;
  // function checkdetails() {
  //   if (email === "user1" && password === "pass1") {
  //     props.setlogin(true);
  //     return <Navigate to="/dashboard" replace="true" />;
  //   } else {
  //     alert("Wrong email or password");
  //   }
  // }
  function gotohome() {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="loginpage">
      <section className="main">
        <div className="rhombus"></div>
        <div className="rhombus3" />
        <div className="box1">
          <button onClick={gotohome} className="homebtn">
            <i className="bx bx-home-alt-2" />
            Home
          </button>
          <h1 className="bold">Hi There👋🏻</h1>
          <h3>Welcome onboard !!</h3>
          <br />
          <h3>Get into your profile and see your dashboard</h3>
          <p className="sidep">
            ⚠️Dont worry everything in the end is going to be alright..⚠️
          </p>
        </div>
        <div className="login-box">
          <form onSubmit={loginUser} id="loginform">
            <h2 className="bold">Login</h2>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person" />
              </span>
              <input
                type="text"
                id="user"
                onChange={(event) => setemail(event.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed" />
              </span>
              <input
                type="password"
                id="pass"
                onChange={(event) => setpassword(event.target.value)}
                required
              />
              <label>Password</label>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="submit" id="but">
              Login
            </button>
            <Link to="/register" className="register-link">
              <p className="margin">
                Dont't have an account? <a href="#">Register</a>
                <br />
              </p>
            </Link>
            {/* <p className="goo">
                SignUp With <a href="#">Google</a>
              </p> */}
          </form>
        </div>
        <div className="rhombus2"></div>
        <div className="rhombus4" />
      </section>
    </div>
  );
}
