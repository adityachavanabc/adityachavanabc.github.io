import { Link } from 'react-router-dom';
import image from './Navbar/BimsBlack.png';
import './Navbar/img.css'
import { Component } from 'react';


export class Navigation extends Component {
  handleChange = () => {
    this.setState({
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <img className="img-container" src={image} alt="logo" />
            <Link className="navbar-brand" to={'/login'}>
              Vehicle Service Center Software
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/customer'}>
                    Customers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/product'}>
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sales'}>
                    Sales
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/purchase'}>
                    Purchase
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/dashboard'}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;