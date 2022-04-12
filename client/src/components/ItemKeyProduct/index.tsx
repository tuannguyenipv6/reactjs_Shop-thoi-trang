import Link from 'next/link';
import { KEY_PRODUCT, PRODUCT_TYPE, PRODUCT_TYPE_INVERSE } from '../../constants';
import { IProduct } from '../../datatypes';
import ItemPopularProducts from '../ItemPopularProducts';
import ItemProduct from '../ItemProduct';
import styles from './ItemKeyProduct.module.css';

interface IItemKeyProduct {
    title: "SẢN PHẨM PHỔ BIẾN" | "SẢN PHẨM MỚI" | "TOP SẢN PHẨM HOT" | "CÓ THỂ BẠN SẼ THÍCH" | PRODUCT_TYPE;
    products: IProduct[];
}

function ItemKeyProduct({title, products}: IItemKeyProduct) {
    return (<div className={styles.wrapper}>
        <Link href={`/category/${PRODUCT_TYPE_INVERSE[title]}`}>
            <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={`row`}>
            {
                title === KEY_PRODUCT[0] 
                ? products.map((product, index) => {
                    if(index > 1) return;
                    return <ItemPopularProducts key={product._id} product={product} />
                })
                : products.map((product, index) => {
                    if(index > 3) return;
                    return <ItemProduct key={product._id} product={product} />
                })
            }
        </div>
    </div>)
}

export default ItemKeyProduct;