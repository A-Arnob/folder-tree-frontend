// import FolderList from "./components/FolderList";
import { Route, Routes } from "react-router-dom";
import AddFolder from "./components/AddFolder";
import FolderListNew from "./components/FolderListNew";
import FolderListNew2 from "./components/FolderListNew2";
import FolderListNew3 from "./components/FolderListNew3";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <>
      <FileUpload />
      <Routes>
        <Route path="/" element={<FolderListNew3 />}></Route>
        <Route
          path="/:parent"
          // element={<FolderListNew2 parent="root" />}
          element={<FolderListNew3 />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
