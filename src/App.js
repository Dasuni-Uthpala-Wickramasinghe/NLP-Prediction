import Home from './Layout/Home';
import LoginPage from './Layout/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './Layout/AdminPage';
import ShowComplaints from './Layout/ShowComplaints';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/show_data" element={<ShowComplaints />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
