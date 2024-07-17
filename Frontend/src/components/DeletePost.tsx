type DeletePostTypes = {
  id: string;
};

function DeletePost(id: DeletePostTypes) {
  const token = localStorage.getItem("token");

  function handleDelete() {
    fetch(`http://127.0.0.1:3000/api/posts?${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) return alert("Posts successfuly deleted");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeletePost;
