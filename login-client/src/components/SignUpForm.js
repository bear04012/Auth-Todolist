import React from 'react';
import {getRequest} from '../utils/serverCall';

// const sendDataSignUp = (email,password,firstName,LastName,cb) => {
//     const req = new XMLHttpRequest();
//     req.onreadystatechange = () => {
//         if(req.readyState === 4 && req.status === 200) {
//             let result = JSON.parse(req.responseText); // {login:true}
//             //req.responseText: results from server
            
//             if (result.isLoggedIn) {
//                 alert("You are successfully signed up!")
                
//                 document.cookie = "key=" + result.key;
//             } else {
//                 alert(result.errorMsg);
                
//             }
            
//             cb(result.isLoggedIn);
//         }
//     };
//     req.open("GET", `https://yoon2-hastedk.c9users.io:8081/sign-up?email=${email}&password=${password}`,true);
//     req.send();
    
// }

const SignUpForm = ({onLoginStatusChange}) => {
    let emailInput;
    let passwordInput;
    let firstInput;
    let lastInput;
    return (
        <div className="fullPageCentered">
            <form onSubmit={
                    event => {
                        event.preventDefault();
                        if (emailInput.value==="" ||
                            passwordInput.value==="" ||
                            firstInput.value=== "" ||
                            lastInput.value=== ""){
                                return ;
                            }
                        //sendDataSignUp(emailInput.value, passwordInput.value,firstInput.value,lastInput.value, onLoginStatusChange);
                        let data = {
                            email:emailInput.value,
                            password:passwordInput.value,
                            firstName:firstInput.value,
                            lastName:lastInput.value
                        }
                        getRequest("https://yoon2-hastedk.c9users.io:8081/sign-up",data)
                            .then (result => {
                                if (result.isLoggedIn) {
                                    alert("You are successfully signed up!")
                                    document.cookie = "key=" + result.key;
                                    document.cookie = "email=" + emailInput.value;
                                    document.cookie = "uid=" + result.uid;
                                } else {
                                    alert(result.errorMsg);
                                }    
                                onLoginStatusChange(result.isLoggedIn, {
                                                        email:emailInput.value,
                                                        uid:result.uid
                                                    });
                            })
                    }
                }>
                    <div className= "form-group">
                        <label htmlFor="exampleInputFirstname1">First Name</label>
                        <input type="text" className="form-control" id="exampleInputFirstName" placeholder = "First Name"
                            ref={node => firstInput = node }
                        />
                    </div>
                    <div className= "form-group">
                        <label htmlFor="exampleInputLastname1">Last Name</label>
                        <input type="text" className="form-control" id="exampleInputLastName" placeholder = "Last Name"
                            ref={node => lastInput = node }
                        />
                    </div>
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

export default SignUpForm;