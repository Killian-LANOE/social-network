import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DeletePost from "../components/DeletePost";
import ModifyPost from "../components/ModifyPost";

function Post() {
  const params = useParams();
  const userId = localStorage.getItem("userId");
  const serverURL = import.meta.env.VITE_SERVER_ADDRESS;

  type postType = {
    id: string;
    description: string;
    user_id: string;
    images_path: string;
  };

  type userType = {
    userId: string;
    isAdmin: string;
  };

  const [postData, setPostData] = useState<postType>();
  const [userData, setUserData] = useState<userType>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const postId = params.id;
    if (!token) {
      navigate("/Login");
      return;
    }

    async function fetchData() {
      await fetch(`${serverURL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPostData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function fetchUserData() {
      await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchUserData();
    fetchData();
  }, [navigate, params.id, userId]);

  return (
    <>
      {postData ? (
        <main>
          <figure className="flex flex-col text-center">
            <img
              className="h-96"
              src={postData.images_path}
              alt={`Picture of ${postData.description}`}
            ></img>
            <figcaption>{postData.description.split('"')}</figcaption>
          </figure>

          {postData.user_id === userId || userData?.isAdmin ? (
            <div className="flex flex-col text-center mt-6">
              <DeletePost id={postData.id} />
              <ModifyPost id={postData.id} />
            </div>
          ) : (
            <></>
          )}
        </main>
      ) : (
        <main>No Post Found</main>
      )}
    </>
  );
}

export default Post;
