import { useContext } from "react";
import Navbar from "../components/common/navbar/Navbar";
import Sidebar from "../components/common/sidebar/Sidebar";
import { AuthContext } from "../context/AuthContext";
import "./Layout.css";

const ManagerLayout = ({ children }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="layout-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar role={user.role} />
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;