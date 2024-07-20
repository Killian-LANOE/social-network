type ModifyPostType = {
  id: string;
};

function ModifyPost({ id }: ModifyPostType) {
  const token = localStorage.getItem("token");
  console.log(id);

  function handleModification() {
    fetch(`http://127.0.0.1:3000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Posts successfuly Modified");
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <form></form>
      <button onClick={handleModification}>Modify</button>
    </>
  );
}

export default ModifyPost;
