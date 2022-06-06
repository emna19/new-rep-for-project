import {useEffect , useState} from 'react'
import countries from "countries-list";
import Axios  from 'axios';


export default function UserView(props) {

    const [user, setUser] = useState(props.infos)

    const [clicked, setClicked] = useState(false)
    const [updatedAt, setUpdatedAt] = useState() ; 


    const styles={
        card:{
            width: clicked ? "768px":"457px",
            fontSize: "18px",
            backgroundColor: "transparent"
        },

        cardBody:{
        paddingTop: "5px"
        }
    }


    const countryCodes = Object.keys(countries.countries);
    const countryNames = countryCodes.map(code => countries.countries[code].name);

    function handle(e) {
        const newUser = {...user}
        newUser[e.target.id] = e.target.value
        setUser(newUser)
    }
    const urlUpdateUser = "http://localhost:5000/users/"+user._id
    console.log(user);
    function submit(e) {
        e.preventDefault()
        Axios.put(urlUpdateUser,user).then(response => {return (setUpdatedAt(response.data.updatedAt), setClicked(!clicked))});

        
    }

    return(
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
           <h2 className="mb-5 card-title fw-bold">{user.name}</h2>

            <div className="row mb-4 px-3">
                <span className="col-4 text-start card-text fw-bold">Email:</span>
                <div className='col-8 text-start countries'>{ user.email }</div>
            </div>
            <div className="row mb-4 px-3">
                <span className="col-4 text-start card-text fw-bold">Phone:</span>
                <div className='col-8 text-start countries'>{ user.phone }</div>
            </div>

            <div className="row mb-4 px-3">
                <span className="col-4 text-start card-text fw-bold">Organisation:</span>
                
                <div className='col-8 text-start countries'>{ user.organisation }</div>

                
            </div>

            <div className="row mb-4 px-3">
                <span className="col-4 text-start card-text fw-bold">Country:</span>
                <div className='col-8 text-start countries'>{ user.country }</div>
            </div>
            <div className="row mb-4 px-3">
                <span className="col-4 text-start card-text fw-bold">City:</span>
                <div className='col-8 text-start keywords'>{ user.city }</div>
            </div>
            <div className="row mb-4 px-3">
                <span className="col-4 text-start card-text fw-bold">Adress:</span>
                <div className='col-7 text-start movieIds'>{ user.adress }</div>
            </div> 
            <div className="row mb-4 px-3">
                <span className="col-4 text-start card-text fw-bold">Postal Code:</span>
                <div className='col-7 text-start movieIds'>{ user.codePostal }</div>
            </div>
            
        </div>
        
        </div>
        }


        { clicked && <div className="Annonce edit card text-center" style={ styles.card }>
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
                <div className="col-md-5 mb-5" style={{margin: "38px auto"}}>
                    <input type="text" style={{fontSize: "25px"}} className="AudView form-control fw-bold text-center"  id="name" onChange={handle} value={user.name} placeholder= "Name" />
                </div>
            
                <div className="row mb-4 px-3 align-items-center">
                    <span className="col-4 text-start card-text fw-bold">Email:</span>
                    <div className="col-4">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="email" onChange={handle} value={user.email} placeholder= "Email" />
                    </div>
                
                    <span className="col-4 text-start card-text fw-bold">Phone:</span>
                    <div className="col-3">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="phone" onChange={handle} value={user.phone} placeholder= "Phone" />
                    </div>
                
                </div>
                <div className="row mb-4 px-3 align-items-center">
                    <span className="col-4 text-start card-text fw-bold">Organisation:</span>
                    <div className="col-4">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="organisation" onChange={handle} value={user.organisation} placeholder= "Organisation" />
                    </div>          
                
                    <span className="col-4 text-start card-text fw-bold">Country:</span>
                    <div className="col-3">
                        <select className="form-select form-control countries-select" onChange={handle}  value={user.country} id="country" aria-label="Default select example">
                            {countryNames.map((item, j) => (
                                <option key={j} value={item}>{item}</option>
                            ))} 
                            
                        </select>
                   </div>
                </div>
                <div className="row mb-4 px-3 align-items-center">
                    <span className="col-4 text-start card-text fw-bold">City:</span>
                    <div className="col-4">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="city" onChange={handle} value={user.city } placeholder= "City" />
                    </div>
                    <span className="col-4 text-start card-text fw-bold">Postal Code:</span>
                    <div className="col-3">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="codePostal" onChange={handle} value={ user.codePostal } placeholder= "Postal Code" />
                    </div>
                    
                </div>
                <div className="row mb-4 px-3 align-items-center">
                    <span className="col-4 card-text fw-bold text-start">Adress:</span>
                    <div className="col-6">
                        <input type="text" style={{fontSize: "18px"}} className="AudView form-control"  id="adress" onChange={handle} value={user.adress } placeholder= "Adress" />
                    </div>
                </div>
                     
                <div className="row mb-2 px-3 align-items-center justify-content-end" style={{gap: "12px"}}>
                    <button type="reset" className="home-container-Delete col-auto" onClick={() => {setClicked(!clicked)}} style={{height: "35px"}}>Cancel</button>
                    <button type="submit" className="home-container-Add" style={{height: "35px", fontSize:"17px"}} >Save</button>
                </div> 
            </form> 
        </div>
        </div>
        }
    </>  
    )
}