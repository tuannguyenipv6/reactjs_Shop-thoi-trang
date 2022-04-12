import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { API } from '../../constants';
import { Info } from '../../constants/dataDefault';
import { AuthContext } from '../../contexts/AuthContext';
import { MoadalContext } from '../../contexts/ModalContext';
import { SearchContext } from '../../contexts/SearchContext';
import { NavLink } from '../../custom-link';
import ModalRegisterQuestion from '../Modal/ModalRegisterQuestion';
import styles from './Nav.module.css';
import NavbarMenu from './NavbarMenu';
import NavbarTop from './NavbarTop';
import NavMoblie from './NavMobile';

interface INavbarProps {
  infoShop: Info
}

function Navbar({infoShop}: INavbarProps) {

  const {searchState, setSearchState} = useContext(SearchContext);
  const {showModal} = useContext(MoadalContext);
  const router = useRouter();
  const {authState: {user}} = useContext(AuthContext);
  
  const handleAuth = () => {
    showModal({
      title: 'Thông báo!',
      showModal: true,
      component: <ModalRegisterQuestion 
        description={{
          title: "Bạn chưa đăng nhập tài khoản",
          content: "Hãy đăng ký hoặc dùng tài khoản của bạn để sử dụng các dịch vụ của chúng tôi!. Bạn đã có tài khoản?"
        }}
      />
    });
  }
  
  const handleSearch = () => {
    if(router.pathname !== '/search') {
      router.replace("/search");
    }
  }

  return (<header className={styles.nav}>
    <div className={styles.wrapper}>
      <NavbarTop infoShop={infoShop} />

      <div className={styles.navMain}>
        <NavLink href='/'>
          <div>
            <img src={infoShop.NameLogo ? `${API}/images/${infoShop.NameLogo}` : '/icon/ShopNQT.png'} alt="Shop NQT" />
          </div>
        </NavLink>

        <div className={styles.search}>
          <form>
            <input 
              placeholder="Tìm kiếm..." 
              type="text" 
              value={searchState.searchState}
              onChange={e => setSearchState({...searchState, searchState: e.target.value})}
            />
            <button onClick={handleSearch} type="button">
              <FaSearch />
            </button>   
          </form>
        </div>

        <div className={styles.wrapperCarts}>
          {
            user ? 
            <>
              <NavLink href='/likes'>
                <div><FaHeart className={styles.likeCart} /></div>
              </NavLink>

              <NavLink href='/cart'>
                <div><FaShoppingCart className={styles.likeCart} /></div>
              </NavLink>
            </>
            : 
            <>
              <div onClick={handleAuth}><FaHeart className={styles.likeCart} /></div>
              <div onClick={handleAuth}><FaShoppingCart className={styles.likeCart} /></div>
            </>
          }
        </div>
      </div>

      <NavbarMenu />
    </div>

    <NavMoblie infoShop={infoShop} />
  </header>)
}

export default Navbar;