import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const emailRegex = `(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))`;

  function handleSignup(e: FormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    fetch("http://127.0.0.1:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: target["email"].value,
        password: target["password"].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <main>
      <form
        className="flex flex-col gap-3 text-black"
        onSubmit={(e) => handleSignup(e)}
      >
        <input
          pattern={emailRegex}
          type="email"
          name="email"
          placeholder="email"
        ></input>
        <input type="password" name="password" placeholder="password"></input>
        <button className="border-2 text-white">Login</button>
      </form>
    </main>
  );
}

export default Login;
