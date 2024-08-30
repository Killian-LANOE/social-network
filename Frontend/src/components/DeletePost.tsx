type DeletePostType = {
  id: string;
};

function DeletePost({ id }: DeletePostType) {
  const token = localStorage.getItem("token");
  const serverURL = import.meta.env.VITE_SERVER_ADDRESS;

  function handleDelete() {
    fetch(`${serverURL}/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Posts successfuly deleted");
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeletePost;
