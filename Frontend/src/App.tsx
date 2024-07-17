import "./App.css";
import DeletePost from "./components/DeletePost";

import { useState } from "react";

type postsType = [
  {
    id: string;
    description: string;
    user_id: string;
    images_path: string;
  }
];

function App() {
  const [postsData, setPostsData] = useState<postsType>();

  const token = localStorage.getItem("token");

  async function fetchData() {
    await fetch("http://127.0.0.1:3000/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((dataJson) => {
        console.log(dataJson);
        setPostsData(dataJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>
        {postsData?.map((post, index) => {
          return (
            <div key={index}>
              <figure>
                <img
                  src={`${post.images_path}`}
                  alt={`image number ${index}`}
                  height={480}
                />
                <figcaption>{post.description.split('"')}</figcaption>
              </figure>

              <DeletePost id={post.id} />
            </div>
          );
        })}
      </div>
      <button onClick={fetchData}>Get Post</button>
    </>
  );
}

export default App;
