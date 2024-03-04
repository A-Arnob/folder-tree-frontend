// import FolderList from "./components/FolderList";
import { Route, Routes } from "react-router-dom";
import FolderListNew3 from "./components/FolderListNew3";
import HeaderContent from "./components/HeaderContent";
import SignUpHeader from "./components/SignUpHeader";
// import { useAuth } from "./hooks/useAuth";
import { AuthContextProvider } from "./context/AuthContext";
import SignIn from "./components/SignIn";

function App() {
  // const { user, setUser } = useAuth();
  // console.log("USER VALUE: .....  " + user)

  return (
    <>

      <AuthContextProvider>

        <Routes>
          <Route path="/" element={<SignUpHeader />} ></Route>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>

        <Routes>
          <Route path="/mainroot" element={<HeaderContent />}></Route>
          <Route path="/:parent" element={<HeaderContent />}></Route>
        </Routes>


        <Routes>
          <Route path="/mainroot" element={<FolderListNew3 />}></Route>
          <Route path="/:parent" element={<FolderListNew3 />}></Route>
        </Routes>



      </AuthContextProvider>
    </>
  );
}

export default App;
