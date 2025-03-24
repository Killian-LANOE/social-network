import { useParams } from "react-router";

function Post() {
  const { id } = useParams();
  return <main>Post id = {id}</main>;
}

export default Post;
