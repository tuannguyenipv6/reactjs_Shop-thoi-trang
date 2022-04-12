import { useContext } from "react";
import { MoadalContext } from "../../contexts/ModalContext";
import { ToastifyContext } from "../../contexts/ToastifyContext";
import { IProduct } from "../../datatypes";
import { addCartProduct } from "../../lib/product";
import styles from './Modal.module.css';

interface IAddCartProps {
  product: IProduct;
  // handleSetLikeCart: (likeOrCart: 'like' | 'cart', value: boolean) => void;
  handleSetLikeCart: ((likeOrCart: 'like' | 'cart', value: boolean) => void) | undefined
}

function AddCart({product, handleSetLikeCart}: IAddCartProps) {

    const {hidenModal} = useContext(MoadalContext);
    const {showToast} = useContext(ToastifyContext);

    const handleAddCart = async (size: string) => {
      const response = await addCartProduct(product._id, size);
      if(response.success) {
        hidenModal();
        showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
        if(handleSetLikeCart) {
          handleSetLikeCart('cart', true);
        }
      }else {
        showToast('Thêm sản phẩm vào giỏ hàng thất bại!', 'error')
      }
    }

    return <div className={styles.wrapperAddCart}>
        <h3 style={{display: 'flex', justifyContent: 'center'}}>Vui lòng chọn kích thước!</h3>
        <p className={styles.wrapperSize}>
        { product.sizes[0].size === 'Not-Found' ? null : 'Kích thước: '}
        {
          product.sizes[0].size === 'Not-Found' ? null :
          product.sizes.map(size => {
            return (
              <span 
                key={size.size}
                className={`${styles.size} ${size.status === 0 ? styles.sizeHiden : ''}`}
                onClick={() => handleAddCart(size.size)}
              >
                {size.size.toLocaleUpperCase()}
              </span>
            )
          })
        }
      </p>
    </div>
}

export default AddCart;