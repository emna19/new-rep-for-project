/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect , useState} from 'react'
import  Axios  from 'axios';
import countries from "countries-list";
import './AudView.css';

export default function AudView(props) {

    const url = "http://localhost:5000/audiences/"+props.infos._id
    
    
    const [component, setComponent] = useState(["sample text"])

    const [country, setCountry] = useState([])

    const countryCodes = Object.keys(countries.countries);
    const countryNames = countryCodes.map(code => countries.countries[code].name);

    function handleCountry(e) {
        setCountry(prevCountry => ([
            ...prevCountry,
            e.target.value
        ]))
        
    }

    function ShowSelect() {
        setComponent([...component,"sample text"])
    }

    const [clicked, setClicked] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [updatedAt, setUpdatedAt] = useState()

    const [audience, setAudience] = useState({
        name:"",
        minAge: "",
        maxAge: "",
        countries: [],
        keywords: [],
        videoIDs: []
    })

    const styles={
        card:{
            width: "473px",
            fontSize: "18px",
            backgroundColor: "transparent"
        },

        cardBody:{
        paddingTop: "5px"
        }
    }

    function handle(e) {
        const newAudience = {...audience}
        if (e.target.id === "countries" || e.target.id === "keywords" || e.target.id === "videoIDs"){
            newAudience[e.target.id] = [e.target.value]
            console.log(newAudience)
        }else
        {newAudience[e.target.id] = e.target.value}
        setAudience(newAudience)
    }

    console.log(country)
    console.log(audience)
    function submit(e) {
        e.preventDefault()
        Axios.put(url, {...audience,keywords: (audience.keywords.toString()).split(",").map(item => item.trim()),
        videoIDs: (audience.videoIDs.toString()).split(",").map(item => item.trim()),countries: country})
            .then(response => {return (setUpdatedAt(response.data.updatedAt), setClicked(!clicked),refreshPage)});
    }
    useEffect(() => {
        setAudience(props.infos)
    }, [props.infos])
    
    const state = {
        reload: false
      };
    
    const refreshPage = () => {
        this.setState(
          {reload: true},
          () => (this.setState({reload: false}))
        )
    }
  
    let displayCountries = []
    let keywords = []
    let videoIDs = []

    if (audience !== undefined) {
    displayCountries = audience.countries.map((element) => element+',')
    displayCountries = displayCountries.filter(displayCountry => displayCountry !== "null," && displayCountry !== ",")
    console.log(displayCountries)
    if (displayCountries.length !== 0)  displayCountries[displayCountries.length-1]=displayCountries[displayCountries.length-1].replace(",","")
    console.log(displayCountries)
    
    keywords = audience.keywords.map((element) => element+',')
    keywords = keywords.filter(keyword => keyword !== "null," && keyword !== ",")
    console.log(keywords)
    if (keywords.length !== 0)  keywords[keywords.length-1]=keywords[keywords.length-1].replace(",","")
    console.log(keywords)

    videoIDs = audience.videoIDs.map((element) => element+',')
    videoIDs = videoIDs.filter(videoID => videoID !== "null," && videoID !== ",")
    if (videoIDs.length !== 0)  videoIDs[videoIDs.length-1]=videoIDs[videoIDs.length-1].replace(",","")
    }

    return (
        <>
        { !clicked && <div className="card text-center" style={ styles.card }>
        <div className=" card-body" style={ styles.cardBody }>
           <div className="row mb-3 justify-content-between align-items-center">
            <div className='col-auto' onClick={() => {setClicked(!clicked)}}>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                    </svg>
                </a>
            </div>
            <div className='col-auto' onClick={props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg> 
            </div>
           </div>
           <h2 className="mb-4 card-title fw-bold">{audience.name}</h2>

           <div className='row mb-4 px-3'>
                <span className="col-4 text-start card-text fw-bold">Age:</span>
                <div className="col-8 d-inline-flex" style={{gap:"8px"}}>
                    <div className='minAge'>{ audience.minAge }</div>-
                    <div className='maxAge'>{ audience.maxAge }</div>
                </div>
            </div>
            <div className="row mb-4 px-3">
                <span className="col-auto card-text fw-bold">Countries:</span>
                <div className='col-8 text-start countries'>{displayCountries.length === 0 ? <a>None</a> : displayCountries }</div>
            </div>
            <div className="row mb-4 px-3">
                <span className="col-auto card-text fw-bold">Keywords:</span>
                <div className='col-8 text-start keywords'>{ keywords.length === 0 ? <a>None</a> : keywords  }</div>
            </div>
            <div className="row mb-4 px-3">
                <span className="col-auto card-text fw-bold">Show IDs:</span>
                <div className='col-8 text-start movieIds'>{ videoIDs.length === 0 ? <a>None</a> : videoIDs }</div>
            </div>  
        </div>
        </div>
        }
        
        
        { clicked && <div className="card text-center" style={ styles.card }>
        <div className=" card-body" style={ styles.cardBody }>
           <div className="row justify-content-between align-items-center">
            <div className='col-auto'>
            </div>
            <div className='col-auto' onClick={props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg> 
            </div>
           </div>
           <form onSubmit={submit} className="row g-2" >
            <div className="col-md-7 mb-5" style={{margin: "38px auto"}}>
                    <input type="text" style={{fontSize: "25px"}} className="AudView form-control fw-bold text-center"  id="name" onChange={handle} value={audience.name} placeholder= "Name" />
                </div>
            

            <div className='row mb-4 px-3 align-items-center'>
                    <span className="col-3 text-start card-text fw-bold">Age:</span>
                    <div className="col-8 d-inline-flex align-items-center" style={{gap:"8px"}}>
                        <div className='col-3'>
                            <input type="text" style={{fontSize: "18px"}} className="AudView form-control text-center"  id="minAge" onChange={handle} value={audience.minAge} placeholder= "minAge"/>
                        </div>
                        -
                        <div className='col-3'>
                            <input type="text" style={{fontSize: "18px"}} className="AudView form-control text-center"  id="maxAge" onChange={handle} value={audience.maxAge} placeholder= "maxAge" />
                        </div>
                    </div>
                </div>
                <div className="row mb-4 px-3 align-items-center" style={{rowGap: "12px"}}>
                    <span className="col-auto card-text fw-bold">Countries:</span>
                        {/* <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="countries" onChange={handle} value={audience.countries } placeholder= "Countries" /> */}
                        {audience.countries.length !== 0 ? audience.countries.map((item, i) => (
                            <select key={i} className="edit-country form-select form-control countries-select" onChange={handleCountry}  value={country.name} id="countries" aria-label="Default select example">
                                <option value={item}>{item}</option>
                                    {countryNames.map((item, j) => (
                                        <option key={j} value={item}>{item}</option>
                                    ))} 
                                    
                            </select>
                        )):null}
                        {component.map((item, i) => (
                                <select key={i} className="edit-country form-select form-control countries-select" onChange={handleCountry}  value={country.name} id="countries" aria-label="Default select example">
                                    {countryNames.map((item, j) => (
                                        <option key={j} value={item}>{item}</option>
                                    ))} 
                                    
                                </select>
                        ))}

                    
                    <div className="edit-country-for-add"><button type="button" className="edit-country-add" onClick={ShowSelect}>+</button></div>

                    
                </div>
                <div className="row mb-4 px-3 align-items-center">
                    <span className="col-auto card-text fw-bold">Keywords:</span>
                    <div className="col-auto">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="keywords" onChange={handle} value={audience.keywords } placeholder= "Keywords" />
                    </div>
                </div>
                <div className="row mb-5 px-3 align-items-center">
                    <span className="col-auto card-text fw-bold">Show IDs:</span>
                    <div className="col-auto">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="videoIDs" onChange={handle} value={audience.videoIDs } placeholder= "Show IDs" />
                    </div>
                </div> 
                <div className="row mb-2 px-3 align-items-center justify-content-end" style={{gap: "12px"}}>
                    <button type="reset" className="home-container-Delete col-auto" onClick={() => {return (setClicked(!clicked))}} style={{height: "35px"}}>Cancel</button>
                    <button type="submit" className="home-container-Add" style={{height: "35px", fontSize:"17px"}}>Save</button>
                </div> 
            </form> 
        </div>
        </div>
        }
        </>
        )
}