import React from "react";
import Post from "../post/post";
const Home = () =>{

        return (
            
                <div>
                <div style={{height:"150px",paddingTop:"50px",textAlign:"center",fontWeight:"bolder",color:"White"}}>
                <h1 >Home</h1>
                </div>
                <hr style={{color:"white",height:"2px"}}/>
                <Post/>
                </div>
             
             
           
        );


};
export default Home;