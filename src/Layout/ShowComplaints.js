import React, { useEffect, useState } from "react";
import GridContainer from "../Components/Grid/GridContainer";
import GridItem from "../Components/Grid/GridItem";
import Card from "../Components/Card/Card";
import CardBody from "../Components/Card/CardBody";
import CardHeader from "../Components/Card/CardHeader";
import Table from "../Components/TabelData/Tabel.js";
import { ref, onValue } from "firebase/database";
import { database } from "../Firebase/Firebase";

export default function ShowComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const complaintsRef = ref(database, "complaints");
    onValue(complaintsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const transformedData = Object.entries(data).map(
          ([complaintId, complaintData]) => ({
            id: complaintId,
            user: complaintData.user,
            complaint_category: complaintData.category,
            complain_descriptions: complaintData.complaint,
          })
        );
        setComplaints(transformedData);
      }
    });
  }, []);

  useEffect(() => {
    if(category==="all"){
      setFilteredData(complaints);
    }else{
      const filteredData = complaints.filter(
        (item) => item.complaint_category === category
      );
      setFilteredData(filteredData);
      
    }
    
  }, [category, complaints]);

  return (
    <div style={{ backgroundColor: "#212F3D", width: "100%", height: "650px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("all")}
        >
          Show All{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Bank account or service")}
        >
          Bank account or service{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Inspection Services")}
        >
          Inspection Services{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Housing Inspection Services")}
        >
          Housing Inspection Services{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Student loan")}
        >
          Student loan
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Consumer Loan")}
        >
          Consumer Loan{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Payday loan")}
        >
          Payday loan{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Department of Bldg Inspection")}
        >
          Department of Bldg Inspection
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Plumbing Inspection Division")}
        >
          Plumbing Inspection Division{" "}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Mortgage")}
        >
          Mortgage{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Disabled Access Division")}
        >
          Disabled Access Division{" "}
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Code Enforcement Section")}
        >
          Code Enforcement Section
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Credit reporting")}
        >
          Credit reporting
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Debt collection")}
        >
          Debt collection
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Prepaid card")}
        >
          Prepaid card
        </button>
        <button
          style={{ margin: 10, backgroundColor: "#D7DBDD", color: "#000" }}
          onClick={() => setCategory("Electrical Inspection Division")}
        >
          Electrical Inspection Division
        </button>
      </div>
      {filteredData.length !== 0 ? (
        <GridContainer
          style={{
            paddingTop: "100px",
            display: "flex",
            justifyContent: "center",
            margin: 0,
          }}
        >
          <GridItem>
            <Card>
              <CardHeader color="primary">
                <h4>Sample Complains</h4>
              </CardHeader>
              <CardBody>
                <Table tableData={filteredData} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: 100,
            padding: "50px",
            color: "#fff",
            fontSize: "28px",
          }}
        >
          No Data Found
        </div>
      )}
    </div>
  );
}
