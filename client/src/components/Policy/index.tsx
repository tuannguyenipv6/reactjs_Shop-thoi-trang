import { POLICYS } from '../../constants';
import { NavLink } from '../../custom-link';
import styles from './Policy.module.css';

const policy = [
    {
        img: 'free_ship.webp',
        title: 'Miễn phí vận chuyển',
        des: 'Cho các đơn hàng...',
        link: POLICYS[4]
    },{
        img: '24h.webp',
        title: 'Hỗ trợ 24/7',
        des: 'Liên hệ hỗ trợ 24h/ngày',
        link: POLICYS[5]
    },{
        img: 'refunds.webp',
        title: 'Hoàn tiền 100%',
        des: 'Nếu sản phẩm bị lỗi hoặc hư hỏng',
        link: POLICYS[1]
    },{
        img: 'security.webp',
        title: 'Thanh toán',
        des: 'Được bảo mật 100%',
        link: POLICYS[2]
    }
]

function Policy() {
    return <div className={styles.wrapper}>
        {
            policy.map(plc => (
                <NavLink key={plc.title} href={`/policy/${plc.link}`}>
                    <div className={styles.wrapperItem}>
                        <img className={styles.img} src={`/icon/${plc.img}`} />
                        <div className={styles.itemConten}>
                            <b>{plc.title}</b>
                            <span>{plc.des}</span>
                        </div>
                    </div>
                </NavLink>
            ))
        }
    </div>
}

export default Policy;