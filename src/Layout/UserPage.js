import React, { useState } from "react";
import wall9 from "../Assets/img/wall9.png";
import Form from "../Components/Form";
import { child, push, ref, set } from "firebase/database";
import { database } from "../Firebase/Firebase";
import { CircularProgress } from "@material-ui/core";

export default function UserPage({username}) {
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState("");

  const handleFormChange = (inputValue) => {
    setAddData(inputValue);
  };

  const handleFormSubmit = () => {
    setLoading(true);
    const complaintId = push(child(ref(database), "complaints")).key;
    fetch("https://nlp-flask-app-2738e5455766.herokuapp.com/api/predict", {
      method: "POST",
      body: JSON.stringify({
        Message: addData,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        if (message !== null && message.length !== 0) {
          set(ref(database, "complaints/" + complaintId), {
            complaintId: complaintId,
            complaint: addData,
            user: username,
            category: message.message,
          })
            .then(() => {
              alert("Data added successfully");
              setLoading(false)
             setAddData('')
            })
            .catch((error) => {
              alert(error);
              
            });
        } else {
          console.log(
            "Prediction category is missing. Data not sent to the database."
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error during prediction:", error);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {loading && (
  <div style={{ textAlign: 'center', padding: '20px',display: "flex",position:'fixed',zIndex:99999 ,top:200,left:600, width:'100px'}}>
    <CircularProgress style={{width: '100px',height: '100px'}} color="primary" />
  </div>
)}
      <div
        style={{
          backgroundImage: `url(${wall9})`,
          width: "100%",
          height: "650px",
          backgroundSize: "700px 650px",
          backgroundRepeat: "no-repeat",
          zIndex: 1000,
        }}
      ></div>
      <div style={{ width: "100%", height: "650px" }}>
        <Form
        isDisabled={loading}
          userInput={addData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
