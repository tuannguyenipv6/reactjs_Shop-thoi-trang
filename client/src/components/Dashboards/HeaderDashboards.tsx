import { useContext, useState } from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';
import { API } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { DashboardsContext } from '../../contexts/DashboardsContext';
import { DashboardsActionType } from '../../reducers/types';
import styles from './Dashboards.module.css';

const {TAKE_ALL, TAKE_ORDER_NEW, TAKE_FROM_SIPPER, TAKE_PAIL, TAKE_CANCELING, TAKE_CANCELLED} = DashboardsActionType

function HeaderDashboards() {
    const {authState: {user}} = useContext(AuthContext);
    const {dashboardsState: {takeOrder}, setStateTakeOrder} = useContext(DashboardsContext)
    const [showNoti, setShowNoti] = useState(false);

    const handlerSelect = (e: any) => {
        setStateTakeOrder(e.target.value);
    }
    
    return (<div className={styles.wrapperHeader}>
        <div className={styles.wrapperIconHeader}>
            <FaSearch size={20} />
        </div>

        <div className={styles.avatarHeader}>
            <div className={styles.wrapperSelect}>
                <select onChange={handlerSelect} value={takeOrder} className={styles.select}>
                    <option value={TAKE_ALL} className={styles.option}>Tất cả</option>
                    <option value={TAKE_ORDER_NEW} className={styles.option}>Đơn hàng mới</option>
                    <option value={TAKE_FROM_SIPPER} className={styles.option}>Đang ở đơn vị vận chuyển</option>
                    <option value={TAKE_PAIL} className={styles.option}>Đã thanh toán</option>
                    <option value={TAKE_CANCELING} className={styles.option}>Đang có yêu cầu hủy</option>
                    <option value={TAKE_CANCELLED} className={styles.option}>Đã hủy</option>
                </select>
            </div>
            
            <div  className={styles.wrapperIconHeader}>
                <FaBell onClick={() => setShowNoti(!showNoti)} size={20} />
                <span className={styles.count}>3</span>

                <div className={`${styles.wrapperNotification} ${showNoti ? styles.wrapperNotificationShow : ''}`}>
                    <h4 className={styles.titleNoti}>Đang có 3 đơn hàng mới đang chờ xét duyệt</h4>

                    <div className={styles.itemNewOder}>
                        {/* < */}
                    </div>
                </div>
            </div>
            
            <img className={styles.imgAvatar} src={`${API}/images/${user?.img}`} alt="Ảnh" />
        </div>
    </div>)
}

export default HeaderDashboards;