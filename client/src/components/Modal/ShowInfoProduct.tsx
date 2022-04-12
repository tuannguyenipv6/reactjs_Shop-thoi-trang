import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { FaHeart, FaMinus, FaPlus } from 'react-icons/fa';
import { FOTMAT_CURRENCY, PRODUCT_TYPE } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { MoadalContext } from '../../contexts/ModalContext';
import { PayContext } from '../../contexts/PayContext';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { IProduct, IProductCart } from '../../datatypes';
import { addCartProduct, updateLikeProduct } from '../../lib/product';
import stylesAuth from '../../styles/Auth.module.css';
import AddCart from './AddCart';
import styles from './Modal.module.css';
import ModalRegisterQuestion from './ModalRegisterQuestion';

interface IShowInfoProduct {
  product: IProduct;
  isModal?: boolean;
  handleSetLikeCartItem: (likeOrCart: 'like' | 'cart', value: boolean) => void;
  likeCart: {
    like: boolean;
    cart: boolean | undefined;
  }
}

const ShowInfoProduct = ({product, isModal, handleSetLikeCartItem, likeCart}: IShowInfoProduct) => {
  const {authState: {user}} = useContext(AuthContext);
  const {showModal, hidenModal} = useContext(MoadalContext);
  const {showToast} = useContext(ToastifyContext);
  const [isHeart, setIsHeart] = useState(likeCart.like);

  const [sizeCount, setSizeCount] = useState({
    size: "Not-Found",
    count: 1
  })

  const handleHeart = async () => {
    if(user) {
      const response = await updateLikeProduct(product._id);
      if(response.success) {
        showToast(`${response.delete ? 'Đã bỏ thích sản phẩm!' : 'Đã thích sản phẩm'}`, 'info')

        handleSetLikeCartItem('like', !response.delete)
        setIsHeart(!response.delete)
      }else {
        showToast('Không thể thay đổi trạng thái!', 'error')
      }
    }else {
      showModal({
        title: 'Thông báo!',
        showModal: true,
        component: <ModalRegisterQuestion 
          description={{
            title: "Bạn chưa đăng nhập tài khoản",
            content: "Hãy đăng ký hoặc dùng tài khoản của bạn để sử dụng các dịch vụ của chúng tôi!. Bạn đã có tài khoản?"
          }}
        />
      });
    }
  }

  const handleAddCart = async () => {
    if(!likeCart.cart) {
      if(product.sizes[0].size === "Not-Found") {
          const response = await addCartProduct(product._id, "Not-Found");
          if(response.success) {
            showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success')
            // handleSetLikeCart('cart', true)
            handleSetLikeCartItem('cart', true)
          }else {
            showToast('Thêm sản phẩm vào giỏ hàng thất bại!', 'error')
          }
      }else {
        showModal({
          title: product.name,
          showModal: true,
          component: <AddCart handleSetLikeCart={handleSetLikeCartItem} product={product} />
        });
      }
    }else {
      showModal({
        title: "Thông báo",
        showModal: true,
        component: <h3>Sản phẩm đã có trong giỏ hàng!</h3>
      });
    }
}

  const handleCheckStatus = (): string => {
    const status = product.sizes?.reduce((sum, size) => {
      return sum + size.status
    }, 0)
    
    if(status > 0) {
      return 'Còn hàng';
    }else {
      return 'Hết hàng'
    }
  }

  const {setPayProducts} = useContext(PayContext);
  const router = useRouter()

  const buyNow = () => {
    const productCart: IProductCart = {
      ...product,
      cart: [{
        idUser: user?._id,
        size: sizeCount.size
        }],
      checked: true,
      amount: sizeCount.count
    }

    setPayProducts([productCart]);
    hidenModal()
    router.replace("/pay");
  }

  const handleBuyNow = async () => {
    if(product.sizes[0].size === 'Not-Found') {
      buyNow()
    }else {
      if(sizeCount.size === 'Not-Found') {
        showToast('Chưa chọn kích thước!', 'warning')
      }else {
        buyNow()
      }
    }
  }

  return (<div className={isModal ? styles.wrapperProduct : ''}>
      <p>
        {'Trạng thái: '}
        <b>{handleCheckStatus()}</b>
      </p>

      <p>
        {'Loại sản phẩm: '}
        <b>{PRODUCT_TYPE[product.productType]}</b>
      </p>

      <p>
        {'Thương hiệu: '}
        <b>{product.trademark}</b>
      </p>

      <p style={{color: '#d80202'}}>{product.discount > 0 ? `${FOTMAT_CURRENCY(product.price - (product.price / 100 * product.discount))}đ` : `${FOTMAT_CURRENCY(product.price)}đ`}</p>
      {
        product.discount === 0 
        ? null 
        : <p style={{color: '#999'}}>{`Giá gốc: ${FOTMAT_CURRENCY(product.price)}đ (${product.discount}%)`}</p>
      }

      {
        isModal
        ? (<p className={styles.description}>
            {
            product.description.description 
            ? product.description.description
            : product.description.parameter
            }  
        </p>)
        : null
      }

      <p className={styles.wrapperSize}>
        { product.sizes[0].size === 'Not-Found' ? null : 'Kích thước: '}
        {
          product.sizes[0].size === 'Not-Found' ? null :
          product.sizes.map(size => {
            return (
              <span 
                key={size.size}
                className={`${styles.size} ${size.status === 0 ? styles.sizeHiden : ''} ${sizeCount.size === size.size ? styles.sizeActive : ''}`}
                onClick={() => setSizeCount(prev => {
                  if(size.status === 0) {
                    return prev;
                  }
                  return ({...prev, size: size.size})
                })}
              >
                {size.size.toLocaleUpperCase()}
              </span>
            )
          })
        }
      </p>

      <div className={styles.wrapperCart}>
        <p className={styles.wrapperSize}>
          {'Số lượng: '}

          <span onClick={() => setSizeCount(prev => {
            if(prev.count === 1) return prev
            return {...prev, count: prev.count - 1}
          })} className={styles.size}><FaMinus /></span>

          <span className={styles.quantity}>{sizeCount.count}</span>

          <span onClick={() => setSizeCount(prev => ({...prev, count: prev.count + 1}))} className={styles.size}><FaPlus /></span>
        </p>

        <div style={{display: isModal ? 'none' : 'block', margin: '0 6%', userSelect: "none"}}>
            <button onClick={handleAddCart} type='button' className={`${stylesAuth.button} ${styles.btn}`}>
              Thêm vào giỏ hàng
            </button>
        </div>
      </div>

      <div className={styles.wrapperBtn}>
        <button onClick={handleBuyNow} type='button' className={`${stylesAuth.button} ${styles.btn}`}>
          Mua Ngay
        </button>

        <FaHeart size={30} color={isHeart ? '#d63d30' : '#999'} onClick={handleHeart} />
      </div>
    </div>)
}

export default ShowInfoProduct;