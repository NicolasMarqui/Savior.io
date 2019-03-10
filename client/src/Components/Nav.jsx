import React, {useState} from 'react';

const Nav = () => {

    const [isOpen, setOpen] = useState(false);

    const openNav = (status) => {
        setOpen(status)
    }

    return(
        <React.Fragment>
            <div className="fullNav" onClick={() => openNav(true)}>
                <i className="fas fa-bars fa-2x"></i>
                <h1>Savior.io</h1>
            </div>

            <div className="fullNavOpen" style={isOpen ? {display: 'flex'} : {display: 'none'}}>
                <i className="fas fa-times fa-3x" onClick={() => openNav(false)}></i>
                <div className="centerFull">
                    <ul>
                        <li><a href="_">Home</a></li>
                        <li><a href="_">Sobre</a></li>
                        <li><a href="_">Login</a></li>
                        <li><a href="_" className="comecarFull">Começar</a></li>
                    </ul>
                </div>
            </div>

            <div className="navWrapper">
                <div className="rightSideNav">
                    <ul>
                        <li><a href="_">Home</a></li>
                        <li><a href="_">Sobre</a></li>
                    </ul>
                </div>
                <div className="centerLogo">
                    <h1>Savior.io</h1>
                </div>
                <div className="leftSideNav">
                    <ul>
                        <li><a href="_">Login</a></li>
                        <li><a href="_" className="comecar">Começar</a></li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}
 
export default Nav;