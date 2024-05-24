import React from "react";
import Testpage from "./components/Testpage";
import { Routes, Route } from "react-router-dom";
import Indexpage from "./components/indexpage";
import Resultpage from "./components/resultpage";
import Loginpage from "./components/loginpage";
import Dashboard from "./components/dashboard";
import Registerpage from "./components/registerpage";
import { UserContextProvider } from "./UserContext";
// import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
axios.defaults.baseURL = "https://optimistic-air-backend.onrender.com";
// axios.defaults.baseURL = "https://optimistic-air.vercel.app";
// axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.withCredentials = true;
export default function App() {
  const [emotions, setemotions] = React.useState("");
  function func(abc) {
    setemotions(abc);
    // setemotions((emotions) => [...emotions, abc]);
  }
  const [data, setData] = React.useState();
  function setwords(abv) {
    setData(abv);
  }
  const [maindata, setmaindata] = React.useState();
  function chartdata(abc) {
    setmaindata(abc);
  }

  const [login, setlog] = React.useState(false);
  function setlogin(abc) {
    setlog(abc);
  }
  return (
    <div>
      <UserContextProvider>
        {/* <NavigationContainer> */}
        <Routes>
          <Route path={"/"} element={<Indexpage login={login} />} />
          {/* <Route path={"/abc"} login={login}element={<Abc />} /> */}
          <Route
            path={"/test"}
            element={
              <Testpage setemotion={func} login={login} setwords={setwords} />
            }
          />
          <Route
            path="/result"
            element={
              <Resultpage
                emotions={emotions}
                login={login}
                data={data}
                chartdata={chartdata}
              />
            }
          />
          <Route
            path="/login"
            element={<Loginpage login={login} setlogin={setlogin} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                maindata={maindata}
                setlogin={setlogin}
                login={login}
              />
            }
          />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
        {/* </NavigationContainer> */}
      </UserContextProvider>
    </div>
  );
}
