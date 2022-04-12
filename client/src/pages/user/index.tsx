import { useContext } from 'react';
import { FaPen } from 'react-icons/fa';
import FormEditProdileUser from '../../components/FormEditProdileUser';
import { API } from "../../constants";
import { AuthContext } from '../../contexts/AuthContext';
import { withAuth } from "../../HOC";
import styles from './User.module.css';

function User() {
    const {authState: {user}} = useContext(AuthContext)
    
    return <div style={{display: 'flex'}}>
        <div className={styles.avatarName}>
            <img 
                className={styles.avatar} 
                src={`${API}/images/${user?.img ? user.img : 'no_avatar.png'}`} 
            />
            <div className={styles.wrapperName}>
                <b>Quốc Tuấn</b>
                <span className={styles.editProfile}>
                    <FaPen size={14} />
                    <span style={{marginLeft: 4}}>Sửa Hồ Sơ</span>
                </span>
            </div>
        </div>

        <div className={styles.wrapperEditProfile}>
            <h3 className={styles.title}>Hồ Sơ Của Tôi</h3>
            <p className={styles.des}>Quản lý thông tin hồ sơ để bảo mật tài khoản và thông tin giao hàng</p>

            <FormEditProdileUser />
        </div>
    </div>
}

export default withAuth(User);