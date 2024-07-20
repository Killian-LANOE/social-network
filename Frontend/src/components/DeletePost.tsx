type DeletePostType = {
  id: string;
};

function DeletePost({ id }: DeletePostType) {
  const token = localStorage.getItem("token");

  function handleDelete() {
    fetch(`http://127.0.0.1:3000/api/posts/${id}`, {
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
