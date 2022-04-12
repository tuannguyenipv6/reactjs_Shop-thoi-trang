import { useState } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import CatelotyConten from './CatelotyConten';
import styles from './Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { MY_MENU } from '../../constants';

function NavbarMenu() {
  const [icon, setIcon] = useState(<FaAngleRight />);
  const router = useRouter()

  return (<div className={styles.navMenu}>
    <ul className={styles.navList}>

      {MY_MENU.map((item) => {
        if(item.path === '/category') {
          return (
            <li 
              key={item.path}
              className={styles.navListItem} 
              onMouseOver={() => setIcon(<FaAngleDown />)} 
              onMouseOut={() => setIcon(<FaAngleRight />)}
            >
              <div className={`${styles.category} ${router.pathname === item.path ? styles.active : ''}`}>
                DANH MỤC
                {icon}  
                <CatelotyConten />
              </div>
            </li>
          )
        }

        return (
          <li key={item.path} className={styles.navListItem}>
            <Link href={item.path}>
              <a
                className={router.pathname === item.path ? styles.active : ''}
              >
                {item.title}
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  </div>)
}

export default NavbarMenu;