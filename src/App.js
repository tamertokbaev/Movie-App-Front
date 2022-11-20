import './styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import SignUp from "./pages/signUp/signUp";
import {createTheme, ThemeProvider} from "@mui/material";
import {ToastContainer} from "react-toastify";
import SignIn from "./pages/signIn/signIn";
import useFetchUserInfo from "./app/hooks/useFetchUserInfo";
import {UserContext} from "./app/context/userContext";

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#67B159"
    }
  },
  typography: {
    fontFamily: [
      'Montserrat',
      "sans-serif"
    ].join(",")
  }
})

function App() {
  const {userInfo, updateUserInfo} = useFetchUserInfo()

  return (
    <>
      <UserContext.Provider value={{userInfo, updateUserInfo}}>
        <ThemeProvider theme={MuiTheme}>
          <div className="App">
            <Router>
              <Routes>
                <Route index element={<Home/>}></Route>
                <Route path="sign_in" element={<SignIn/>}/>
                <Route path="sign_up" element={<SignUp/>}/>
                <Route path="movie/:id" element={<Movie/>}></Route>
                <Route path="movies/:type" element={<MovieList/>}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
              </Routes>
            </Router>
          </div>
          <ToastContainer />
        </ThemeProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
