import React, { useEffect, useState } from "react";
import "./Home.css";
import { Image } from "cloudinary-react";
import Axios from "axios";
import FavoriteIcon from '@material-ui/icons/Favorite';

function Home() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/upload").then((response) => {
      setUploads(response.data);
    });
  }, []);

  const likePost = (id, key) => {
    var tempLikes = uploads;
    tempLikes[key].likes = tempLikes[key].likes + 1;

    Axios.post("http://localhost:3001/upload/like", {
      userLiking: localStorage.getItem("username"),
      Id: id,
    }).then((response) => {
      setUploads(tempLikes);
      window.location.reload();
    });
  };

  return (
    <div className="Home">
      {uploads.map((val, key) => {
        return (
          <div className="Post">
            <div className="Image">
              <Image cloudName="ferdos" publicId={val.image} />
            </div>
            <div className="Content">
              <div className="title">
                {" "}
                {val.title} / by @{val.author}
              </div>
              <div className="description">{val.description}</div>
            </div>
            <div className="Engagement">
              <FavoriteIcon
                id="likeButton"
                onClick={() => {
                  likePost(val.Id, key);
                  console.log(key);
                  console.log(val.Id);
                  console.log(val.author);
                }}
              />
              {val.likes}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
