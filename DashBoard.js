import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
// import Widget from '../Widget/Widget';
// import CustTableData from '../Widget/Widget';
import { Cards } from '../Widget/Cards';
import image from '../../images/BimsBlack.png'
import { userById } from '../../services/userservices';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  const curtUser = (JSON.parse(localStorage["curUser"]))



  return (
    <>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
             <div className='mx-auto'>
              <Link className="navbar-brand " to={'/login'}>
              <img className="img-container " src={image} alt="logo" />
                <span >Vehicle Service Center Software</span>
              </Link>
              </div>

              <Link to='/' className='menu-bars2'>
                <AiIcons.AiOutlineLogout />
              </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>

            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

          </ul>



        </nav>

      </IconContext.Provider>

      <div>
        <div className="title">
          <h3 className='hthree'>Welcome {curtUser.firmName}</h3>
        </div>
        {/* <CustTableData /> */}
        <Cards />

      </div>



    </>
  );
}

export default Sidebar;