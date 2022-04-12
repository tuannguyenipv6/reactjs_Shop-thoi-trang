import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { API, POLICYS } from '../../constants';
import { Info } from '../../constants/dataDefault';
import { NavLink } from '../../custom-link';
import InfoShop from '../InfoShop';
import styles from './Footer.module.css';
// import Image from 'next/image';

interface IFooterProps {
    infoShop: Info
}

function Footer({infoShop}: IFooterProps) {
    return (<div className={styles.footer}>
        <div className={styles.footerConten}>
            <div className={styles.contact}>
                <NavLink href='/'>
                    <div>
                        {/* <Image
                            // loader={myLoader}
                            src="/ShopNQT.png"
                            alt="Shop NQT"
                            width={85}
                            height={85}
                        /> */}
                        <img src={infoShop.NameLogo ? `${API}/images/${infoShop.NameLogo}` : '/icon/ShopNQT.png'} alt="Shop NQT" />
                    </div>
                </NavLink>

                <InfoShop infoShop={infoShop} />
                
                <div className={styles.iconSocial}>
                    <a href={infoShop.LinkFacebook ? infoShop.LinkFacebook : 'https://www.facebook.com'}><FaFacebook className={'ic-blue'} /></a>
                    <a href={infoShop.LinkInstagram ? infoShop.LinkInstagram : 'https://www.instagram.com'}><FaInstagram className={'ic-red'} /></a>
                    <a href={infoShop.LinkYoutobe ? infoShop.LinkYoutobe : 'https://www.youtube.com'}><FaYoutube className={'ic-red'} /></a>
                    <a href={infoShop.LinkTwitter ? infoShop.LinkTwitter : 'https://twitter.com'}><FaTwitter className={'ic-blue'} /></a>
                </div>
            </div>

            <div className={styles.infoShop}>
                <h3>CHÍNH SÁCH</h3>

                <Link href={`/policy/${POLICYS[0]}`}>Chính sách bảo hành</Link>
                <Link href={`/policy/${POLICYS[1]}`}>Chính sách đổi trả</Link>
                <Link href={`/policy/${POLICYS[2]}`}>Chính sách thanh toán</Link>
                <Link href={`/policy/${POLICYS[3]}`}>Chính sách bảo mật</Link>
            </div>

            <div className={styles.infoShop}>
                <h3>HỖ TRỢ CHUNG</h3>

                <Link href='/'>Trang chủ</Link>
                <Link href='/intro'>Giới thiệu</Link>
                <Link href='/category'>Sản phẩm</Link>
                <Link href='/contact'>Liên hệ</Link>
            </div>

            <div className={styles.infoShop}>
                <h3>THÔNG TIN CỦA CHÚNG TÔI</h3>

                <p>{`Cơ sở 1: ${infoShop.StoreI ? infoShop.StoreI : 'Chưa có'}`}</p>
                <p>{`Cơ sở 2: ${infoShop.StoreII ? infoShop.StoreII : 'Chưa có'}`}</p>
            </div>
        </div>

        <div className={styles.footerBottom}>
            <span>© Bản quyền thuộc về P&T Shop | Cover by NQT Tuấn Nguyễn</span>
        </div>
    </div>)
}

export default Footer;