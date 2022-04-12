import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { API, MY_MENU } from '../../constants';
import { Info } from '../../constants/dataDefault';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink } from '../../custom-link';
import InfoShop from '../InfoShop';
import CatelotyConten from './CatelotyConten';
import styles from './Nav.module.css';

interface IMobileMenuProps {
  showMenu: boolean;
  hideMenu: () => void;
  infoShop: Info;
}

const PathLogins = [
  {
    title: 'Đăng Nhập',
    path: '/login'
  },
  {
    title: 'Đăng Ký',
    path: '/register'
  }
]

function MobileMenu({showMenu, hideMenu, infoShop}: IMobileMenuProps) {

  const {authState: {user}} = useContext(AuthContext);

  const router = useRouter();

  const [icon, setIcon] = useState(false);

  return (
    <div>
      {showMenu ? <div className={styles.overlay} onClick={hideMenu}></div> : null}
      <div className={`${styles.mobileMenu} ${showMenu ? styles.show : ''}`}>
        <div className={styles.headerMenu}>
          <img 
            src={`${API}/images/${user?.img}`}
            alt="Avatar"
          />
          <div className={styles.infoAccountMenu}>
            <h3>{user ? 'Xin chào' : 'Đăng Nhập'}</h3>
            <p>{user ? `Chào mừng ${user.name} đến với ShopNQT!` : 'Nhận nhiều ưu đãi hơn tại ShopNQT!'}</p>
          </div>
        </div>

        <ul className={`${styles.chooseMenu} ${styles.borderBottom}`}>
          <p className={styles.chooseMenuTitle}>Tài Khoản:</p>
          {
            user ?
            <NavLink href='/user'>
              <li onClick={hideMenu}>
                Thông tin tài khoản
              </li>
            </NavLink>

            : PathLogins.map(pathLogin => (
              <NavLink key={pathLogin.path} href={pathLogin.path}>
                <li onClick={hideMenu} className={router.pathname === pathLogin.path ? styles.activeChooseMenu : ''}>
                  {pathLogin.title}
                </li>
              </NavLink>
            ))
          }
        </ul>

        <ul className={styles.chooseMenu}>
          <p className={styles.chooseMenuTitle}>Danh Mục:</p>
          {MY_MENU.map(menu => {
            if(menu.path === '/category') {
              return (<div key={menu.path} >
                <li 
                  className={router.pathname === menu.path || icon ? styles.activeChooseMenu : ''} 
                  onClick={() => setIcon(!icon)}
                >
                  <div className={styles.chooseMenuCategory}>
                    {menu.title}
                    {icon ? <FaAngleDown /> : <FaAngleRight />}
                  </div>
                </li>
                  {icon ? <CatelotyConten hideMenu={hideMenu} isMobile={true} /> : ''}
              </div>)
            }

            return (
              <NavLink key={menu.path} href={menu.path}>
                <li onClick={hideMenu} className={router.pathname === menu.path ? styles.activeChooseMenu : ''}  >
                  {menu.title}
                </li>
              </NavLink>
            )
          })}
        </ul>

        <div className={styles.bottomMenu}>
          <h3>Hỗ Trợ:</h3>
          <InfoShop infoShop={infoShop} className={styles.contactList} />
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;