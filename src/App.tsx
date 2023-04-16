import './App.scss';
import { useState, ChangeEvent } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import MapIcon from '@mui/icons-material/Map';
import GoogleIcon from '@mui/icons-material/Google';

function App() {
  const [input, setInput] = useState<string>('');
  const [countryName, setCountryName] = useState<string>('');
  const [commonName, setCommonName] = useState<string>('');
  const [flag, setFlag] = useState<string>('');
  const [googleMaps, setGoogleMaps] = useState<string>('');
  const [openStreetMaps, setOpenStreetMaps] = useState<string>('');

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const foo = (obj: any) => {
    setCountryName(obj[0].name.official);
    setCommonName(obj[0].name.common);
    setFlag(obj[0].flags.png);
    setGoogleMaps(obj[0].maps.googleMaps);
    setOpenStreetMaps(obj[0].maps.openStreetMaps);
    (document.getElementsByClassName('infoIcon')[0] as HTMLDivElement).style.visibility="visible";
    (document.getElementsByClassName('countryInfo')[0] as HTMLDivElement).style.visibility="visible";
  }

  const search = () => {
      fetch(`https://restcountries.com/v3.1/name/${input}`)
      .then(response => response.json())
      .then(data => foo(data));
  }

  const res = (obj: any) => {
      setInput(obj[randomInteger(0, 249)].name.common);
      (document.getElementsByClassName('searchButton')[0] as HTMLButtonElement).click();
  }
  
  const chooseRandomCountry = () => {
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => res(data));
  }

  return (
    <div className="App">
      <div className="logo">
        <PublicIcon className="publicIcon" />
        <h2>Country Guide</h2>
      </div>
      <div className="countryInfo">
      <img src={flag}/>
      <h1>{countryName}</h1>
      </div>
      <div className="searchContainer">
      <input className="countryInput" placeholder="Country Name" onChange={(e: ChangeEvent<HTMLInputElement>)=>{
        setInput(e.target.value);
      }}></input>
      <br /><br /><br />
      <InfoIcon className="infoIcon" onClick={()=>{document.getElementById('modal')!.style.display="block"}} />
      <button className="searchButton" onClick={search}>Take me there</button>
      <ShuffleOnIcon className="shuffleIcon" onClick={chooseRandomCountry} />
      </div>
      <div id="modal" className="modal">
    <div className="modal-content">
    <span className="close" onClick={()=>{document.getElementById('modal')!.style.display="none"}}>&times;</span>
    <LocationOnIcon style={{color: "white", height: "45px", width: "45px"}} />
    <h1 style={{color: "white", fontWeight: "400"}}>CURRENT LOCATION</h1>
    <h3 style={{color: "white", fontWeight: "400"}}>{commonName}</h3>
    <div className="icons">
      <a href={googleMaps}><DirectionsIcon className="icon directionsIcon" /></a>
      <a href={openStreetMaps}><MapIcon className="icon mapIcon" /></a>
      <a href={"https://www.google.com/search?q=" + countryName}><GoogleIcon className="icon googleIcon" /></a>
      <br />
      <div className="labels">
      <label>Google Maps</label>
      <label>Street Maps</label>
      <label>Google Search</label>
      </div>
    </div>
    <hr />
    </div>
  </div>
    </div>
  );
}

export default App;
