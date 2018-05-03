import React, { Component } from 'react';
import LoginScreen from './containers/LoginScreen';
import UserApp from './containers/UserApp';
// import LoginForm from './components/LoginForm';
// import SignUpForm from './components/SignUpForm';

import {getRequest} from './utils/serverCall';
import './App.css';




class App extends Component {
    constructor(props){
        super(props);
        
        if (document.cookie.indexOf("key=") >= 0) {
            this.state = {
                isLoggedIn: true,
                user: {
                    uid: /uid=([^;]*)/.exec(document.cookie)[1],
                    email: /email=([^;]*)/.exec(document.cookie)[1]
                }
            }    
        } else {
            this.state = {
                isLoggedIn: false,
                user: {
                    uid: -1,
                    email: null
                }
            }
        }
        
        getRequest("https://yoon2-hastedk.c9users.io:8081/test", {});
        
        
        this.onLoginStatusChange = this.onLoginStatusChange.bind(this);
        this.userSignOut = this.userSignOut.bind(this);
        
    }
    
    userSignOut(){
        this.setState({
            isLoggedIn: false,
            
        })
        document.cookie = "key" + '=; expires=Thu,01 Jan 1970 00:00:01 GMT;';
        
    }
    
    onLoginStatusChange(isLoggedIn,user) {
        this.setState({
            isLoggedIn,
            user
        });
    }
    render() {
        
        if (!this.state.isLoggedIn) {
            return <LoginScreen onLoginStatusChange={this.onLoginStatusChange} />
        }
        
        return (
            <div>
            
                <UserApp user={this.state.user} signOut={this.userSignOut} />

            </div>
        )
    }
}

export default App;

//1. should container bring an import from component?
