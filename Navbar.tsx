import React, {useState}from 'react';
import Logo from "../assets/flag.jpeg";
import {Link} from 'react-router-dom';

import styled from 'styled-components';

import '../Style/Navbar.css';


export const FooterLink = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 20px;
text-decoration: none;
font-weight:bold;

&:hover {
    color: #23a4f9;
    transition: 200ms ease-in;
    text-decoration: none;
   
    box-shadow: 0 0 1em 0.25em #23a4f9,
    inset 0 0 0.75em 0.25em #23a4f9;
}
`;

function Navbar(){
    const[openLinks,setOpenLinks]=useState(false);
    const toggleNavabar=()=>{
        setOpenLinks(!openLinks);
        
    };
   
    return(
        <div className='navbar'>
            
            <div className='leftSide' id={openLinks?"open":"close"}>
                <br></br>
                <a href="https://www.perleybrook.com/">
            <img src={Logo}></img>
            
            </a>
            <div className='hiddenLinks'>
                
                <Link to="/">Home</Link>
                <Link to="/Services">Services</Link>
                <Link to="/InstallationStatus">Installation</Link>
                <Link to="/Singleunitstatus">Components</Link>
                
                </div> 
            </div>
            <div className='rightSide'>
              
                
                <FooterLink href="/">Home</FooterLink>
			    <FooterLink href="/Services">Services</FooterLink>
                
                <FooterLink href="/InstallationStatus">Installation</FooterLink>
                <FooterLink href="/Singleunitstatus">Components</FooterLink>
               
                
         
       
         
                
                <button   onClick={toggleNavabar} >
                    
                    
                </button>
                
                </div>
            </div>
       
    
    )
}
export default Navbar  ;