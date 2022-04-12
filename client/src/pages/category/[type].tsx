import ShowProducts from "../../components/ShowProducts";
import { PRODUCT_TYPE } from "../../constants";
import { IProduct } from "../../datatypes";
import { getKeyProducts, getProducByType } from "../../lib/product";
import styles from './Category.module.css';

const paramsType = [
  'CLOTHES',
  'FOOTWEAR',
  'ACCESSORY',
  'OTHER',
  'POPULAR',
  'NEW-PRODUCT',
  'HOT-PRODUCT',
  'SUGGESTED',
]

interface ITypeProductProps {
  params: 'CLOTHES' | 'FOOTWEAR' | 'ACCESSORY' | 'OTHER' | 'POPULAR' | 'NEW-PRODUCT' | 'HOT-PRODUCT' | 'SUGGESTED';
  productType: IProduct[];
}

const key = [
  'POPULAR',
  'HOT-PRODUCT',
  'SUGGESTED'
]

function TypeProduct({params, productType}: ITypeProductProps) {
  return <div>
    <h2 className={styles.titleType}>{PRODUCT_TYPE[params]}:</h2>
    
    <ShowProducts products={productType} />
  </div>
}

export const getStaticPaths = async () => {
  const paths = paramsType.map((params) => ({params: {type: params}}))
    return {
      paths,
      fallback: false, 
    }
};

export const getStaticProps = async ({ params }: any) => {
  let result;

  if(key.some(value => value === params.type)) {
    result = await getKeyProducts(params.type.toLocaleLowerCase());
  }else if (params.type === 'NEW-PRODUCT') {
    result = await getKeyProducts();
  }else {
    result = await getProducByType(params.type);
  }

  return {
    props: {
      params: params.type,
      productType: result.data
    },
    revalidate: 1,
  };
}

export default TypeProduct;