import React, { useState } from "react";
import axios from "axios";
import { storage } from "./firebase/firebase.js";

export default function Testing() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [projectName, setProjectName]=useState("");
  const [button, setButton]=useState(false);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleName(e) {
    setProjectName(e.target.value);
  }

  function handleUpload() {    
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          console.log("url: ", url);
          setFile(null);
          setURL(url);
          setButton(true);
        });
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    const newProject = {
      name: 'projectName',
      desc: 'hiiiiiiii',
      field: 'Analog',
      tags: ['ab', 'cd'],
      url: url,
    }
    axios.post('http://localhost:4000/addNewProject', newProject)
    .then((response) => {
      console.log("response: ", response);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleName} value={projectName}/>
        <input type="file" onChange={handleChange} />
        <button type="button" disabled={!file} onClick={handleUpload}>upload to firebase</button>
        <input type="submit" name="submit" disabled={!button} value="Submit"/>
      </form>
      <img src={url} alt="" />
    </div>
  );
}