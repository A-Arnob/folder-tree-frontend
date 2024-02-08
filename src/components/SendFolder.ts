import axios from "axios";

type Post = {
  name: string;
  parent: string;
};

async function SendFolder(post: Post) {
  try {
    // \uD83D\uDC47️ post the object to the server
    const response = await axios.post<Post>(
      `http://localhost:8080/folders/addfolder`,
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // \uD83D\uDC47️ handle the response
    console.log(response.data);
  } catch (error) {
    // \uD83D\uDC47️ handle the error
    console.error(error);
  }
}

export default SendFolder;

// \uD83D\uDC47️ call the function with an object
