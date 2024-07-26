import { Link, useNavigate } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  }
  return (
    <header>
      <nav className="flex gap-6">
        {token ? (
          <>
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
