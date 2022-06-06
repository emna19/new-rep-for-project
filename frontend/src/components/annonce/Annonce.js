import './Annonce.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useDispatch} from 'react-redux';

// import { useDispatch, useSelector } from 'react-redux';

import { userProfileAction } from "../../redux/actions/users/userActions";

export default function Annonce() {

    const url = "http://localhost:5000/annonces"

    const [audience, setAudience] = useState([])

    const [annonce, setAnnonce] = useState({
        name : '',
        startDate : '',
        endtDate : '',
        sector : '',
        budget : '',
        audience : '',
        clickUrl : '',
        sourceUrl : '',
        type : '',
        User: ''
    }) 
    // still not complete

    function handle(e) {
        const newAnnonce = {...annonce}
        newAnnonce[e.target.id] = e.target.value
        setAnnonce(newAnnonce)
    }

    function submit(e) {
        e.preventDefault();
        Axios.post(url, {
            name: annonce.name,
            startDate: annonce.startDate,
            endtDate: annonce.endtDate,
            sector: annonce.sector,
            budget: annonce.budget,
            audience: annonce.audience,
            clickUrl: annonce.clickUrl,
            sourceUrl: annonce.sourceUrl,
            type: annonce.type,
            User: user._id
        })
        .then(res => {window.location.href = '/Home'})
    }
    console.log(annonce.audience)

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(userProfileAction());
    }, [dispatch]);

    let user={}
    user = JSON.parse(localStorage.getItem("userAuth"));
    console.log(user._id)

    useEffect(() => {
       
        fetch('http://localhost:5000/audiences/user/'+user._id)
            .then(res => res.json())
            .then(data => setAudience(data))
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
      }, []);

    return(
        <div className="audience annonce">
            <header>
                <nav className="navbar" style={{ height:"59px"}}>
                    <div className="container-fluid">
                        <a className="navbar-brand col-3" href="/Home">
                            <img className="navbar-logo"  src={require("../../assets/artifyLogo.png")} alt="Artify Logo"></img>
                            <span className='navbar-title'>rtify Ads</span>
                        </a>
                        <div className="col-8">
                            <h5 className="navbar-title page-title">Create your Advertisement</h5>
                        </div>
                        
                    </div>
                
                </nav>
            </header>
            <main>
                <form onSubmit={submit}>
                    <div className="card col-6">
                        <div className="row mb">
                            <label htmlFor="exampleInputEmail1" className="nameAud-text form-label">Choose the Advertisement name:</label>
                            <div>
                                <input type="text" placeholder="Name..." className="form-control lg-input" onChange={handle} value={annonce.name} id="name" aria-describedby="emailHelp"/>
                            </div>
                        </div>
                        <div className="row mb">
                            <div className="col-2 form-label">Date:</div>
                            <div className="col-2">
                                <input type="date" className="age-input form-control" placeholder="Start" onChange={handle} value={annonce.startDate} id="startDate" aria-label="First name"/>
                            </div>
                            <p className='form-label' style={{display: "contents"}}>-</p>
                            <div className="col-2">
                                <input type="date" className="age-input form-control" placeholder="End" onChange={handle} value={annonce.endtDate} id="endtDate" aria-label="Last name"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-2 form-label countries-text">Audience:</div>
                                <div className="col-3">
                                    <select style={{margin:"0px"}} className="form-select form-control countries-select" onChange={handle} value={annonce.audience} id="audience" aria-label="Default select example">
                                        <option value="" disabled>Choose...</option>
                                        {audience.map((item, index) => (
                                            <option key={index} value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <Link to="/home/audience/create" style={{color: "#0d6efd"}}>or create an audience</Link>
                                </div>
                                <div className="col-2 text-center form-label countries-text">Sector:</div>
                                <div className="col-3">
                                    <select style={{margin:"0px"}} className="form-select form-control countries-select" onChange={handle} value={annonce.sector} id="sector" aria-label="Default select example">
                                        <option value="" disabled>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                        </div>

                        <div className="row mb">
                            <label htmlFor="exampleInputPassword1" className="col-2 form-label">Budget:</label>
                            <div className="col-3">
                                <input type="text" placeholder="..." onChange={handle} value={annonce.budget} id="budget" className=" form-control" />
                            </div>
                            <label htmlFor="exampleInputPassword1" className="col-2 text-center form-label">Type:</label>
                            <div className="col-3">
                                <input type="text" placeholder="..." onChange={handle} value={annonce.type} id="type" className=" form-control" />
                            </div>
                            
                        </div>
                        
                        <div className="row mb">
                            <label htmlFor="exampleInputPassword1" className="col-2 form-label">Page url:</label>
                            <div className="col-auto">
                                <input type="text" placeholder="https://www.google.com/" onChange={handle} value={annonce.clickUrl} id="clickUrl" className="lg-input form-control" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="exampleInputPassword1" className="col-auto form-label">Source url:</label>
                            <div className="col-auto">
                                <input type="text" placeholder="https://www.google.com/" onChange={handle} value={annonce.sourceUrl} id="sourceUrl" className="lg-input form-control" />
                            </div>
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