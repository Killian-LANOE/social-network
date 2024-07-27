import { FormEvent } from "react";

function CreatePost() {
  const token = localStorage.getItem("token");

  function handleCreation(e: FormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const data = new FormData();
    data.append("description", target["description"].value);
    data.append("image", target["image"].files[0]);

    fetch(`http://127.0.0.1:3000/api/posts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <form
        onSubmit={(e) => handleCreation(e)}
        className="flex flex-col my-2 gap-4 text-black"
        encType="multipart/form-data"
      >
        <input name="description" type="text" placeholder="Description"></input>
        <input name="image" type="file"></input>
        <button className="text-white">Create Post</button>
      </form>
    </>
  );
}

export default CreatePost;
