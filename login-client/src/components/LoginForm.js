import React from 'react';

import {getRequest} from '../utils/serverCall';


// const sendDataLog = (email, password,cb) => {
//     const req = new XMLHttpRequest();
//     req.onreadystatechange = () => {
//         if(req.readyState === 4 && req.status === 200) {
//             let result = JSON.parse(req.responseText); // {login:true}
//             //req.responseText: results from server
            
            
            
//             cb(result.isLoggedIn);
//         }
//     }

//     req.open("GET", "https://yoon2-hastedk.c9users.io:8081/login?email=" + email + "&password=" + password, true)
//     req.send();
// }

const LoginForm = ({onLoginStatusChange}) => {
    let emailInput;
    let passwordInput;
    return (
        <div className="fullPageCentered">
            <form onSubmit={
                    event => {
                        event.preventDefault();
                        // sendDataLog(emailInput.value, passwordInput.value, onLoginStatusChange);
                        let data = {
                            email:emailInput.value,
                            password:passwordInput.value
                        };
                        getRequest("https://yoon2-hastedk.c9users.io:8081/login",data)
                            .then(result => {
                                if (result.isLoggedIn) {
                                    document.cookie = "key=" + result.key;
                                    document.cookie = "email=" + emailInput.value;
                                    document.cookie = "uid=" + result.uid;
                                } else {
                                    alert("cannot find the right username/password")
                                }
                                onLoginStatusChange(result.isLoggedIn, {
                                                        email:emailInput.value,
                                                        uid:result.uid
                                                    });
                            });
                    }
                }>
                    <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                        ref={ node => emailInput = node }
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                        ref={ node => passwordInput = node }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        // <form onSubmit={event => {
        //     event.preventDefault();
        //     sendData(emailInput.value, passwordInput.value, onLoginStatusChange);
        // }}>
        //     <input type="text" placeholder="input your email" ref={ tag => emailInput = tag }/>
        //     <br/>
        //     <input type="password" placeholder="Enter Password" ref={ tag => passwordInput = tag } />
        //     <br/>
        //     <button type="submit" className="btn btn-primary">Submit</button>
            
        
        // </form>
        
    )
}

export default LoginForm;