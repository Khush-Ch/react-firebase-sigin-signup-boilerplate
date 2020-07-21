import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import firebase from './firebase';
import { AuthContext } from './Auth/Auth';


const Navbar = () => {

    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    const renderList = () => {
        if (currentUser) {
        return [
            <li className="sidenav-close" key="1"><Link to="#">First Item</Link></li>,
            <li className="sidenav-close" key="2"><Link to="#">Second Item</Link></li>,
            <li className="sidenav-close" key="3"><Link to="#">Third Item</Link></li>,
            <li className="sidenav-close" key="4">
            <button className="btn #c62828 red darken-3"
                onClick={() =>{
                    firebase.auth().signOut()
                        .then(() => {
                            M.toast({html: "Successfully Logged Out", classes:"#43a047 green darken-1"});
                            history.push('/signin');
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                }} >
                Logout</button>
            </li>
        ];
        } else {
            return [
            <li className="sidenav-close" key="5"><Link to="/signin">Sign in</Link></li>,
            <li className="sidenav-close" key="6"><Link to="/signup">Sign up</Link></li>
            ];
        }
    };


    return (
        <>
        <nav>
        <div className="nav-wrapper white">
            <Link to={currentUser?"/": "/signin"} className="brand-logo">App Name</Link>
            <a href="#" className="sidenav-trigger" data-target="mobile-links">
            <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
            </ul>
        </div>

        </nav>
        <ul className="sidenav" id="mobile-links">
            {renderList()}
        </ul>
        </>
    );
};


export default Navbar;