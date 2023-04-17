import { Link } from 'react-router-dom';
import image from './BimsBlack.png'
import './img.css';

function Navbar() {
  return (

    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <img className="img-container" src={image} alt="logo" />
        <Link className="navbar-brand" to={'/login'}>
        Vehicle Service Center Software
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={'/login'}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/signup'}>
                Sign up
              </Link>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>

  )
}
export default Navbar;