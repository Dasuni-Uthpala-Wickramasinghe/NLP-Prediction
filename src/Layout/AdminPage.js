import React, { useState } from "react";
import "./admin.css";
import { child, push, ref, set } from "firebase/database";
import { database } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

const AdminPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleUserAdd = (e) => {
    setLoading(true)
    e.preventDefault();
    const userId = push(child(ref(database), "users")).key;
    set(ref(database, "users/" + userId), {
      uuid: userId,
      Email: username,
      Password: password,
    })
      .then(() => {
        alert("User added successfully");
        setVisible(false);
        setLoading(false);
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        alert(error);
        setLoading(false)

      });
  };

  return (
    <div>
        {loading && (
  <div style={{ textAlign: 'center', padding: '20px',display: "flex",position:'fixed',zIndex:99999 ,top:200,left:600, width:'100px'}}>
    <CircularProgress style={{width: '100px',height: '100px', color:'#071352'}} color="primary" />
  </div>
)}
      <div
        style={{
          backgroundColor: "#34495E",
          width: "100%",
          height: "650px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "300px",
            backgroundColor: "#CCCCFF",
            borderRadius: "10px",
            marginLeft: "100px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/show_data")}
        >
          <h3>See Staff Complaints</h3>
        </div>
        <div
          style={{
            width: "400px",
            height: "300px",
            backgroundColor: "#A2D9CE",
            borderRadius: "10px",
            marginRight: "100px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => handleOpen()}
        >
          <h3>Add New Staff</h3>
        </div>
      </div>
      <Modal
        open={isVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-container">
          <h1>Add User</h1>
          <form style={{ zIndex: 5 }} onSubmit={handleUserAdd}>
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
              placeholder="User Email"
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
              placeholder="Set Password for User"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading}
              type="submit"
              style={{ cursor: "pointer", marginTop: "50px" }}
            >
              <b>Add User</b>
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminPage;
