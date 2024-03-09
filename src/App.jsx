import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import FormTestPage from "./components/FormTestPage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="form" element={<FormTestPage />} />
          <Route element={<ProtectedRoute role="user" />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/admin">
          <Route path="login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="dashboard" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
