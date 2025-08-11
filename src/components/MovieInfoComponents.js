import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";

const Container = styled.div`
   position: relative; 
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 50px auto; 
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
  border-radius: 10px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieName = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
`;

const InfoItem = styled.div`
  font-size: 15px;
  span {
    font-weight: bold;
    color: #333;
  }
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4f;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 50%;
  padding: 6px 12px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2);

   transition: all 0.3s ease;

  &:hover {
    background: #e60000;
    transform: rotate(90deg) scale(1.1);
  }
`;


const Plot = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
`;

const MovieInfoComponents = ({ selectedMovie, onMovieSelect }) => {
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    if (selectedMovie) {
      axios
        .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then((response) => setMovieInfo(response.data))
        .catch((err) => console.error("Error fetching movie details:", err));
    }
  }, [selectedMovie]);

  if (!movieInfo) return <span>Loading movie details...</span>;

  return (
    <Container>
      <CoverImage src={movieInfo.Poster} alt={movieInfo.Title} />
      <InfoColumn>
        <div>
          <MovieName>{movieInfo.Title}</MovieName>
          <InfoGrid>
            <InfoItem><span>IMDB Rating:</span> {movieInfo.imdbRating}</InfoItem>
            <InfoItem><span>Year:</span> {movieInfo.Year}</InfoItem>
            <InfoItem><span>Genre:</span> {movieInfo.Genre}</InfoItem>
            <InfoItem><span>Director:</span> {movieInfo.Director}</InfoItem>
            <InfoItem><span>Actors:</span> {movieInfo.Actors}</InfoItem>
            <InfoItem><span>Language:</span> {movieInfo.Language}</InfoItem>
          </InfoGrid>
          <Plot>{movieInfo.Plot}</Plot>
        </div>
      </InfoColumn>
      <Close onClick={() => onMovieSelect(null)}>×</Close>


    </Container>
  );
};

export default MovieInfoComponents;