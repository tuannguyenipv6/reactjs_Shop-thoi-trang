import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import ItemKeyProduct from '../components/ItemKeyProduct';
import ItemNews from '../components/ItemNews';
import Policy from '../components/Policy';
import Slider from '../components/Slider';
import { KEY_PRODUCT } from '../constants';
import { ToastifyContext } from '../contexts/ToastifyContext';
import { NavLink } from '../custom-link';
import { IProduct, ISlider, News } from '../datatypes';
import { getAllSlider, getInfoShopByKey, getNews } from '../lib';
import { getKeyProducts } from '../lib/product';
import styles from '../styles/Home.module.css';
// import Loading from '../components/Loading';

interface IHomeProps {
  logoShop: string;
  failure: boolean;
  productPopulator: IProduct[];
  productNew: IProduct[];
  productHot: IProduct[];
  productSuggested: IProduct[];
  news: News[];
  sliders: ISlider[];
}

function Home({logoShop, failure, productPopulator, productNew, productHot, productSuggested, news, sliders}: IHomeProps) {

  const {showToast} = useContext(ToastifyContext);

  useEffect(() => {
    if(failure) {
      showToast('Server đang lỗi!', 'error')
    }
  }, [failure])

  const allKeyProduct: IProduct[][] = [
    productPopulator ? productPopulator : [],
    productNew ? productNew : [],
    productHot ? productHot : [],
    productSuggested ? productSuggested : [],
  ]

  return (<>
    <Head>
      <title>NQT Shop</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
      <link href="https://fonts.googleapis.com/css2?family=Francois+One&family=Oswald:wght@300&family=Pushster&display=swap" rel="stylesheet" />
    </Head>

    <div className={styles.wrapperSlide}>
      <Slider sliders={sliders} logoShop={logoShop} />
    </div>
    
    {
      KEY_PRODUCT.map((key, index) => {
        if(KEY_PRODUCT[3] === key) {
          return <div key={key}>
            <Policy />
            <ItemKeyProduct title={key} products={allKeyProduct[index]} />
          </div>
        }
        return (
          <ItemKeyProduct key={key} title={key} products={allKeyProduct[index]} />
        )
      })
    }

    <h3 className={styles.titleNews}>TIN TỨC</h3>
    <div className='row'>
      {
        news?.map((value, index) => {
          if(index >= 3) return;
          return (
            <NavLink key={value._id} href={`/news/${value.title.replace(/\?/g, '').replace(/ /g, '-')}.${value._id}`}>
              <div className={`c-12 m-4 l-4`}>
                <ItemNews news={value} />
              </div>
            </NavLink>
          )
        })
      }
    </div>
    <Link href='/news'>
      <b className={styles.btnNews}>Xem tất cả</b>
    </Link>
  </>)
}

export const getServerSideProps = async () => {
  const responseNameLogo = await getInfoShopByKey('NameLogo'); 
  const responsePopularProduct = await getKeyProducts('popular');
  const responseProductNew = await getKeyProducts();
  const responseProductHot = await getKeyProducts('hot-product');
  const responseProductSuggested = await getKeyProducts('suggested');
  const responseNews = await getNews();
  const responseSlider = await getAllSlider()

  if(
    !responseNameLogo.success ||
    !responsePopularProduct.success ||
    !responseProductNew.success ||
    !responseProductHot.success ||
    !responseProductSuggested.success ||
    !responseNews.success || 
    !responseSlider.success 
  ) {
    return {
      props: {
        failure: true,
      }
    };
  }

  return {
    props: {
      logoShop: responseNameLogo.infoShop.value,
      productPopulator: responsePopularProduct.data,
      productNew: responseProductNew.data,
      productHot: responseProductHot.data,
      productSuggested: responseProductSuggested.data,
      news: responseNews.data,
      sliders: responseSlider.data
    }
  };
}


export default Home;