import styles from './ItemPopularProducts.module.css';
import stylesItemNews from '../ItemNews/ItemNews.module.css';
import stylesAuth from '../../styles/Auth.module.css';
import { FaArrowRight } from 'react-icons/fa';
import { IProduct } from '../../datatypes';
import { API } from '../../constants';
import { NavLink } from '../../custom-link';

interface IItemPopularProductsProps {
    product: IProduct;
} 

function ItemPopularProducts({product}: IItemPopularProductsProps) {
    return (<div className={`c-12 m-6 l-6`}>
        <div className={styles.wrapper}>
            <div className={stylesItemNews.itemImg} style={{backgroundImage:  `url(${API}/images/${product.nameImgs[0]})`}} />

            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.description}>{product.description.description ? product.description.description : product.description.parameter}</p>

            <NavLink href={`/${product.name.replace(/\/?/g, '').replace(/\?/g, '').replace(/ /g, '-')}.${product._id}`}>
                <button className={`${stylesAuth.button} ${styles.btn}`}>
                    Xem Ngay
                    <FaArrowRight />
                </button>
            </NavLink>
        </div>
    </div>)
}

export default ItemPopularProducts;