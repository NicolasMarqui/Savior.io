import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

    const [isOpen, setOpen] = useState(false);

    const openNav = (status) => {
        setOpen(status)
    }

    return(
        <React.Fragment>
            <div className="fullNav">
                <i className="fas fa-bars fa-2x" onClick={() => openNav(true)}></i>
                <Link to="/" style={{textDecoration: 'none', color: 'white'}}><h1>Savior.io</h1></Link>
            </div>

            <div className="fullNavOpen" style={isOpen ? {display: 'flex'} : {display: 'none'}}>
                <i className="fas fa-times fa-3x" onClick={() => openNav(false)}></i>
                <div className="centerFull">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="_">Sobre</a></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><a href="_" className="comecarFull">Começar</a></li>
                    </ul>
                </div>
            </div>

            <div className="navWrapper">
                <div className="rightSideNav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="_">Sobre</a></li>
                    </ul>
                </div>
                <div className="centerLogo">
                    <Link to="/" style={{textDecoration: 'none', color: 'white'}}><h1>Savior.io</h1></Link>
                </div>
                <div className="leftSideNav">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><a href="_" className="comecar">Começar</a></li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}
 
export default Nav;