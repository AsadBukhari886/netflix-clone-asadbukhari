import './App.css';
import Row from './Row';
import request from './request';
import Banner from './Banner.jsx';
import Nav from './Nav.jsx'

function App() {
  return (
    <div className="App">
      {/* {nav bar} */}
      <Nav/>
      {/* {banner} */}
      <Banner/>
      <Row title="Netflix Orignals" fetchURL={request.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchURL={request.fetchTrending} />
      <Row title="Top rated" fetchURL={request.fetchTopRated} />
      <Row title="Action Movies" fetchURL={request.fetchActionMovies} />
      <Row title="Comedy movies" fetchURL={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={request.fetchRomanceMovies} />
      <Row title="Documentories" fetchURL={request.fetchDocumentories} />
      </div>
  );
}

export default App;
