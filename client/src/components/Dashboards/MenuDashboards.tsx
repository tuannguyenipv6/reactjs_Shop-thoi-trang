import { useContext } from 'react';
import { FaFacebookMessenger, FaShoppingCart } from 'react-icons/fa';
import { API } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { DashboardsContext } from '../../contexts/DashboardsContext';
import { NavLink } from '../../custom-link';
import styles from './Dashboards.module.css';

function MenuDashboards() {
    const {dashboardsState: {logo}} = useContext(DashboardsContext);
    const {authState: {user}} = useContext(AuthContext)

    return <div className={styles.wrapper}>
        <NavLink href='/'>
            <img className={styles.img} src={`${API}/images/${logo}`} />
        </NavLink>

        <div className={styles.wrapperAvatar}>
            <img className={styles.imgAvatar} src={`${API}/images/${user?.img}`} />

            <div className={styles.infoAdmin}>
                <b>{user?.name}</b>
                <span>admin</span>
            </div>
        </div>

        <b>GENERAL</b>

        <div className={`${styles.wrapperItem} ${styles.wrapperItemActive}`}>
            <div className={styles.wrapperIcon}>
                <FaShoppingCart />
            </div>
            <span>Order</span>
        </div>
        <div className={styles.wrapperItem}>
            <div className={styles.wrapperIcon}>
                <FaFacebookMessenger />
            </div>
            <span>Contact</span>
        </div>
    </div>
}

export default MenuDashboards;