import { Link } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");
  return (
    <header>
      <nav>
        {token ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/Login">Logout</Link>
          </>
        ) : (
          <Link to="/Login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
