import React, {Component} from 'react';

import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';


class LoginScreen extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            selectedTab:"Login",
            
        };
        
        
        this.onTabSelect = this.onTabSelect.bind(this);
    }
    
    
    onTabSelect(selectedTab){
        this.setState({selectedTab})
    }
    
    render() {
        return (
            <div className="box">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={"nav-link pointer " + (this.state.selectedTab === "Login" ? "active" : "") } onClick={ () => this.onTabSelect("Login") }>Login</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link pointer " + (this.state.selectedTab === "Sign Up" ? "active" : "") } onClick={() => this.onTabSelect("Sign Up")}>Sign Up</a>
                    </li>
                </ul>
                <h1>{this.state.selectedTab}</h1>
                {
                    this.state.selectedTab === "Login" && <LoginForm onLoginStatusChange={this.props.onLoginStatusChange} />
                }
                
                {
                    this.state.selectedTab === "Sign Up" && <SignUpForm onLoginStatusChange={this.props.onLoginStatusChange} />
                }
            </div>
        )
    }
    
}

export default LoginScreen;