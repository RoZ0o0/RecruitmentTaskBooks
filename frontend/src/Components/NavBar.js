import { NavLink } from 'react-router-dom';
import "../Styles/NavBar.css";

function NavBar() {
    return (
        <nav className='NavBar'>
            <div className="NavBar-itemDiv">
                <NavLink to='/' className="NavBar-item">{<span>Strona główna</span>}</NavLink>
            </div>
            <div className="NavBar-itemDiv">
            <NavLink to='/metrics' className="NavBar-item">{<span>Żądania</span>}</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;