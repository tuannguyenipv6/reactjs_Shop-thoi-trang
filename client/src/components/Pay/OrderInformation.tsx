import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { API, CALCULATE_PRICE, FOTMAT_CURRENCY } from '../../constants';
import { PayContext } from '../../contexts/PayContext';
import { getTransportFee } from '../../lib';
import styles from './Pay.module.css';

function OrderInformation() {
    const {payProducts} = useContext(PayContext);

    const [transportFee, setTransportFee] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTransportFee()

            if(response.success) {
                setTransportFee(response.data.autoIncrement)
            }
        }

        fetchData();
    }, [])

    const allIntoMoney = (): number=> {
        const intoMoney = payProducts.reduce((acc, product) => {
          if(product.checked) {
            const price = CALCULATE_PRICE(product) * product.amount;
            return acc + price
          }else {
            return acc
          }
        }, 0)
    
        return intoMoney
    }

    return (<div className={styles.wrapperOrderInformation}>
        <p className={styles.titleShipmentDetails}>Thông tin đơn hàng</p>

        {
            payProducts.length > 0 ? 
            payProducts.map(payProduct => (
                <div key={payProduct._id} className={styles.wrapperItemOrderInformation}>
                    <div className={styles.wrapperImg}>
                        <img className={styles.imgOrderInformation} src={`${API}/images/${payProduct.nameImgs[0]}`} alt="Ảnh" />
                        <span className={`${styles.notice} ${payProduct.amount > 1 ? styles.noticeActive : ''}`}>
                            {payProduct.amount > 1 ? payProduct.amount : ''}
                        </span>
                    </div> 
                    <Link href={`/${payProduct.name.replace(/\/?/g, '').replace(/\?/g, '').replace(/ /g, '-')}.${payProduct._id}`}>
                        <b className={styles.nameProductItem}>{payProduct.name}</b>
                    </Link>
                    <p className={styles.price}>
                        {FOTMAT_CURRENCY(CALCULATE_PRICE(payProduct) * payProduct.amount)} ₫
                    </p>
                </div>)
            )
            : <h3 style={{display: 'flex', justifyContent: 'center'}}>Chưa chọn sản phẩm</h3>
        }
        

        <div className={styles.wrapperDesOrder}>
            <p>Tạm tính</p>
            <p>{FOTMAT_CURRENCY(allIntoMoney())} đ</p>
        </div>
        <div className={styles.wrapperDesOrder}>
            <p>Phí vận chuyển</p>
            <p>{FOTMAT_CURRENCY(transportFee)} đ</p>
        </div>
        <div className={styles.wrapperDesOrder}>
            <p>Tổng cộng:</p>
            <p>{FOTMAT_CURRENCY(allIntoMoney() + transportFee)} đ</p>
        </div>
    </div>)
}

export default OrderInformation;