import React, {useState} from "react";
import Cookies from 'universal-cookie'
import axios from 'axios'
import signInImage from '../assets/new-sign-up.jpg'
import Footer from './Footer'
//
const cookies = new Cookies()
const initialState ={//initial state for form
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''

}

const Auth=()=>{
    const [form, setForm]= useState(initialState)
    const [isSignup, setIsSignup] = useState(true);
    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
        console.log(form)
    }
    const Foot=()=>{
        (
        <section className="footer">
        <hr/>
        <section>
            <a href ="/" target="_blank" >Social</a>
        </section>
    <section>
    
    </section>
    </section>
        )
    
    }
    const handleSubmit= async (e)=>{ //handles login/register logic
        e.preventDefault(); //prevents reloading
        const { username, password,phoneNumber,avatarURL} = form;
        const URL = 'http://localhost:5000/auth';
        const { data: {token, userId, hashedPassword, fullName} } = await axios.post(`${URL}/${isSignup ?'signup': 'login'}`,{
            username,password, fullName: form.fullName, phoneNumber, avatarURL,
        })
        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)

        if(isSignup){ //not a member yet
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashedPassword', hashedPassword)

        }
        window.location.reload(); //should reload with auth token set if user is logged in


    }
    const switchMode= ()=>{ //changes state depending on previous one
        setIsSignup((prevIsSignup)=> !prevIsSignup)
    }
    return(
       <>
        <div className="auth__form-container">
            
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    
                    <p>{isSignup ? 'Sign up' : 'Sign in' }</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        )}

                         <div className="auth__form-container_fields-content_input">
                        
                                <label htmlFor="username">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone number"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        )}
                            {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar Url</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        )}
                        {/* for password field */}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            {/* for repeat password */}
                            {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                              )}
                              <div className="auth__form-container_fields-content_button">
                                <button>{isSignup ? 'Sign up': 'Sign in'}</button>
                              </div>
                         </form>
                            <div className="auth__form-container_fields-account">
                                <p>
                                    {isSignup
                                    ? "Aleady have an account? ":
                                    "Don't have account? "}
                                    <span onClick={switchMode}>
                                        {isSignup ? 'Sign in': 'Sign up'}
                                    </span>
                                </p>
                            
                            </div>

                </div>
               

            </div>
            
            <div className="auth__form-container_image">
           
                <img src ={signInImage} alt ="sign in"/>
                
            </div>

           <Footer>
            <div>
                This is the footer!!!!
            </div>
           </Footer>
           
        </div>
       
        </>
        
        
    )
}
export default Auth;