import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <nav>
                <NavLink to='/' className="NavBar-item">{<span>Home</span>}</NavLink>
            </nav>
        </>
    )
}

export default NavBar;