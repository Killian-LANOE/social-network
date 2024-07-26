import DeletePost from "../components/DeletePost";
import ModifyPost from "../components/ModifyPost";

import { useState, useEffect } from "react";

type postsType = [
  {
    id: string;
    description: string;
    user_id: string;
    images_path: string;
  }
];

function Home() {
  const [postsData, setPostsData] = useState<postsType>();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      await fetch("http://127.0.0.1:3000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => {
          return data.json();
        })
        .then((dataJson) => {
          setPostsData(dataJson);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      {postsData && postsData.length > 0 ? (
        <div>
          {postsData.map((post, index) => {
            const description = post.description.split('"');
            return (
              <div key={index}>
                <a href={post.images_path}>
                  <figure>
                    <img
                      src={`${post.images_path}`}
                      alt={`image number ${index}`}
                      height={480}
                    />
                    <figcaption>{description}</figcaption>
                  </figure>
                </a>

                <DeletePost id={post.id} />
                <ModifyPost id={post.id} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Post Found</div>
      )}
    </>
  );
}

export default Home;
