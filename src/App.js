import React, { useState } from "react";
import "./App.css";
import logo from "./nisource-logo.png"; // place logo file inside src folder
import bgImage from "./powerlines.jpg"; // place your uploaded background image inside src folder

// Import Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [username, setUsername] = useState("");
  const [response, setResponse] = useState("");

  // Function to call backend API
  const verifyUser = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/verifyUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });

      // Handle backend status codes with toast notifications
      if (res.status === 404) {
        toast.error("User not found");
      } else if (res.status === 200) {
        toast.success("MFA triggered for user");
      } else {
        toast.warning("Error sending MFA");
      }

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      toast.error("Error: " + error.message);
      setResponse("Error: " + error.message);
    }
  };

  return (
    <div className="app-container">
      {/* Top blue bar */}
      <header className="top-bar">
        <img src={logo} alt="NiSource Logo" className="logo" />
      </header>

      {/* Main content area with background image */}
      <main
        className="content-area"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="portal-box">
          <h1>User Verification Portal</h1>
          <div className="verify-box">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={verifyUser}>Verify</button>
          </div>
          <p>{response}</p>
        </div>
      </main>

      {/* Toast container for notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
