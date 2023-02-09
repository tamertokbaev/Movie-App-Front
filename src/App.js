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
import {AddMovie} from "./pages/admin/addMovie/addMovie";
import AdminMoviesList from "./pages/admin/listMovies/listMovies";
import {EditMovie} from "./pages/admin/editMovie/editMovie";
import Profile from "./pages/profile/Profile";
import {Search} from "./pages/search/Search";
import CssBaseline from "@mui/material/CssBaseline";
import {AddGenre} from "./pages/admin/addGenre/AddGenre";
import AdminGenresList from "./pages/admin/listGenres/listGenres";
import {EditGenre} from "./pages/admin/editGenre/editGenre";
import LastReleasedMovies from "./pages/lastReleased/LastReleasedMovies";
import PopularMovies from "./pages/popularMovies/PopularMovies";
import PlayListsPage from "./pages/playLists/playLists";
import {PlaylistPage} from "./pages/playLists/playlistPage";

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: '#051937',
      contrastText: '#fff'
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        background: '#fff',
      },
    },
  }
})


function App() {
  const {userInfo, updateUserInfo} = useFetchUserInfo()

  return (
    <>
      <UserContext.Provider value={{userInfo, updateUserInfo}}>
        <ThemeProvider theme={MuiTheme}>
          <CssBaseline/>
          <Router>
            <Routes>
              <Route index element={<Home/>}></Route>
              {!userInfo && (
                <>
                  <Route path="sign_in" element={<SignIn/>}/>
                  <Route path="sign_up" element={<SignUp/>}/>
                </>
              )}
              <Route path="movie/:id" element={<Movie/>}></Route>
              <Route path="last-released" element={<LastReleasedMovies/>}></Route>
              <Route path="popular" element={<PopularMovies/>}></Route>
              <Route path="search" element={<Search/>}></Route>
              <Route path="playlists" element={<PlayListsPage/>}></Route>
              <Route path="playlists/:id" element={<PlaylistPage/>}></Route>
              {userInfo && (
                <>
                  <Route path="profile" element={<Profile/>}></Route>
                  <Route path="admin/movie/add" element={<AddMovie/>}></Route>
                  <Route path="admin/movie/list" element={<AdminMoviesList/>}></Route>
                  <Route path="admin/movie/edit/:movieId" element={<EditMovie/>}></Route>
                  <Route path="admin/genre/add" element={<AddGenre/>}></Route>
                  <Route path="admin/genre/list" element={<AdminGenresList/>}></Route>
                  <Route path="admin/genre/edit/:genreId" element={<EditGenre/>}></Route>
                </>
              )}
              <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
          </Router>
          <ToastContainer/>
        </ThemeProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
