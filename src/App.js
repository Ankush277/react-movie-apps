import styled from 'styled-components'
import MovieComponent from "./components/MovieComponents";
import movieIcon from "./mi.ico";
import React, { useState } from "react";
import axios from "axios";
import MovieInfoComponents from "./components/MovieInfoComponents";

export const API_KEY = "ce84c1d9";

const Container = styled.div`
display: flex;
flex-direction: column;
`;
const Header= styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: black;
color: white;
align-items: center;
padding: 15px;
font-size: 15px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;
const AppNameContainer = styled.div`
display: flex;
flex-direction : row;
align-items: center;
`;
const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`;
const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 20px 15px;
background-color: white;
border-radius: 6px;
margin-left: 20px;
width: 50%;
background-color: white;
align-items: center;
`;
const SearchIcon = styled.img`
width: 25px;
height: 25px;
`;
const SearchInput=styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;
const MovieListContainer=styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 24px;
justify-content: space-evenly;
`;

const Placeholder = styled.img`
 width: 100vw;       /* full viewport width */
  height: 100vh;      /* full viewport height */
  object-fit: cover;  /* keeps aspect ratio but fills screen */
  opacity: 0.8;       /* slightly transparent for softer look */
  position: absolute; /* covers the whole background */
  top: 0;
  left: 0;
  z-index: -1;
`;

function App() {
  const[searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString)=>{
   const response = await axios.get( `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
  
  updateMovieList(response.data.Search)
};
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(()=> fetchData(event.target.value),300)
    updateTimeoutId(timeout)
  };
  return (
    <Container>
    <div className="App">
    <Header>
     <AppNameContainer  >
       <MovieImage src={movieIcon} alt="Movie Icon" />
      Your <br></br>Movies
      </AppNameContainer>
      <SearchBox>
      <SearchIcon src={process.env.PUBLIC_URL + "/search-icon.svg"} />
      <SearchInput placeholder="Search Movie"
      value={searchQuery} 
      onChange={onTextChange} />
     </SearchBox>
      </Header>
      {selectedMovie && 
      <MovieInfoComponents 
      selectedMovie={selectedMovie}
      onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length?movieList.map((movie, index)=><MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />)
        : <Placeholder src={process.env.PUBLIC_URL + "/file.svg"} />

        
      </MovieListContainer>
      </div>
      </Container>
  );
}

export default App;