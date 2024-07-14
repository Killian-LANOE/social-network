import "./App.css";

import { useState } from "react";

type imgType = {
  id: string;
  name: string;
  mimetype: string;
  path: string;
};

function App() {
  const [imgData, setImgData] = useState<imgType>();

  async function fetchData() {
    await fetch("http://127.0.0.1:3000/api/images")
      .then((data) => {
        return data.json();
      })
      .then((dataJson) => {
        setImgData(dataJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>
        {imgData?.map((img, index) => {
          return (
            <img
              key={index}
              src={`${img.path}`}
              alt={`image number ${index}`}
            />
          );
        })}
      </div>
      <button onClick={fetchData}>Get Post</button>
    </>
  );
}

export default App;
