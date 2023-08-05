import React, { useState } from "react";
import "./login.css";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { database } from "../Firebase/Firebase";
import wall2 from "../Assets//img/homescreen.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const usersRef = ref(database, "users");
  //   const adminRef = ref(database, "admin");

  //   onValue(adminRef, (snapshot) => {
      
  //     const adminsData = snapshot.val();
  //     if (
  //       adminsData &&
  //       adminsData.email === username &&
  //       adminsData.password === password
  //     ) {
  //       setIsAdmin(true);
  //       navigate("/admin");
  //     } else {
  //       onValue(usersRef, (snapshot) => {
  //         const usersData = snapshot.val();
  //         console.log("🚀 ~ file: LoginPage.js:31 ~ onValue ~ usersData:", usersData)
  //         Object.values(usersData).find((user) => {
  //           console.log("🚀 ~ file: LoginPage.js:33 ~ Object.values ~ user.Email === username:", user.Email === username)
  //           console.log("🚀 ~ file: LoginPage.js:33 ~ Object.values ~ user.Email:", user.Email)
  //           console.log("🚀 ~ file: LoginPage.js:33 ~ Object.values ~ username:", username)
  //           if (user.Email === username && user.Password === password) {
  //             setIsAdmin(false);
  //             navigate("/home", { state: { username, isAdmin } });
  //           } else {
  //             console.log("Invalid username or password.");
  //           }
  //           // return null;
  //         });
  //       });
  //     }
  //   });
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    const usersRef = ref(database, "users");
    const adminRef = ref(database, "admin");
  
    try {
      const adminSnapshot = await get(adminRef);
      const adminData = adminSnapshot.val();
      if (
        adminData &&
        adminData.email === username &&
        adminData.password === password
      ) {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        const usersSnapshot = await get(usersRef);
        const usersData = usersSnapshot.val();
        const user = Object.values(usersData).find(
          (user) => user.Email === username && user.Password === password
        );
        if (user) {
          setIsAdmin(false);
          navigate("/home", { state: { username, isAdmin } });
        } else {
          alert('Invalid username or password.')
          console.log("Invalid username or password.");
        }
      }
    } catch (error) {
      console.error("Error retrieving data from Firebase:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${wall2})`,
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        height: "650px",
      }}
    >
      <div className="login-container">
        <h2>Login Page</h2>
        <form style={{ zIndex: 5 }} onSubmit={handleLogin}>
          <input
            style={{
              backgroundColor: "transparent",
              borderWidth: "1px",
              color: "#fff",
              placeholder: "#fff",
              borderRadius: "5px",
              height: "30px",
            }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={{
              backgroundColor: "transparent",
              borderWidth: "1px",
              color: "#fff",
              placeholder: "#fff",
              borderRadius: "5px",
              height: "30px",
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            <b>Login</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
