import { useParams } from "react-router-dom";

function Post() {
  const params = useParams();
  const id = params.id;
  console.log(id);
  return <div>Post {id}</div>;
}

export default Post;
