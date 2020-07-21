import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Spinner from '../Spinner/Spinner';
import firebase from '../firebase';
import { AuthContext } from './Auth';

const Signup = () => {
    
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    const postData = (event) => {
        if (!name) return M.toast({html: "Name can't be empty", classes:"#c62828 red darken-3"});
        setLoading(true);
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {

                result.user.updateProfile({
                    displayName: name
                })
                setLoading(false);
                M.toast({html: 'Successfully Signed Up!', classes:"#43a047 green darken-1"});
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({html: e.message, classes:"#c62828 red darken-3"});
            });
    };

    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                result.user.updateProfile({
                    displayName: result.user.displayName
                })
                setLoading(false);
                M.toast({html: 'Successfully Signed Up!', classes:"#43a047 green darken-1"});
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({html: e.message, classes:"#c62828 red darken-3"});
            });
    }


    let display = (
        <div className="card auth-card input-field">
            <h2>Sign Up</h2>
            <div className="google-btn" onClick={googleAuth}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>  
                <p className="btn-text"><b>Sign up with google</b></p>
            </div>
            <h6>or</h6>
            <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />             
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={postData} >SignUp</button>
            <h6>Already have an account?<Link to="/signin"><span style={{ color: 'rgb(8, 93, 252)' }}> SignIn</span></Link></h6>
        </div>
    );


    if (loading) display = <Spinner />


    return (
        <div className="mycard">
            {display}
        </div>
    )
};

export default Signup;