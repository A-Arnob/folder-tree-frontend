import axios from "axios";
import authHeader from "../services/authHeader";


type Post = {
  name: string;
  parent: string;
};

const headers = {
  authHeader(),
  "Content-Type": "application/json",

}

async function SendFolder(post: Post) {


  if (authHeader()) {

    try {
      // \uD83D\uDC47️ post the object to the server
      const response = await axios.post<Post>(
        `http://localhost:8080/folders/addfolder`,
        post,
        {
          headers: {
            authHeader(),
            "Content-Type": "application/json",
          }
        }
      );

      // \uD83D\uDC47️ handle the response
      console.log(response.data);
    } catch (error) {
      // \uD83D\uDC47️ handle the error
      console.error(error);
    }
  } else {
    console.log("Can't find user");
  }
}

export default SendFolder;

// \uD83D\uDC47️ call the function with an object
