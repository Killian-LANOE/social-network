import { useParams } from "react-router";

function User() {
  const { name } = useParams();
  return <main>User : {name}</main>;
}

export default User;
