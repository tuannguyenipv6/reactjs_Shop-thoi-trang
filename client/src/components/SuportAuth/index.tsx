import { FaCheck } from 'react-icons/fa';
import styles from '../../styles/Auth.module.css';

const listDecription = [
    'Thanh toán đơn hàng',
    'Lưu trữ các đơn hàng yêu thích',
    'Tổng quan đơn giản về thông tin cá nhân của bạn',
    'Và các sự kiện khác...',
    'Một lần đăng nhập chung duy nhất để tương tác với các sản phẩm và dịch vụ của NQT Shop.',
]

function SupportAuth() {
    return (<>
        <h2 className={styles.title}>SỬ DỤNG TÀI KHOẢN</h2>
        <p>
            Thật dễ dàng tạo một tài khoản.
            Sử dụng tài khoản giúp bạn thao tác được với các chức năng trong Shop hãy sử dụng 
            tài khoản của bạn và tận hưởng những lợi ích của việc sở hữu một tài khoản:
        </p>

        <ul className={styles.descriptionList}>
            {listDecription.map(description => (
                <li key={description}>
                    <FaCheck />
                    <p>
                        {description}
                    </p>
                </li>
            ))}
        </ul>
    </>)
}
export default SupportAuth;