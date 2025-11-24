import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowDropdown(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <Button
        variant="outline-light"
        onClick={() => navigate("/login")}
        className="login-btn"
      >
        Login
      </Button>
    );
  }

  // Get first letter only (Gmail style) - only first letter of email
  const getInitial = () => {
    // Always return just the first letter of the email (Gmail style)
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    // Fallback if email not available
    return "U";
  };

  return (
    <div className="user-profile-container" ref={dropdownRef}>
      <div
        className="user-profile-trigger"
        onClick={() => setShowDropdown(!showDropdown)}
        title={user.email}
      >
        {/* Only show avatar with first letter - no email/name visible */}
        <div className="user-avatar">{getInitial()}</div>
      </div>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="dropdown-header">
            <div className="user-avatar-large">{getInitial()}</div>
            <div className="dropdown-user-info">
              <div className="dropdown-name">{user.name || user.email.split("@")[0]}</div>
              <div className="dropdown-email">{user.email}</div>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <div className="dropdown-menu-section">
            <button className="dropdown-item" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

