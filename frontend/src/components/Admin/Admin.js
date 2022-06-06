/* eslint-disable jsx-a11y/anchor-is-valid */
import './Admin.css'
import {useEffect , useState} from 'react'
import { parseISO, format } from 'date-fns';
import  Axios  from 'axios';
import AnnViewAdmin from './AnnViewAdmin';
import UserView from './userView';

import { useDispatch } from 'react-redux';
import { userProfileAction } from "../../redux/actions/users/userActions";

export default function Admin() {

    const [users, setUsers] = useState([]);

    const [viewClicked, setViewClicked] = useState(false)

    const [item, setItem] = useState([]);

    const [componentName, setComponentName] = useState()

    const [ads, setAds] = useState([]);

    const admin = JSON.parse(localStorage.getItem("userAuth"));

    const annonceUrl = "http://localhost:5000/annonces/"
    /// users Url
    const usersUrl = 'http://localhost:5000/users/' ;

    const styles = {

        home: {
            zIndex: viewClicked ? -1 : null,
            height: viewClicked ? "660px" : null,
            backgroundColor: viewClicked ? "#00000094" : null,
          },
          container_home: {
            zIndex: viewClicked ? -1 : null,	
            position: viewClicked ? "fixed" : null,
            filter: viewClicked ? "blur(1px)" : null,
            marginTop: 0,
            marginLeft: 0,
            width:"100%"
          },
    }
    

    function deleteAnnonce(e) {
        Axios.delete(annonceUrl+e.target.id).then(res => {window.location.href = '/admin'})
      }

    function ShowLists(props) {

        const [expand, setExpand] = useState(false);

        let i =0;

        const tab = ads.map((ad, index) =>(ad.User=== props.user._id ? true: null)).filter(item => item === true)
        document.body.style = "background-color: white";

        return(
            <>
                <tr key={props.index}>
                    <td>{props.index+1}</td>
                    <td><a href="#"> {props.user.name}</a></td>
                    <td>{ props.user.createdAt ? format( parseISO(props.user.createdAt), 'yyyy/MM/dd') : null }</td>
                    <td> {props.user.isAdmin ? `Admin`: `Advertiser`} </td>
                    {props.user.token ? 
                        <td><span className="status text-success">&bull;</span> Active </td> : 
                        <td><span className="status text-danger">&bull;</span> Inactive</td>
                    }
                    <td>
                        {/* settings annonceur */}
                        <a style={{cursor : props.user.isAdmin ? "not-allowed" : "pointer", color : props.user.isAdmin ? "grey" : "#114a71"}} 
                            onClick={() => {return (
                                        setViewClicked(!viewClicked),
                                        setComponentName("User"),
                                        setItem(props.user)
                                )}}
                            href="#" className="settings" title="Settings" data-toggle="tooltip"
                         >
                         <i className="material-icons">&#xE8B8;</i>
                         </a>
                        {/* delete annonceur */}
                        <a style={{cursor : props.user.isAdmin ? "not-allowed" : "pointer", color : props.user.isAdmin ? "grey" : "#F17B22"}}
                            onClick={
                                ()=>{ if (!props.user.isAdmin) {
                            const  user = props.user._id
                            Axios.delete(usersUrl+user).then(res => {window.location.href = '/admin'})}  }} 
                            id={props.user.id} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                        {/* gerer annonce */}
                        <a style={{cursor : props.user.isAdmin ? "not-allowed" : "pointer", color : props.user.isAdmin ? "grey" : "#114a71"}}
                            onClick={() => { return (props.user.isAdmin ? null: setExpand(!expand))}}  
                            className="settings" 
                            title="Settings" 
                            data-toggle="tooltip"
                        >
                            {expand ? <i className="material-icons">expand_less</i> :
                            <i className="material-icons">expand_more</i>
                            } 
                        </a>
                    </td>
                
                </tr>
                
                {expand &&
                <> 
                    {props.user.isAdmin === undefined && <>{tab.length !==0 ?
                    <>
                    <tr className='ads-table' style={{height: "37px"}}>
                    <th>Ads</th>
                        <th>#</th>
                        <th>Name</th>						
                        <th>Date Created</th>
                        <th>Validation</th>
                        
                        <th>Action</th>
                    </tr>
                
                    {ads.map((ad, index) => 
                        (ad.User=== props.user._id ? 
                        <tr className='ads-table' key={index}>
                            <td></td>
                            <td>{i=i+1}</td>
                            <td>{ad.name}</td>
                            <td>{ ad.createdAt ? format( parseISO(ad.createdAt), 'yyyy/MM/dd kk:mm:ss') : null }</td>
                            <td style={{paddingLeft:"40px"}}> {ad.isValid ? <i style={{color: "green"}} className="material-icons">check</i> : <i style={{color: "red"}} className="material-icons">highlight_off</i>} </td>
                            
                            <td>
                                <a onClick={() => {return (
                                    setViewClicked(!viewClicked),
                                    setComponentName("Annonce"),
                                    setItem(ad)
                                    )}}
                                 className="settings" title="Settings" data-toggle="tooltip">
                                 <i className="material-icons">&#xE8B8;</i></a>
                                <a onClick={deleteAnnonce} id={ad._id} href="#" className="delete" title="Delete" data-toggle="tooltip"><i onClick={deleteAnnonce} id={ad._id} className="material-icons">&#xE5C9;</i></a>
                            </td>
                        </tr> 
                        : null)
                    )}
                    </>
                    : <><tr className='ads-table' style={{height: "37px"}}>
                        <th></th><th style={{color:"#F44336"}}>User has no Ads</th><th></th><th></th><th></th><th></th></tr></>
                    }</>}
                    
                </>
                }
                
                
                
            </>
        )
    }
    console.log(viewClicked)
    useEffect(() => {
        Axios.get('http://localhost:5000/users/')
        .then(res => setUsers(res.data))

        Axios.get('http://localhost:5000/annonces')
        .then(res => setAds(res.data))
    },[])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userProfileAction());
    }, [dispatch]);

    return (
        
        <div className="home Admin" style={styles.home}>
        <main className="container-home" style={styles.container_home}>
        <div className='welcome-section text-center mb-3'>
            <img className="rounded-circle" height="152"
            width="152" style={{marginBottom:"10px"}} alt="100x100" src={require("../../assets/avatar.png")}
            data-holder-rendered="true"></img>

            <h2 style={{color: "#114a71"}}><strong>Welcome, {admin.name}</strong></h2>
        </div>

        <div className="table-responsive">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row px-2 mb-2">
                        <div className="col-xs-5">
                            <h2>User Management</h2>
                        </div>
                        <div className="col-xs-7">
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style={{width: "265px"}}>Name</th>						
                            <th style={{width: "317px"}}>Date Created</th>
                            <th style={{width: "287px"}}>Role</th>
                            <th style={{width: "195px"}}>Status</th>
                            <th style={{width: "128px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <ShowLists user={user} key={index} index={index}/>
                        ))}
                        
                    </tbody>
                </table>
                
            </div>
        </div></main>
        {viewClicked && <div className="overlay">
            <div >
              {componentName === "Annonce" ? 
              <AnnViewAdmin onClick={() => {setViewClicked(!viewClicked)}} infos= {item}/> : 
              <UserView onClick={() => {setViewClicked(!viewClicked)}} infos= {item}/>}
            </div>
          </div>
        }        
    </div>
    )
}