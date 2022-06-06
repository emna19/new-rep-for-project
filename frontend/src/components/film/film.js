import ReactPlayer from 'react-player/youtube'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios'

export default function Film() {

  const params = useLocation();

  const [country, setCountry] = useState("country");
  

  function handleImpression(e) {

    window.open(params.state.item.clickUrl, '_blank', 'noopener,noreferrer')
    navigator.geolocation.getCurrentPosition(function(position) {
      setCountry(position.coords.latitude.toString()+ "-" + position.coords.longitude.toString()) 
    })
    Axios.post("http://localhost:5000/impressions",
    {
      date: new Date().toISOString(),
      annonce: params.state.item._id,
      country: country
    })
  }

    return(
      <div     style ={{height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      overflow: "hidden",
      position: "fixed"}}>
        <ReactPlayer width='100%' height='100%' url={params.state.item.sourceUrl} onPlay={handleImpression}/>
      </div>
      )
}