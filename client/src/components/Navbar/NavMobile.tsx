import { useState } from 'react';
import { FaBars, FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { API } from '../../constants';
import { Info } from '../../constants/dataDefault';
import { NavLink } from '../../custom-link';
import MobileMenu from './MenuMobile';
import styles from './Nav.module.css';

interface INavMoblieProps {
  infoShop: Info
}

function NavMoblie({infoShop}: INavMoblieProps) {

  const [showMenu, setShowMenu] = useState(false);

  return (<div className={styles.mobile}>
    <div className={styles.navMobileTop}>
      <FaBars onClick={() => setShowMenu(true)} />

      <img src={infoShop.NameLogo ? `${API}/images/${infoShop.NameLogo}` : '/icon/ShopNQT.png'} alt="Shop NQT" />

      <div className={styles.navMobileCart}>
        <NavLink href='/likes'>
          <div><FaHeart /></div>
        </NavLink>

        <NavLink href='/cart'>
          <div><FaShoppingCart /></div>
        </NavLink>
      </div>
    </div>

    <form className={styles.navMobileSearch}>
      <input placeholder="Tìm kiếm..." type="text" />

      <button type="submit">
        <FaSearch />
      </button>
    </form>

    <MobileMenu infoShop={infoShop}  showMenu={showMenu} hideMenu={() => setShowMenu(false)}  />
  </div>)
}

export default NavMoblie;