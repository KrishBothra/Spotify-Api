import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { CardTitle, Image } from "react-bootstrap";


const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split("=")
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {})
}

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({})
  const [recentPlayed, setRecentlyPlayed] = useState({})
  const [topArtists, setTopArtists] = useState({})
  const [topTracks, setTopTracks] = useState({})


  const [loggedIn, setLoggedIn] = useState(false)

  const aboutMe = useRef(null);
  const outsideSchool = useRef(null);
  const home = useRef(null);
  const [numArtist, setNumArtist] = useState("");

  const [numTracks, setNumTracks] = useState("");





  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    console.log("This is what we derived from the URL: ", getTokenFromUrl())
    const spotifyToken = getTokenFromUrl().access_token
    window.location.hash = "";
    console.log("This is our spotify token", spotifyToken);

    if (spotifyToken) {
      setSpotifyToken(spotifyToken)
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getMe().then((user) => {
        console.log(user)
      })
      ///use spotify api
      setLoggedIn(true)
    }
  })

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      })
    })
  }

  const getRecentlyPlayed = () => {
    spotifyApi.getMyRecentlyPlayedTracks().then((response) => {
      console.log(response);
      setRecentlyPlayed({
        album_type: response.items[0].track.album.images[0].url,
        name: response.items[0].track.name
      })
    })
  }

  const getTopArtists = () => {
    spotifyApi.getMyTopArtists().then((response) => {
      console.log(response);
      setTopArtists({
        name: response.items[numArtist - 1].name,
        pic: response.items[numArtist - 1].images[0].url,
      })
    })
  }

  const getTopTracks = () => {
    spotifyApi.getMyTopTracks().then((response) => {
      console.log(response);
      setTopTracks({
        name: response.items[numTracks - 1].name,
        pic: response.items[numTracks - 1].album.images[0].url
      })
    })
  }



  return (

    <>
      <Navbar fixed='top' data-bs-theme="dark" expand="lg" className="bg-body-tertiary opac">
        <Container fluid>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link onClick={() => scrollToSection(home)} >
                Spotify Player
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection(aboutMe)} >Top Tracks</Nav.Link>



              <Nav.Link onClick={() => scrollToSection(outsideSchool)} >Top Artists</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div data-bs-theme="dark" className="text-center ">

        <Card ref={home} className="background " style={{ width: '90rem', height: ' 147rem' }}>
          <Card ref={home} className="background " style={{ width: '90rem', height: ' 49rem' }}>
            <Card.Body>
              <br />
              <span>
                {!loggedIn && <Button href='http://localhost:8888'>Login to Spotify</Button>}



                {loggedIn && (

                  <>
                    <div >
                      <span className='d-flex'>
                        <img src={nowPlaying.albumArt} className='container' />
                        <Button variant="light" className='btnC bg-light' onClick={() => getNowPlaying()}>
                          Check Now Playing
                        </Button>
                        <Button variant="light" className='btnCT bg-light'>{nowPlaying.name}</Button>

                        <img src={recentPlayed.album_type} className='container' />
                        <Button variant="light" className='btn2 bg-light ' onClick={() => getRecentlyPlayed()}>
                          Check Recently Played
                        </Button>
                        <Button variant="light" className='btn2T bg-light' onClick={() => getRecentlyPlayed()}>
                          {recentPlayed.name}
                        </Button>
                      </span>
                    </div>
                  </>
                )}
                {loggedIn && (
                  <></>
                )}
                {loggedIn && (
                  <></>
                )}
                {loggedIn && (
                  <></>
                )}
              </span>

            </Card.Body>

          </Card>
          <Card ref={aboutMe} className="background " style={{ width: '90rem', height: ' 49rem', color: 'black' }}>
            <Card.Body>

              <br />
              <br />
              <br />


              {loggedIn && (
                <>
                  <span className='d-flex'>
                    <img src={topTracks.pic} className='container2 justify-content-center mx-auto' />
                    <Button variant="light" className='overMidName bg-light' onClick={() => getTopTracks()}>
                      {topTracks.name}
                    </Button>
                    <Button variant="light" className='overMid bg-light' onClick={() => getTopTracks()}>
                      Check Recently Played
                    </Button>
                    <input className='overMidT bg-light'
                      type="number"
                      placeholder=""
                      value={numTracks}
                      onChange={(e) => setNumTracks(e.target.value)}
                    />

                  </span>
                </>
              )}
              {loggedIn && (
                <></>
              )}


            </Card.Body>

          </Card>
          <Card ref={outsideSchool} className="background" style={{ width: '90rem', height: ' 49rem' }}>


            <Card.Body>
              <br />
              <br />
              <br />


              {loggedIn && (
                <>
                  <span className='d-flex'>
                    <img src={topArtists.pic} className='container2 justify-content-center mx-auto' />


                    <Button variant="light" className='overMidName bg-light' onClick={() => getTopArtists()}>
                      {topArtists.name}
                    </Button>
                    <Button variant="light" className='overMid bg-light' onClick={() => getTopArtists()}>
                      Check Recently Played
                    </Button>
                    <input className='overMidT bg-light'
                      type="number"
                      placeholder=""
                      value={numArtist}
                      onChange={(e) => setNumArtist(e.target.value)}
                    />

                  </span>
                </>
              )}
              {loggedIn && (
                <></>
              )}


            </Card.Body>

          </Card>
        </Card>


      </div>

    </>


  );
}

export default App;
