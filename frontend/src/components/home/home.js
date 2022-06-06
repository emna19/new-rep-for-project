import './home.css'
import { parseISO, format } from 'date-fns';
import {useEffect , useState} from 'react'
import  Axios  from 'axios';
import AudView from '../audiences/AudView';
import AnnView from '../annonce/AnnView';
import BarChart from '../charts/BarChart';
// import Film from '../film/film';


import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction } from "../../redux/actions/users/userActions";
// import {initialState} from '../../redux/store/store'
import { useNavigate } from "react-router-dom";
import { getDay } from 'date-fns/esm';

export default function Home() {

  // const isActive= "carousel-item active card text-center"
  // const nActive= "carousel-item card text-center"

  const [audience, setAudience] = useState([])

  const [testAudience, setTestAudience] = useState([])

  

  

  // const [chartAudience, setChartAudience] = useState({
  //   labels: labels,
  //   datasets: [{
  //     label:'Audience Age',
  //     data: data
  //   }]
  // })

  // console.log(chartAudience)

  const [annonce, setAnnonce] = useState([])

  const [isCheckedAnnonce, setIsCheckedAnnonce] = useState([])

  const [isCheckedAllAnnonce, setIsCheckedAllAnnonce] = useState(false)

  const [isCheckedAudience, setIsCheckedAudience] = useState([])

  const [isCheckedAllAudience, setIsCheckedAllAudience] = useState(false)

  const annonceUrl = "http://localhost:5000/annonces/"

  const audienceUrl = "http://localhost:5000/audiences/"

  const [viewClicked, setViewClicked] = useState(false)

  const [componentName, setComponentName] = useState()

  const [impression, setImpression] = useState([])

  const [item, setItem] = useState({})

  const [chartAudience, setChartAudience] = useState({})

  const navigate = useNavigate();


  const styles = {
    container_home: {
      zIndex: viewClicked ? -1 : null,	
      position: viewClicked ? "fixed" : null,
      filter: viewClicked ? "blur(1px)" : null,
    },

    home: {
      zIndex: viewClicked ? -1 : null,
      height: viewClicked ? "660px" : null,
      backgroundColor: viewClicked ? "#00000094" : null,
    },

    buttonDeleteAudience: {
      color: isCheckedAudience.length ===0 ? "grey": null,
      border: isCheckedAudience.length ===0 ? "1px solid #ffffff00" : null, 
      cursor: isCheckedAudience.length ===0 ? "not-allowed" : "pointer"
    },

    svgXAudience: {
      fill: isCheckedAudience.length ===0 ? "grey" : "#F17B22"
    },

    buttonDeleteAnnonce: {
      color: isCheckedAnnonce.length ===0 ? "grey": null,
      border: isCheckedAnnonce.length ===0 ? "1px solid #ffffff00" : null, 
      cursor: isCheckedAnnonce.length ===0 ? "not-allowed" : "pointer"
    },

    svgXAnnonce: {
      fill: isCheckedAnnonce.length ===0 ? "grey" : "#F17B22"
    }

  }

  const userLogin = useSelector((store) => store.userLogin);
  const userInfo = userLogin.userInfo;
  console.log('userfrom store',userInfo);


  function addAnnonce(e) {
    if (localStorage.getItem("userAuth") !== null) {
      navigate('/home/annonce/create')
    }
  }

  function deleteAnnonce() {
    isCheckedAnnonce.map(item => Axios.delete(annonceUrl+item).then(res => {window.location.href = '/home'}))
    
  }

  function addAudience(e) {
    window.location.href = '/home/audience/create'
  }

  function deleteAudience() {
    isCheckedAudience.map(item => Axios.delete(audienceUrl+item).then(res => {window.location.href = '/home'}))
    
  }

  function handleChangeAnnonce(e) {
    const { id, checked } = e.target;
    setIsCheckedAnnonce([...isCheckedAnnonce, id]);
    if (!checked) {
      setIsCheckedAnnonce(isCheckedAnnonce.filter(item => item !== id));
    }
  }

  function handleSelectAllAnnonce() {
    setIsCheckedAllAnnonce(!isCheckedAllAnnonce)
    if (!isCheckedAllAnnonce) {
      setIsCheckedAnnonce(annonce.map(item => item._id))
    }else {setIsCheckedAnnonce([])}
  }

  function handleChangeAudience(e) {
    const { id, checked } = e.target;
    setIsCheckedAudience([...isCheckedAudience, id]);
    if (!checked) {
      setIsCheckedAudience(isCheckedAudience.filter(item => item !== id));
    }
  }

  function handleSelectAllAudience() {
    setIsCheckedAllAudience(!isCheckedAllAudience)
    if (!isCheckedAllAudience) {
      setIsCheckedAudience(audience.map(item => item._id))
    }else {setIsCheckedAudience([])}
  }


  function GetAudienceById(props) {
    const aud = audience.find(element => element._id === props.id)
    
    if(aud !== undefined){
    return aud.name}
  }

  // let labels=[]
  let user={}
  // let name=[]
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);
  
  user = JSON.parse(localStorage.getItem("userAuth"));
  // console.log(user.name)

  document.body.style = "background-color: white";


    useEffect(() => {
      Axios.get('http://localhost:5000/audiences/user/'+user._id)
        .then(res => setAudience(res.data))
    },[])
      

  useEffect(() => {
    
    fetch('http://localhost:5000/annonces/user/'+user._id)
      .then(res => res.json())
      .then(data => setAnnonce(data))
      

// empty dependency array means this effect will only run once (like componentDidMount in classes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: annonce.map(item =>item._id)})
  };
    fetch("http://localhost:5000/impressions/annonces/",requestOptions).then(res => res.json())
    .then(data => setImpression(data))
  },[annonce])

  useEffect(() => {
    let count={}
    var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

        for (var i=0; i < weekdays.length; i++) {
          count[weekdays[i]]=0
        }

    impression.forEach(function(x) {
        count[weekdays[getDay( parseISO(x.date), 'yyyy/MM/dd kk:mm:ss')]] = (count[weekdays[getDay( parseISO(x.date), 'yyyy/MM/dd kk:mm:ss')]] || 0) + 1 ;
    })
    console.log(count)
    setChartAudience({
        labels: weekdays,
        datasets: [{
            label:'Impressions',
            fill: false,
            backgroundColor: "#114a71",
            borderColor: "#114a71",
            data: Object.values(count)
        }]
        
    })
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[impression])

  const state = {
    reload: false
  };

  const refreshPage = () => {
    this.setState(
      {reload: true},
      () => this.setState({reload: false})
    )
  }

  if (annonce.length !== 0) {console.log(format( parseISO(annonce[0].startDate), 'yyyy/MM/dd kk:mm:ss')); console.log(annonce[0].audience)}

    return(
      <div className="home" style={styles.home}> 
        <main className="container-home" style={styles.container_home}>
          <div className="home-container-head" style={{marginBottom: 0}}>
            
          </div>
          
            <div className="login-container" style={{width: "867px", 
              height: "400px", 
              backgroundImage: "none",
              padding: 0,
              marginLeft: "230px", 
              marginBottom: "40px"}}
            >
              { audience.length!== 0 && <div style={{textAlign: "center",
                      
                      position: "absolute",
                      left: "1%",
                      right: "1%",}}><BarChart chartData={chartAudience}/>
                    </div>
              } 
            </div>
          
          <div className="home-container-head">
            <h5 className="home-container-title">Advertisements</h5>
            <div className='row mb-2 justify-content-between align-items-center'>
              <div className="col-auto form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleSelectAllAnnonce} checked={isCheckedAllAnnonce} />
                  <label className="form-check-label" htmlFor="flexCheckDefault">Select All</label>
              </div>
              <div className='col-auto'>
                <button style={styles.buttonDeleteAnnonce} className="home-container-Delete" type="button" onClick={deleteAnnonce}>
                  <svg style={styles.svgXAnnonce} xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                  Delete Selected
                </button>
              </div>
              <div className='col-auto'>
                <button onClick={addAnnonce} className="home-container-Add" type="button">+ Add</button>
              </div>
            </div>
          </div>


          <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">  
            <div className="row carousel-inner audiences announcements login-container">
              {annonce.map((item, index) =>(
                  <div key={index} className="card text-center">
                  <div className="card-body">
                    <div className='row mb-4 justify-content-between'>
                      <div className="col-auto form-check">
                        <input className="form-check-input" type="checkbox" value="" id={item._id} onChange={handleChangeAnnonce} checked={isCheckedAnnonce.includes(item._id)}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                      </div>
               
            
                      <div className="col-auto" style={{padding:"0px", display:"flex", gap: "8px"}}>
                      
                        <button type="button" className="home-container-Add"
                        style={{width: "65px"}}
                        onClick={() => {return (navigate("/film", {state: {item}})) } }>
                                  Verify
                        </button>
                
                        <button type="button" className="home-container-Delete" onClick={() => {return (
                            setViewClicked(!viewClicked),
                            setComponentName("Annonce"),
                            setItem(item)
                           )} }>
                          View
                        </button>
                      </div>
                      
                    </div>
                    <h5 className="mb-3 card-title">{ item.name }</h5>
                    <div className='row mb-3'>
                      <span className="col-auto text-start card-text">Start date:</span>
                      <div className='col-auto'>{ format( parseISO(item.startDate), 'yyyy/MM/dd')}</div>
                    </div>
                    <div className='row mb-3'>
                      <span className="col-auto text-start card-text">End date:</span>
                      <div className='col-auto'>{format( parseISO(item.endtDate), 'yyyy/MM/dd')}</div>
                    </div>
                    {item.isValid ?  null: <div className='row mb-3 validation'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="col-auto bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                      <div className='col-auto'>Waiting for validation</div>
                    </div> }
                    
                  </div>
                </div>
                ))}

            </div>
          </div>


          <div className="home-container-head">
            <h5 className="home-container-title">Audiences</h5>
            <div className='row mb-2 justify-content-between align-items-center'>
            <div className="col-auto form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleSelectAllAudience} checked={isCheckedAllAudience}/>
                  <label className="form-check-label" htmlFor="flexCheckDefault">Select All</label>
              </div>
              <div className='col-auto'>
                <button className="home-container-Delete" style={styles.buttonDeleteAudience} type="button" onClick={deleteAudience}>
                  <svg style={styles.svgXAudience} xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                  Delete Selected
                </button>
              </div>
              <div className='col-auto'>
                <button onClick={addAudience} className="home-container-Add" type="button">+ Add</button>
              </div>
            </div>
          </div>                
          <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
            <div className="row carousel-inner audiences login-container">
              
            {audience.map((item, index) =>(
                
                <div key={index} className="card text-center">
                <div className="card-body">
                  <div className='row mb-2 justify-content-between'>
                    <div className="col-auto form-check">
                      <input className="form-check-input" type="checkbox" value="" id={item._id} onChange={handleChangeAudience} checked={isCheckedAudience.includes(item._id)}/>
                      <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                    </div>
                    <div className="col-auto" style={{padding:"0px"}}>
                        <button type="button" className="home-container-Delete" onClick={() => {return (
                            setViewClicked(!viewClicked),
                            setComponentName("Audience"),
                            setItem(item)
                           )} }>
                          View
                        </button>
                    </div>
                  </div>
                  <h5 className="card-title mb-4">{ item.name }</h5>
                  <div className='row mb-3'>
                      <span className="col-auto text-start card-text">Age:</span>
                      <div className='col-auto'>{ item.minAge }</div>-
                      <div className='col-auto'>{ item.maxAge }</div>
                    </div>
                    <div className='row mb-3'>
                      <span className="col-auto text-start card-text">Countries:</span>
                      <div className='col-8' 
                      style={{textAlign : "left"}}
                      >
                        { item.countries.length === 0 ? <a>None</a> :
                          item.countries.map((element, index) =>  
                          index === item.countries.length-1 ? 
                          <p key= {index} 
                            style={{display:"inline"}}>
                            {element}
                          </p> : 
                          <p key= {index} 
                            style={{display:"inline"}}>
                              {element},
                          </p>
                          ) 
                        }
                      </div>
                    </div>
                </div>
              </div>
              ))}
            </div>
            {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>   */}
          </div>
        </main>

        {viewClicked && <div className="overlay">
            <div >
              {componentName === "Annonce" ? <AnnView userID={user._id} audienceID={item.audience} onClick={() => {setViewClicked(!viewClicked)}} infos= {item}/> : <AudView onClick={() => { return(setViewClicked(!viewClicked),refreshPage)}} infos= {item}/>}
            </div>
          </div>
        }
        
      </div>
    )
}