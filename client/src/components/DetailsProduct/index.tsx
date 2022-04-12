import { IProduct } from '../../datatypes';
import stylesItemProduct from '../ItemProduct/ItemProduct.module.css';
import ShowInfoProduct from '../Modal/ShowInfoProduct';
import styles from '../../styles/Home.module.css';
import { useContext, useState } from 'react';
import { API } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';

interface IDetailsProduct {
    product: IProduct;
}

function DetailsProduct({product}: IDetailsProduct) {
    const [imgMain, setImgMain] = useState(product.nameImgs[0])

    const {authState: {user}} = useContext(AuthContext);
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

    return (<>
        <div className='row'>
            <div className='c-12 m-6 l-6'>
                <div className={styles.wrapperImgs}>
                    <div className={styles.wrapperImg}>
                    {
                        product.nameImgs.map((img) => {
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

                    <div className={styles.wrapperImgMain}>
                        <img className={styles.imgMain} src={`${API}/images/${imgMain}`} alt="Ảnh sản phẩm" /> 
                        <div 
                            className={stylesItemProduct.saleOff} 
                            style={{
                                display: product.discount <= 0 ? 'none' : 'flex'
                            }}
                        >
                            <span className={stylesItemProduct.saleOffPercent}>{`${product.discount}%`}</span>
                            <span className={stylesItemProduct.saleOffLabel}>GIẢM</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='c-12 m-6 l-6'>
                <div className={styles.wrapperConten}>
                    <h1 className={styles.name}>
                        {product.name}
                    </h1>
                    <ShowInfoProduct likeCart={likeCart} handleSetLikeCartItem={handleSetLikeCart} product={product} />
                </div>
            </div>
        </div>

        <div className='row'>
            <div className='c-12 m-12 l-12'>
                <b className={styles.description}>Mô tả</b>
            </div>
        </div>

        <div className='row'>
            <div className='c-1 m-1 l-1'></div>
            <div className='c-11 m-11 l-11'>
                <h2 className={styles.titleDescription}>{product.name}</h2>
                {
                    product.description?.description ? 
                    <p className={styles.contenDescription}>{product.description.description}</p>
                    : null
                }

                <b className={styles.titleDescription}>
                    {
                        product.description.parameter 
                        ? product.description.parameter.length > 0 ? 'Thông số kỷ thuật' : '' 
                        : ''
                    }
                </b>

                {
                    product.description?.parameter ? 
                    product.description.parameter.map(param => (
                        <p key={param} className={styles.technicalData}>{param}</p>
                    ))
                    : null
                }
            </div>
        </div>
    </>)
}

export default DetailsProduct;