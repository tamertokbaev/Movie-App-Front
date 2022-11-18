import './styles/globals.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import SignUp from "./pages/signUp/signUp";
import {createTheme, ThemeProvider} from "@mui/material";

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
  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <div className="App">
          <Router>
            <Header/>
            <Routes>
              <Route index element={<Home/>}></Route>
              <Route path="sign_in" element={<></>}/>
              <Route path="sign_up" element={<SignUp/>}/>
              <Route path="movie/:id" element={<Movie/>}></Route>
              <Route path="movies/:type" element={<MovieList/>}></Route>
              <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
