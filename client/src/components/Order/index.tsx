import { useContext } from "react";
import { FOTMAT_CURRENCY } from "../../constants";
import { ToastifyContext } from "../../contexts/ToastifyContext";
import { CANCELLED, COMPLETED, IN_PROGRESS, IOder, READY, SEND_REQUIRE } from "../../datatypes";
import { cancelOder, deleteByAdmin, deleteByUser, updatedStatus } from "../../lib";
import Button from "../Button";
import ItemOder from "./ItemOder";
import styles from './Oder.module.css';

interface IOrderProps {
    oder: IOder;
    fetchData: () => Promise<void>;
    userAdmin?: boolean;
}

const SEND_UP_SHIPPER = 'Gửi lên Shipper';
const ORDER_RECEIVED = 'Đơn hàng đã nhận';
const DELETE = 'Xóa';
const ACCEPT_CANCELLATION = 'Chấp nhận hủy';
const CANT_ACCEPT_CANCELLATION = 'Không chấp nhận hủy';

function Order({oder, fetchData, userAdmin}: IOrderProps) {

    const {showToast} = useContext(ToastifyContext)

    const handleStatus = (status?: string):string => {
        if(status === READY) {
            return `${userAdmin ? 'Đơn hàng mới!' : 'Đơn hàng đang chờ Shop xử lý'}`
        }

        if(status === IN_PROGRESS) {
            return 'Đang ở đơn vị vận chuyển'
        }

        if(status === COMPLETED) {
            return `${userAdmin ? 'Đơn hàng đã thanh toán thành công!' : 'Đã nhận hàng!'}`
        }

        if(status === SEND_REQUIRE) {
            return `${userAdmin ? 'Đơn hàng đang có yêu cầu hủy đơn?' : 'Yêu cầu hủy đơn hàng đã được gửi!'}`
        }

        if(status === CANCELLED) {
            return 'Đơn hàng đã được hủy!'
        }
            
        return ""
    }

    const totalPriceOder = (oder: IOder): number => {
        const price = oder.productOder.reduce((sum, oder) => sum + (oder.price * oder.amount), 0)
        
        return price + oder.transportFee;
    }

    const handleCancelOder = async (id?: number) => {
        if(id) {
            const response = await cancelOder(id)

            if(response.success) {
                showToast("Đã gửi yêu cầu hủy đơn hàng!", "info");
                fetchData();
            }
        }
    }

    const handleTextButtonAdmin = (status?: string):string => {
        if(status === READY) {
            return SEND_UP_SHIPPER;
        }
        
        if(status === IN_PROGRESS) {
            return ORDER_RECEIVED
        }

        if(status === COMPLETED || status === CANCELLED) {
            return DELETE;
        }

        if(status === SEND_REQUIRE) {
            return ACCEPT_CANCELLATION;
        }

        return 'Not-Found'
    }

    const handleDeleteOrderUser = async (id?: number) => {
        if(id) {
            const response = await deleteByUser(id);
            if(response.success) {
                fetchData();
            }
        }
    }

    const handleOnClickAdmin = async (des: string, id?: number) => {
        if(id) {
            let response;
            if(des === SEND_UP_SHIPPER) {
                response = await updatedStatus(id, "IN_PROGRESS");
            }

            if(des === ORDER_RECEIVED) {
                response = await updatedStatus(id, "COMPLETED");
            }

            if(des === DELETE) {
                response = await deleteByAdmin(id);
            }

            if(des === ACCEPT_CANCELLATION) {
                response = await updatedStatus(id, "CANCELLED");
            }

            if(des === CANT_ACCEPT_CANCELLATION) {
                response = await updatedStatus(id, "READY");
            }

            if(response.success) {
                fetchData();
                showToast(response.delete ? "Đã xóa!" : "Đã thay đổi trạng thái", "success");
            }
        }
    }

    return (<div key={oder._id} className={styles.wrapperItem}>
        <div className={styles.header}>
            <div>
                Thông tin đơn hàng số:&#160;
                <b>{oder._id ? oder._id : ""}</b>
            </div>

            <div>
                Trạng thái:&#160;
                <b>{handleStatus(oder.status)}</b>
                {
                    !userAdmin ?
                    oder.status === COMPLETED || oder.status === CANCELLED ?
                    <b onClick={() => handleDeleteOrderUser(oder._id)} className={styles.delete}>Xóa</b> : null
                    : null
                }
            </div>
        </div>
 
        <ItemOder oder={oder} />

        <div className={styles.wrapperBtn}>
            <div style={{margin: '8px 0'}}>
                Tổng số tiền đơn hàng:&#160;
                <b>{FOTMAT_CURRENCY(totalPriceOder(oder))}đ</b>
            </div>

            {
                !userAdmin ?
                oder.status === IN_PROGRESS || oder.status === COMPLETED ||
                oder.status === SEND_REQUIRE || oder.status === CANCELLED ?
                <button className={styles.btnDisabled}>Hủy đơn hàng</button>
                : <Button onClick={() => handleCancelOder(oder._id)} className={styles.btn} title='Hủy đơn hàng' />
                :
                // button admin
                oder.status === SEND_REQUIRE ? 
                <div style={{display: 'flex'}}>
                    <Button onClick={() => handleOnClickAdmin(handleTextButtonAdmin(oder.status), oder._id)} className={styles.btn} title={handleTextButtonAdmin(oder.status)} />
                    <Button onClick={() => handleOnClickAdmin(CANT_ACCEPT_CANCELLATION, oder._id)} className={styles.btn} title={CANT_ACCEPT_CANCELLATION} />
                </div>
                : <Button onClick={() => handleOnClickAdmin(handleTextButtonAdmin(oder.status), oder._id)} className={styles.btn} title={handleTextButtonAdmin(oder.status)} />
            }
        </div>
    </div>)
}

export default Order;


// chỉn sửa lại data order để isDelete: false
// bắt sự kiện lại xóa và các status của admin