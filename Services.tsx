import React from "react";
import '../Style/Services.css';
import bgimg from '../assets/imginst.png';
import img from '../assets/imgsel.png';
import Navbar from "./Navbar";
function Services() {
    return (
        <div>
            <Navbar />
            <div className="cbody">
                <div className="cwrapper">
                    <br></br>
                    <div className="card">

                        <img src={bgimg}></img>
                        <div className="descriptions">
                            <h6>INSTALLATION</h6>
                            <br></br>
                            <br></br>
                            <h3>
                                To begin using the application, click here
                                to start installing all packages of flagman
                            </h3>

                            <a className="lin" href="./InstallationStatus" >
                                <button>


                                    INSTALLATION
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="card">

                        <img src={img}></img>
                        <div className="descriptions">
                            <h6>PACKAGES</h6>
                            <br></br>
                            <br></br>
                            <h3>
                                Click here to start installing individual packages of flagman seperately.
                            </h3>
                            <a className="lin" href="/Singleunitstatus" >
                                <button>


                                    Component
                                </button>
                            </a>
                        </div>
                    </div>

                </div>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
            </div>
        </div>
    )
}
export default Services;