import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );

  const handleLogin = () => {
    navigate("/login"); // go to login page
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    setUsername(null);
    setIsAdmin(false);
  };

  return username ? (
    <span
      onClick={handleLogout}
      className="cursor-pointer text-foreground font-semibold px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      title="Click to logout"
    >
      Welcome, {username} {isAdmin && "(Admin)"}
    </span>
  ) : (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
    >
      Login
    </button>
  );
};

export default LoginButton;
