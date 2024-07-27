import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";

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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
      return;
    }

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
          setPostsData(dataJson);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, [navigate]);

  return (
    <>
      <div>
        <CreatePost />
      </div>
      {postsData && postsData.length > 0 ? (
        <section className="flex m-auto flex-col-reverse">
          {postsData.map((post, index) => {
            const description = post.description.split('"');
            return (
              <div
                className="flex flex-col items-center text-center"
                key={index}
              >
                <Link to={`/posts/${post.id}`}>
                  <figure>
                    <img
                      className="h-96"
                      src={`${post.images_path}`}
                      alt={`image number ${index}`}
                    />
                    <figcaption>{description}</figcaption>
                  </figure>
                </Link>
              </div>
            );
          })}
        </section>
      ) : (
        <div>No Post Found</div>
      )}
    </>
  );
}

export default Home;
