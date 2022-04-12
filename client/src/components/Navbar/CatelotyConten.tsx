import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CATELOTYCONTEN } from '../../constants';
import { SearchContext } from '../../contexts/SearchContext';
import styles from './Nav.module.css';

interface ICatelotyContenProps {
  isMobile?: boolean;
  hideMenu?: () => void;
}

function CatelotyConten({ isMobile=false, hideMenu }: ICatelotyContenProps) {
  const [activeListChild, setActiveListChild] = useState('');
  const {setSearchState} = useContext(SearchContext);

  const router = useRouter();

  const handleSetStateSearch = (s: string) => {
    setSearchState(prevState => {
      return {
        ...prevState,
        searchState: s
      }
    })

    if(router.pathname !== '/search') {
      router.replace("/search");
    }
  }

  const handleActiveListChild = (key: string) => {
    if(key === activeListChild) {
      setActiveListChild('')
    }else {
      setActiveListChild(key);
    }
    if(hideMenu) {
      hideMenu()
    }
  }

  const handleHidenMenu = () => {
    if(hideMenu) {
      hideMenu()
    }
  }

  return (<div className={!isMobile ? styles.categoryContent : styles.categoryMobile}>
    <ul className={styles.categoryList}>
      <li onClick={handleHidenMenu}>
        <Link href='/category'>Tất cả sản phẩm</Link>
      </li>

      {CATELOTYCONTEN.map((item, index) => {
        if(index >= 3) return;
        return (
          <li onClick={() => handleActiveListChild(item.key)} key={item.key}>
            <Link href={`/category/${item.productType}`}>{item.key}</Link>

            <ul className={styles.listChild}>
              {item.values.map((value) => (
                <li onClick={() => handleSetStateSearch(value)} key={value}>
                  <a>{value}</a>
                </li>
              ))}
            </ul>
          </li>
        )
      })}

      <li onClick={handleHidenMenu}>
        <Link href='/category/OTHER'>Khác</Link>

        <ul className={styles.listChild}>
          <li>
            ...
          </li>
        </ul>
      </li>
    </ul>
  </div>)
}

export default CatelotyConten;