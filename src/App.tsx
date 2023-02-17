import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const { VITE_API_BASE_PATH } = import.meta.env;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoginInProgress(true);
      setLoginError(null);
      const response = await fetch(VITE_API_BASE_PATH + "/api/saml/login", {
        method: "POST",
      });
      const data = await response.json();
      if (data) {
        setIsLoggedIn(true);
        window.location.href = data.redirectUrl;
      } else {
        setLoginError("Login Error occurred");
      }
      setLoginInProgress(false);
    } catch (error) {
      setLoginInProgress(false);
      setLoginError("Login Error occurred - " + error);
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(VITE_API_BASE_PATH + "/api/saml/logout", { method: "POST" });
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {/* <div>
        <img src="/vite.svg" className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div> */}
      <h1>SAML + React</h1>
      <div className="card">
        {isLoggedIn === false ? (
          <button onClick={handleLogin}>SAML Login</button>
        ) : (
          <button onClick={handleLogout}>SAML Logout</button>
        )}
      </div>
      <p className="read-the-docs">
        {loginInProgress ? "Login..." : loginError ? loginError : ""}
      </p>
    </div>
  );
}

export default App;
