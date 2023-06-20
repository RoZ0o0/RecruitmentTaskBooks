import { NavLink } from 'react-router-dom';
import "../Styles/NavBar.css";
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';

function NavBar() {
    return (
        <nav className='NavBar'>
            <NavLink to='/' className="NavBar-item"><HomeIcon />{<span>Strona główna</span>}</NavLink>
            <NavLink to='/metrics' className="NavBar-item"><TableChartIcon />{<span>Żądania</span>}</NavLink>
        </nav>
    )
}

export default NavBar;