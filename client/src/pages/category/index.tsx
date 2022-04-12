import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import ProductFilter from '../../components/ProductFilter';
import ShowProducts from '../../components/ShowProducts';
import { ARRANGE_PRODUCT, FILTER_TRADEMARK_SIZE, ITrademarkSize, PRICE_RANGE, PRODUCT_FILTER_ARRGANGE } from '../../constants';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { IProduct } from '../../datatypes';
import { getKeyProducts } from '../../lib/product';
import styles from './Category.module.css';

interface ICategoryProps {
  failure: boolean;
  productData: IProduct[];
}

export interface IProductFilterCatelogy {
  priceRange: string,
  trademarks: string[],
  sizes: string[],
  arrange: string
  products: IProduct[];
} 

function Category({failure, productData}: ICategoryProps) {
  const {showToast} = useContext(ToastifyContext);
  const [trademarkSize, setTrademarkSize] = useState<ITrademarkSize>({trademarks: [], sizes: []})
  const [showSelect, setShowSelect] = useState(false)

  // state filter
  const [productFilter, setProductFilter] = useState<IProductFilterCatelogy>({
    priceRange: PRICE_RANGE[5].title,
    trademarks: [],
    sizes: [],
    arrange: 'Mới nhất',
    products: []
  })

  useEffect(() => {
    if(failure) {
      showToast('Server đang lỗi!', 'error')
    }
  }, [failure])

  useEffect(() => {
    setTrademarkSize(FILTER_TRADEMARK_SIZE(productData));
  }, [productData])

  // xử lý filter
  useEffect(() => {
    const fetchResponse = async () => {
      const responseProductNew = await getKeyProducts();
      
      const productArrange = PRODUCT_FILTER_ARRGANGE(responseProductNew.data, productFilter.arrange);
      const newProductFilter: IProduct[] = [];
      productArrange.forEach(product => {
        let isPriceRange = false;
        let  isTrademarks = false;
        let  isSizes = false;

        // filter PriceRange
        if(!productFilter.priceRange || PRICE_RANGE[5].title === productFilter.priceRange) {
          isPriceRange = true;
        }else {
          PRICE_RANGE.forEach(price => {
            if(price.title === productFilter.priceRange) {
              if(product.price >= price.from && product.price <= price.to) {
                isPriceRange = true;
              }
            }
          })
        }

        // filter Trademarks
        if(productFilter.trademarks.length === 0) {
          isTrademarks = true;
        }else {
          productFilter.trademarks.forEach(trademark => {
            if(product.trademark === trademark) {
              isTrademarks = true;
            }
          })
        }

        // filter Sizes
        if(productFilter.sizes.length === 0) {
          isSizes = true;
        }else {
          productFilter.sizes.forEach(size => {
            product.sizes.forEach(productSize => {
              if(productSize.size.toLocaleUpperCase() === size.toLocaleUpperCase()) {
                isSizes = true;
              }
            })
          })
        }

        if(isPriceRange && isTrademarks && isSizes) {
          newProductFilter.push(product);
        }
      })

      setProductFilter({
        ...productFilter,
        products: newProductFilter
      })
    }

    fetchResponse();
  }, [productFilter.arrange, productFilter.trademarks, productFilter.priceRange, productFilter.sizes])

  const handleSetArrange = (arrange: string) => {
    setProductFilter({
      ...productFilter,
      arrange: arrange
    });
    setShowSelect(false)
  }

  return (<>
    <Head>
      <title>NQT Shop</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className='row'>
      <div className='c-0 m-0 l-3'>
        <ProductFilter 
          productFilter={productFilter} 
          setProductFilter={setProductFilter} 
          trademarkSize={trademarkSize} 
        />
      </div>

      <div className='c-12 m-12 l-9'>
        <div className={styles.wrapperHeader}>
          <h1>Tất cả sản phẩm</h1>

          <div className={styles.wrapperSelect}>
            <div 
              onClick={() => setShowSelect(!showSelect)} 
              className={`${styles.select} ${showSelect ? styles.selectShow : ''}`}
            >
              <span>Sắp xếp theo:</span>
              {showSelect ? <FaCaretRight /> : <FaCaretDown />}
            </div>

            <div className={`${styles.wrapperList} ${showSelect ? styles.showWrapperList : ''}`}>
              <div 
                className={`${styles.item} ${productFilter.arrange === ARRANGE_PRODUCT['priceAscending'] ? styles.itemActive : ''}`}
                onClick={() => handleSetArrange(ARRANGE_PRODUCT['priceAscending'])}
              >
                {ARRANGE_PRODUCT['priceAscending']}
              </div>
              <div 
                className={`${styles.item} ${productFilter.arrange === ARRANGE_PRODUCT['priceDescending'] ? styles.itemActive : ''}`}
                onClick={() => handleSetArrange(ARRANGE_PRODUCT['priceDescending'])}
              >
                {ARRANGE_PRODUCT['priceDescending']}
              </div>
              <div 
                className={`${styles.item} ${productFilter.arrange === ARRANGE_PRODUCT['AToZ'] ? styles.itemActive : ''}`}
                onClick={() => handleSetArrange(ARRANGE_PRODUCT['AToZ'])}
              >
                {ARRANGE_PRODUCT['AToZ']}
              </div>
              <div 
                className={`${styles.item} ${productFilter.arrange === ARRANGE_PRODUCT['ZToA'] ? styles.itemActive : ''}`}
                onClick={() => handleSetArrange(ARRANGE_PRODUCT['ZToA'])}
              >
                {ARRANGE_PRODUCT['ZToA']}
              </div>
              <div 
                className={`${styles.item} ${productFilter.arrange === ARRANGE_PRODUCT['oldest'] ? styles.itemActive : ''}`}
                onClick={() => handleSetArrange(ARRANGE_PRODUCT['oldest'])}
              >
                {ARRANGE_PRODUCT['oldest']}
              </div>
              <div 
                className={`${styles.item} ${productFilter.arrange === ARRANGE_PRODUCT['newest'] ? styles.itemActive : ''}`}
                onClick={() => handleSetArrange(ARRANGE_PRODUCT['newest'])}
              >
                {ARRANGE_PRODUCT['newest']}
              </div>
              <div 
                className={`${styles.item} ${productFilter.arrange === ARRANGE_PRODUCT['bestProduct'] ? styles.itemActive : ''}`}
                onClick={() => handleSetArrange(ARRANGE_PRODUCT['bestProduct'])}
              >
                {ARRANGE_PRODUCT['bestProduct']}
              </div>
            </div>
          </div>
        </div>

        <ShowProducts products={productFilter.products} />
      </div>
    </div>
  </>)
}

export const getServerSideProps = async () => {
  const responseProductNew = await getKeyProducts();

  if(!responseProductNew.success) {
    return {
      props: {
        failure: true,
      }
    };
  }
  return {
    props: {
      productData: responseProductNew.data,
    }
  };
}


export default Category;