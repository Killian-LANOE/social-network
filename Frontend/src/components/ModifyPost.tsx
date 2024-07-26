type ModifyPostType = {
  id: string;
};

function ModifyPost({ id }: ModifyPostType) {
  const token = localStorage.getItem("token");

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
      <form encType="multipart/form-data">
        <input name="description" type="text" placeholder="Description"></input>
        <input name="image" type="file"></input>
      </form>
      <button onClick={handleModification}>Modify</button>
    </>
  );
}

export default ModifyPost;
