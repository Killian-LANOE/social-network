import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const emailRegex = `(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))`;

  const [usernameFilled, setUsernameFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);

  const serverURL = import.meta.env.VITE_SERVER_ADDRESS;

  function handleSignup(e: FormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    fetch(`${serverURL}/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: target["username"].value,
        email: target["email"].value,
        password: target["password"].value,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : console.log("Email or Password Error !")
      )
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    const usernameInput = document.querySelector(
      'input[name="username"]'
    ) as HTMLInputElement;

    const handleUsernameInput = () =>
      setUsernameFilled(usernameInput.value !== "");
    const handleEmailInput = () => setEmailFilled(emailInput.value !== "");
    const handlePasswordInput = () =>
      setPasswordFilled(passwordInput.value !== "");

    usernameInput.addEventListener("input", handleUsernameInput);
    emailInput.addEventListener("input", handleEmailInput);
    passwordInput.addEventListener("input", handlePasswordInput);

    return () => {
      usernameInput.removeEventListener("input", handleUsernameInput);
      emailInput.removeEventListener("input", handleEmailInput);
      passwordInput.removeEventListener("input", handlePasswordInput);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen flex justify-center items-center">
      <div className="absolute -z-10 bg-connect bg-cover h-screen w-screen blur-[0px]"></div>

      <main className="relative h-[27rem] w-3/4  min-w-72 flex flex-col items-center border-2 rounded-2xl md:w-72">
        <div className="bg-black/50 absolute h-full w-full rounded-2xl"></div>
        <h1 className="z-10 mt-4 font-bold text-2xl">Register</h1>
        <form
          className="my-auto z-10 flex flex-col gap-8 text-black"
          onSubmit={(e) => handleSignup(e)}
        >
          <div className="h-10 relative border-b-2">
            <input
              className="peer h-full w-full bg-transparent outline-none text-white"
              pattern={emailRegex}
              type="text"
              name="username"
            ></input>
            <h2
              className={`top-1 peer-focus:-top-5 font-bold tracking-wide  ${
                usernameFilled ? "-top-[1.25rem]" : ""
              } transition-all ease-in-out absolute pointer-events-none text-white`}
            >
              Username
            </h2>
          </div>

          <div className="h-10 relative border-b-2">
            <input
              className="peer h-full w-full bg-transparent outline-none text-white"
              pattern={emailRegex}
              type="email"
              name="email"
            ></input>
            <h2
              className={`top-1 peer-focus:-top-5 font-bold tracking-wide  ${
                emailFilled ? "-top-[1.25rem]" : ""
              } transition-all ease-in-out absolute pointer-events-none text-white`}
            >
              Email
            </h2>
          </div>

          <div className="h-10 relative border-b-2">
            <input
              className="peer h-full w-full bg-transparent outline-none text-white"
              type="password"
              name="password"
            ></input>
            <h2
              className={`top-1 peer-focus:-top-5 font-bold tracking-wide ${
                passwordFilled ? "-top-[1.25rem]" : ""
              } transition-all ease-in-out absolute pointer-events-none text-white`}
            >
              Password
            </h2>
          </div>

          <button className="hover:bg-blue-200 border-2 rounded-2xl h-10 bg-white text-black">
            Sign up
          </button>
        </form>
        <p className="z-10 mb-6 ">
          Already have an account ?{" "}
          <Link to={"/Login"} className="hover:font-bold hover:cursor-pointer">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}

export default Signup;
