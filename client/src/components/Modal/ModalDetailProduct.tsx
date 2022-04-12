import { useState } from 'react';
import { API } from '../../constants';
import { IProduct } from '../../datatypes';
import styles from './Modal.module.css';
import ShowInfoProduct from './ShowInfoProduct';

interface IModalDetailProduct {
  product: IProduct;
  handleSetLikeCartItem: (likeOrCart: 'like' | 'cart', value: boolean) => void;
  likeCart: {
    like: boolean;
    cart: boolean | undefined;
  }
}

const ModalDetailProduct = ({product, handleSetLikeCartItem, likeCart}: IModalDetailProduct) => {
  const [imgMain, setImgMain] = useState(product.nameImgs[0]);

  return (<div className={styles.wrapperDetailProduct}>
    <div className={styles.wrapperImg}>
      <img src={`${API}/images/${imgMain}`} className={styles.imgMain} />
      <div className={styles.wrapperImgChildren}>
        {
          product.nameImgs.map((img, index) => {
            if(index >= 4) return;
            return (
              <img 
                key={img}
                src={`${API}/images/${img}`}
                className={styles.img} 
                onClick={() => setImgMain(img)}
              />
            )
          })
        }
      </div>
    </div>

    <ShowInfoProduct likeCart={likeCart} handleSetLikeCartItem={handleSetLikeCartItem} product={product} isModal={true} />
  </div>)
}

export default ModalDetailProduct;