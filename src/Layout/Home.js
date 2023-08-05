import React from "react";
import { useLocation } from "react-router-dom";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

export default function Home() {
  const location = useLocation();
  const { username, isAdmin } = location.state;
  return <div>{isAdmin ? <AdminPage /> : <UserPage username={username} />}</div>;
}
