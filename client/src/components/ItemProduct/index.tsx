import { useContext, useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { API, FOTMAT_CURRENCY } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { MoadalContext } from '../../contexts/ModalContext';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { NavLink } from '../../custom-link';
import { IProduct } from '../../datatypes';
import { addCartProduct } from '../../lib/product';
import stylesItemNews from '../ItemNews/ItemNews.module.css';
import AddCart from '../Modal/AddCart';
import ModalDetailProduct from '../Modal/ModalDetailProduct';
import RatingsStar from '../RatingsStar';
import styles from './ItemProduct.module.css';

interface IItemProductProps {
    product: IProduct;
}

function ItemProduct({product}: IItemProductProps) {

    const {authState: {user}} = useContext(AuthContext);
    const {showModal} = useContext(MoadalContext);
    const {showToast} = useContext(ToastifyContext);
    const [likeCart, setLikeCart] = useState({
        like: product.likes.some(like => user?._id === like),
        cart: product.cart?.some(cart => cart.idUser === user?._id)
    })

    const handleSetLikeCart = (likeOrCart: 'like' | 'cart', value: boolean) => {
        setLikeCart({
            ...likeCart,
            [likeOrCart]: value
        })
    }

    useEffect(() => {
        setLikeCart({
            like: product.likes.some(like => user?._id === like),
            cart: product.cart?.some(cart => cart.idUser === user?._id)
        })
    }, [user])


    const modalShowProduct = () => {
        showModal({
            title: product.name,
            showModal: true,
            component: <ModalDetailProduct likeCart={likeCart} handleSetLikeCartItem={handleSetLikeCart} product={product} />
        });
    }

    const handleAddCart = async () => {
        if(!likeCart.cart) {
            if(product.sizes[0].size === "Not-Found") {
                const response = await addCartProduct(product._id, "Not-Found");
                if(response.success) {
                    showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
                    setLikeCart({
                        ...likeCart,
                        cart: true,
                    })
                }else {
                    showToast('Thêm sản phẩm vào giỏ hàng thất bại!', 'error')
                }
            }else {
                showModal({
                    title: product.name,
                    showModal: true,
                    component: <AddCart handleSetLikeCart={handleSetLikeCart} product={product} />
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

    return (<div className={`c-12 m-6 l-3`}>
        <div className={styles.wrapper}> 
            <NavLink href={`/${product.name.replace(/\/?/g, '').replace(/\?/g, '').replace(/ /g, '-')}.${product._id}`}>
                <div>
                    <div 
                        className={stylesItemNews.itemImg} 
                        style={{
                            backgroundImage:  `url(${API}/images/${product.nameImgs[0]})`,
                            position: 'relative'
                        }}>
                        <div 
                            className={styles.saleOff} 
                            style={{
                                display: product.discount <= 0 ? 'none' : 'flex'
                            }}
                        >
                            <span className={styles.saleOffPercent}>{`${product.discount}%`}</span>
                            <span className={styles.saleOffLabel}>GIẢM</span>
                        </div>
                    </div>
                    
                    <h2 className={styles.title}>{product.name}</h2>

                    <div className={styles.wrapperPrice}>
                        <p className={styles.originalPrice}>
                            {product.discount <= 0 ? '' : `${FOTMAT_CURRENCY(product.price)} đ`}
                        </p>
                        <p className={styles.promotionalPrice}>
                            {product.discount > 0 ? `${FOTMAT_CURRENCY(product.price - (product.price / 100 * product.discount))} đ` : `${FOTMAT_CURRENCY(product.price)} đ`}
                        </p>
                    </div>

                    <div className={styles.wrapperPrice} style={{margin: '0 18px 8px 18px'}}>
                        <div>
                            <FaHeart color={likeCart.like ? '#d63d30' : '#999'}/>

                            <p className={styles.sold}>{`${product.purchases} đã bán`}</p>
                        </div>
                        
                        <div style={{textAlign: 'right'}}>
                            <RatingsStar evaluates={product.evaluates ? product.evaluates : []} />

                            <p style={{display: product.evaluates?.length === 0 ? 'block' : 'none'}} className={styles.sold}>Chưa có đánh giá</p>
                        </div>
                    </div>
                </div>
            </NavLink>

            <div className={styles.wrapperIcon}>
                <span onClick={handleAddCart} className={styles.icon}>
                    <FaCartPlus size={20}/>
                </span>
                <span className={styles.icon}>
                    <BiCommentDetail onClick={modalShowProduct} size={20}/>
                </span>
            </div>
        </div>
    </div>)
}

export default ItemProduct;