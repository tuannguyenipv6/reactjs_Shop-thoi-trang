import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API, LINK_PRODUCT } from '../../constants';
import { ISlider } from '../../datatypes';
import { getProducOrNews } from '../../lib';
import styles from './Slider.module.css';

interface ISliderProps {
    logoShop: string;
    sliders: ISlider[];
}

function Slider({logoShop, sliders}: ISliderProps) {
    const router = useRouter();
    const [slide, setSlider] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlider(prev => {
                if(prev === (-80)) return 0;
                return prev + (-20);
            })
        }, 5000);

        return () => clearInterval(timer);
    }, [])
    
    const handleLinkSlder = async (slider: ISlider) => {
        if(slider.isProduct !== undefined && slider.idKey !== undefined) {
            const response = await getProducOrNews(slider.idKey, slider.isProduct);
            if(response.success) {
                if(slider.isProduct) {
                    // product
                    const link = LINK_PRODUCT(response.data.name, response.data._id)
                    router.replace(link);
                }else {
                    const link = LINK_PRODUCT(response.data.values[0].value, response.data._id)
                    router.replace(`news/${link}`);
                    // news
                }
            }
        }
    }

    return <div className={styles.wrapperSlider}>
        <div className={styles.sliders}>
            {
                sliders.map((slider, index) => {
                    if(index >= 5) {
                        return;
                    }
                    return (
                        <div key={slider._id} className={styles.slider} style={{marginLeft: index === 0 ? `${slide}%` : ''}}>
                            <img className={styles.img} src={`${API}/images/${slider.img}`} alt='Ảnh' />
                            <div className={styles.des}>
                                <div className={styles.logo}>
                                    <img src={`${API}/images/${logoShop}`} alt="Shop NQT" />
                                </div>
                                <h3 className={styles.desTitle}>{slider.title}</h3>
                                <p className={styles.desDes}>{slider.name}</p>
                                <span className={styles.desConten}>{slider.description}</span>
    
                                {
                                    slider.idKey || slider.idKey === 0 ? 
                                    <button onClick={() => handleLinkSlder(slider)} className={styles.desBtn}>Xem chi tiết</button> : ''
                                }
                            </div>
                        </div>
                    )
                })
            }
            {/* <div className={styles.slider}>
                <img className={styles.img} src={`${API}/images/dongho1.jpg`} alt='Ảnh' />
                <div className={styles.des}>
                    <div className={styles.logo}>
                        <img src={`${API}/images/${logoShop}`} alt="Shop NQT" />
                    </div>
                    <h3 className={styles.desTitle}>ĐỒNG HỒ JACQUES LEMANS JL-11-1654.2ZD</h3>
                    <p className={styles.desDes}>Thương hiệu: Đồng hồ Jacques Lemans</p>
                    <span className={styles.desConten}>Giá khuyến mãi ưu đãi 5%</span>

                    <button className={styles.desBtn}>Xem chi tiết</button>
                </div>
            </div>

            <div className={styles.slider}>
                <img className={styles.img} src={`${API}/images/Adidas-Predator-1.jpg`} alt='Ảnh' />
                <div className={styles.des}>
                    <div className={styles.logo}>
                        <img src={`${API}/images/${logoShop}`} alt="Shop NQT" />
                    </div>
                    <h3 className={styles.desTitle}>GDB ADIDAS PREDATOR 20.3 ĐEN VẠCH HỒNG CỔ LỬNG TF</h3>
                    <p className={styles.desDes}>Thương hiệu: PREDATOR</p>
                    <span className={styles.desConten}>Giá khuyến mãi cực ưu đãi 20%</span>

                    <button className={styles.desBtn}>Xem chi tiết</button>
                </div>
            </div>

            <div className={styles.slider}>
                <img className={styles.img} src={`${API}/images/giaynikecam.jpg`} alt='Ảnh' />
                <div className={styles.des}>
                    <div className={styles.logo}>
                        <img src={`${API}/images/${logoShop}`} alt="Shop NQT" />
                    </div>
                    <h3 className={styles.desTitle}>NIKE MERCURIAL SUPERFLY 8 ACADEMY TF</h3>
                    <p className={styles.desDes}>Thương hiệu: NIKE</p>
                    <span className={styles.desConten}>Giá khuyến mãi ưu đãi 10%</span>

                    <button className={styles.desBtn}>Xem chi tiết</button>
                </div>
            </div>

            <div className={styles.slider}>
                <img className={styles.img} src={`${API}/images/welcome-to-our-shop.jpg`} alt='Ảnh' />
                <div className={styles.des}>
                    <div className={styles.logo}>
                        <img src={`${API}/images/${logoShop}`} alt="Shop NQT" />
                    </div>
                    <h3 className={styles.desTitle}>WELCOM TO BY SHOP NQT</h3>
                    <p className={styles.desDes}>Theo dõi blog của Shop NQT</p>
                    <span className={styles.desConten}>Cơ sở 1: 1 Phạm Văn Đồng, Gò Vấp, TP. HCM</span>

                    <button className={styles.desBtn}>Xem chi tiết</button>
                </div>
            </div> */}
        </div>

        <div className={styles.navigation}>
            <button onClick={() => setSlider(0)} className={`${styles.naviBtn} ${slide === 0 ? styles.btnActive : ''}`}></button>
            <button onClick={() => setSlider(-20)} className={`${styles.naviBtn} ${slide === -20 ? styles.btnActive : ''}`}></button>
            <button onClick={() => setSlider(-40)} className={`${styles.naviBtn} ${slide === -40 ? styles.btnActive : ''}`}></button>
            <button onClick={() => setSlider(-60)} className={`${styles.naviBtn} ${slide === -60 ? styles.btnActive : ''}`}></button>
            <button onClick={() => setSlider(-80)} className={`${styles.naviBtn} ${slide === -80 ? styles.btnActive : ''}`}></button>
        </div>
    </div>
}

export default Slider;