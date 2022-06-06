import './Audience.css'
import { useState } from 'react'
import Axios from 'axios';
import countries from "countries-list";

export default function Audience() {

    let user={}
    user = JSON.parse(localStorage.getItem("userAuth"));
    console.log(user._id)

    const url = "http://localhost:5000/audiences"
    const [audience, setAudience] = useState({
        name : '',
        minAge : '',
        maxAge : '',
        keywords : '',
        videoIDs : '',
        User: user._id,
        countries: ''
    })

    const [component, setComponent] = useState(["sample text"])

    const [country, setCountry] = useState([])

    const countryCodes = Object.keys(countries.countries);
    const countryNames = countryCodes.map(code => countries.countries[code].name);

    

    function ShowSelect() {
        setComponent([...component,"sample text"])
    }

    function handleCountry(e) {
        setCountry(prevCountry => ([
            ...prevCountry,
            e.target.value
        ]))
        
    }

    function handle(e) {
        const newAudience = {...audience}
        newAudience[e.target.id] = e.target.value
        setAudience(newAudience)
    }


    function submit(e) {
        e.preventDefault();
        Axios.post(url, {
            name: audience.name,
            minAge: audience.minAge,
            maxAge: audience.maxAge,
            countries: country,
            keywords: audience.keywords.split(",").map(item => item.trim()),
            videoIDs: audience.videoIDs.split(",").map(item => item.trim()),
            User: user._id.toString()
        })
        .then(res => {window.location.href = '/Home'})
    }

    return(
        <div className="audience">
            <header>
                <nav className="navbar" style={{ height:"59px"}}>
                    <div className="container-fluid">
                        <a className="navbar-brand col-3" href="/Home">
                            <img className="navbar-logo"  src={require("../../assets/artifyLogo.png")} alt="Artify Logo"></img>
                            <span className='navbar-title'>rtify Ads</span>
                        </a>
                        <div className="col-8">
                            <h5 className="navbar-title page-title">Create your custom Audience</h5>
                        </div>
                        
                    </div>
                
                </nav>
            </header>
            <main>
                <form onSubmit={submit}>
                    <div className="card col-6">
                        <div className="mb-5">
                            <label htmlFor="exampleInputEmail1" className="nameAud-text form-label">Choose your Audience name:</label>
                            <input type="text" placeholder="Name..." className="form-control lg-input" onChange={handle} value={audience.name} id="name" aria-describedby="emailHelp"/>
                        </div>
                        <div className="col-8 row mb-5">
                            <div className="col-4 form-label age-text">Age:</div>
                            <div className="col-2" style={{width:"80px"}}>
                                <input type="text" className="age-input form-control" placeholder="Min" onChange={handle} value={audience.minAge} id="minAge" aria-label="First name"/>
                            </div>
                            <p className='form-label' style={{display: "contents"}}>-</p>
                            <div className="col-2" style={{width:"80px"}}>
                                <input type="text" className="age-input form-control" placeholder="Max" onChange={handle} value={audience.maxAge} id="maxAge" aria-label="Last name"/>
                            </div>
                        </div>
                        <div className="select-row row mb-5">
                            <div className="col-5 form-label countries-text">Countries:</div>
                            {component.map((item, i) => (
                                <select key={i} className="form-select form-control countries-select" onChange={handleCountry}  value={country.name} id="countries" aria-label="Default select example">
                                    {countryNames.map((item, j) => (
                                        <option key={j} value={item}>{item}</option>
                                    ))} 
                                    
                                </select>
                            ))}
                            <div className="for-add-btn"><button type="button" className="add btn" onClick={ShowSelect}>+</button></div>
                        </div>
                        
                        <div className="row mb-5">
                            <label htmlFor="exampleInputPassword1" className="col-2 form-label">Keywords:</label>
                            <input type="text" placeholder="Keyword 1, Keyword 2, ect..." onChange={handle} value={audience.keywords} id="keywords" className="lg-input form-control" />
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="exampleInputPassword1" className="col-2 form-label">Show IDs:</label>
                            <input type="text" placeholder="Show Id 1, Show Id 2, ect..." onChange={handle} value={audience.videoIDs} id="videoIDs" className="lg-input form-control" />
                        </div>
                    </div>
                    <div className="col-6 buttons">
                        <button type="reset" className="btn cancel btn-primary">Cancel</button>
                        <button type="submit" className="btn save btn-primary">Save</button>
                    </div> 
                </form>
            </main>
        </div>
        
    )
}