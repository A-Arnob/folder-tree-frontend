// import FolderList from "./components/FolderList";
import { Route, Routes } from "react-router-dom";
import AddFolder from "./components/AddFolder";
import FolderListNew from "./components/FolderListNew";
import FolderListNew2 from "./components/FolderListNew2";
import FolderListNew3 from "./components/FolderListNew3";
import FileUpload from "./components/FileUpload";
import HeaderContent from "./components/HeaderContent";
import SignUpHeader from "./components/SignUpHeader";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUpHeader />} ></Route>
      </Routes>

      <Routes>
        <Route path=":parent" element={<HeaderContent />}>

        </Route>
        {/* <Route path="/:parent/fileupload" element={<FileUpload />}></Route> */}
        {/* <Route path="/:parent/addfolder" element={<AddFolder />}></Route> */}

      </Routes>


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
