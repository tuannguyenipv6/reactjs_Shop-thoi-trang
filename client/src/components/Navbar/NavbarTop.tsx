import { useContext } from 'react';
import { FaFacebook, FaInstagram, FaSignInAlt, FaTwitter, FaUserPlus, FaYoutube } from 'react-icons/fa';
import { API } from '../../constants';
import { Info } from '../../constants/dataDefault';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink } from '../../custom-link';
import styles from './Nav.module.css';

interface INavbarTopProps {
  infoShop: Info;
}

function NavbarTop({infoShop}: INavbarTopProps) {
  const {authState: {isAuthenticated, user}, logoutUser} = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
  }

  return (<div className={styles.navTop}>
    <div className={styles.follow}>
      <span>Theo dõi:</span>

      <a href={infoShop.LinkFacebook ? infoShop.LinkFacebook : 'https://www.facebook.com'}><FaFacebook className={styles.iconBlue} /></a>
      <a href={infoShop.LinkInstagram ? infoShop.LinkInstagram : 'https://www.instagram.com'}><FaInstagram className={styles.iconRed} /></a>
      <a href={infoShop.LinkYoutobe ? infoShop.LinkYoutobe : 'https://www.youtube.com'}><FaYoutube className={styles.iconRed} /></a>
      <a href={infoShop.LinkTwitter ? infoShop.LinkTwitter : 'https://twitter.com'}><FaTwitter className={styles.iconBlue} /></a>
    </div>

    <div className={styles.login}>
      {
        isAuthenticated ? 
        <>
          <NavLink href='/user'>
            <button className={user?.admin ? styles.admin : ''}>
              {
                user?.img ? <img className={styles.avatar} src={`${API}/images/${user.img}`} alt='Avatar' /> : null
              }
              {user?.name}
            </button>
          </NavLink>

          <span style={{marginBottom: 3}}>|</span>

          <button onClick={handleLogout}>
            <FaSignInAlt className='mr-2'/>
            Đăng xuất
          </button>
        </>
        : (<>
          <NavLink href='/login'>
            <button>
              <FaSignInAlt className='mr-2'/>
              Đăng nhập
            </button>
          </NavLink>
          <span style={{marginBottom: 3}}>|</span>
          <NavLink href='/register'>
            <button>
              <FaUserPlus className='mr-2'/>
              Đăng ký
            </button>
          </NavLink>
        </>)
      }
    </div>
  </div>)
}

export default NavbarTop;