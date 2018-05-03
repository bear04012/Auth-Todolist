import React, {Component} from 'react';
import {getRequest, putRequest} from '../utils/serverCall';

import '../App.css';


const ShowComment = ({comments}) => {
    
    // let {comments} = props;
    
    return(
        <div>
            <h1>Comment: </h1>
            <br/>
            {comments.map( (comment, i) => (
                <div className="comment" key={i}>
                    <div>{comment.email}</div>
                    <div>{comment.text}</div>
                    <div>{comment.date}</div>
                </div>
            ))}
        </div>
    )    
}

const AddComment = ({addComment}) => {

    let commentInput;
    
    return(
        <form onSubmit={(event) => {
            event.preventDefault();
        
            addComment(/email=([^;]*)/.exec(document.cookie)[1], commentInput.value);
            commentInput.value="";
            
            }} className="addNewComment">

            <h3>Text</h3>
            <textarea className="commentAdd" ref={(tag) => {
                commentInput = tag;
            }} placeholder="write a comment"/>
              
            <br />
            <button>submit</button>
    
        </form>
    )
}


class UserApp extends Component{
    constructor(props){
        super(props)
        
        this.state={
            loading:false,
            comments: []
        }
        
        this.loadComments();

        this.addComment = this.addComment.bind(this);
    }
    
    loadComments() {
        getRequest("https://yoon2-hastedk.c9users.io:8081/comments", {}).then(
            comments => this.setState({comments})
        );
    }
    
    addComment(email, comment) {
        // this.setState({loading: true});
        
        let tempComment = {email, text: "[TEMP]" + comment};
        this.setState({
            comments: this.state.comments.concat( [tempComment] )
        })
        
        putRequest("https://yoon2-hastedk.c9users.io:8081/comments", {email, comment}).then( () => {
            this.loadComments();
            // this.setState({loading: false});
        })
    }
    

    render() {
        
        return(
            <div>
                <button className="signOut" onClick={() => {
                        this.props.signOut()
                    }}> Sign Out </button>
                
                <ShowComment comments={this.state.comments}/>
                
                <AddComment addComment={this.addComment}/>
                
                <div className={"fullscreen-loader " + ((this.state.loading) ? "show" : "")}>
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            
            </div>
        )
    }
}

export default UserApp;