import { useState } from 'react';
import { API, FOTMAT_CURRENCY, LINK_PRODUCT } from '../../constants';
import { NavLink } from '../../custom-link';
import { IOder } from '../../datatypes';
import styles from './Oder.module.css';

interface ItemOderProps {
    oder: IOder;
}

function ItemOder({oder}: ItemOderProps) {
    const [showAll, setShowAll] = useState(false)
    
    return (<div className={styles.wrapper}>
    <div className={styles.wrapperAllItem}>
        {
            showAll ? 
            oder.productOder.map(product => (
                <div key={product.idProduct} className={styles.wrapperInfoProduct}>
                    <img className={styles.img} src={`${API}/images/${product.img}`} />

                    <NavLink href={LINK_PRODUCT(product.name, product.idProduct)}>
                        <h4 className={styles.nameProduct}>
                            {`${product.name} x${product.amount}`}
                        </h4>
                    </NavLink>

                    <p className={styles.priceProduct}>{FOTMAT_CURRENCY(product.price * product.amount)}đ</p>
                </div>
            ))
            :  <div className={styles.wrapperInfoProduct}>
                <img className={styles.img} src={`${API}/images/${oder.productOder[0].img}`} />

                <NavLink href={LINK_PRODUCT(oder.productOder[0].name, oder.productOder[0].idProduct)}>
                    <h4 className={styles.nameProduct}>
                        {`${oder.productOder[0].name} x${oder.productOder[0].amount}`}
                    </h4>
                </NavLink>
                
                <p className={styles.priceProduct}>{FOTMAT_CURRENCY(oder.productOder[0].price * oder.productOder[0].amount)}đ</p>
            </div>
        }

        {
            oder.productOder.length > 1 && !showAll ? <span onClick={() => setShowAll(true)} className={styles.seeMore}>Xem thêm...</span>
            : oder.productOder.length > 1 ? <span onClick={() => setShowAll(false)} className={styles.seeMore}>Ẩn bớt...</span> : ''
        }
    </div>

    <div className={styles.wrapperInfo}>
        <p>{oder.name}</p>
        <p>{oder.address}</p>
        <p>{oder.phoneNumber}</p>
    </div>
</div>)
}

export default ItemOder