import { API, CALCULATE_PRICE, IShipmentDetails } from '../../constants';
import styles from './Pay.module.css';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { InputField } from '../../custom-field';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../Button';
import { PayContext } from '../../contexts/PayContext';
import { addNewOder, getTransportFee } from '../../lib';
import { IOder, IProductsOder } from '../../datatypes';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { MoadalContext } from '../../contexts/ModalContext';
import ModalRegisterQuestion from '../Modal/ModalRegisterQuestion';

function ShipmentDetails() {

    const {authState: {user}, logoutUser} = useContext(AuthContext);
    const {payProducts, setPayProducts} = useContext(PayContext);
    const {showToast} = useContext(ToastifyContext);
    const {showModal} = useContext(MoadalContext)
    
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

    const initialValues: IShipmentDetails = {
        fullName: '',
        address: '',
        phoneNumber: '',
    }
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
          .min(8, 'Tối thiểu 8 ký tự!')
          .required('Vui lòng nhập trường này!')
        ,

        address: Yup.string()
          .min(15, 'Tối thiểu 15 ký tự!')
          .required('Vui lòng nhập trường này!')
        ,
    
        phoneNumber: Yup.string()
          .min(9, "tối thiểu 9 số")
          .max(13, "Quá mức của 1 số điện thoại")
          .required('Vui lòng nhập trường này!')
        ,
    });

    const handleSubmit = async (values: IShipmentDetails) => {
        const listProductOder: IProductsOder[] = payProducts.map(product => {
            const cart = product.cart?.find(valueCart => valueCart.idUser === user?._id);
            
            return {
                idProduct: product._id,
                img: product.nameImgs[0],
                name: product.name,
                size: cart?.size ? cart.size : "Not-Found",
                price: CALCULATE_PRICE(product),
                amount: product.amount
            }
        })
        
        const oder: IOder = {
            name: values.fullName,
            address: values.address,
            phoneNumber: values.phoneNumber,
            transportFee: transportFee,
            productOder: listProductOder
        }

        const response = await addNewOder(oder);
        if(response.success) {
            showModal({
                title: 'Thông báo!',
                showModal: true,
                component: <ModalRegisterQuestion 
                    noHandle={true}
                    description={{
                        title: "Đã gửi đơn hàng đến Shop NQT",
                        content: "Bạn vui lòng chờ Shop đóng gói và gửi đơn hàng"
                    }}
                />
            });
            setPayProducts([])
        }else {
            showToast("Lỗi không thể lên đơn hàng!", "error")
        }
    }

    return (<div style={{}} className={styles.wrapperShipmentDetails}>
        <h3 className={styles.nameShop}>NQT Shop</h3>
        <p className={styles.titleShipmentDetails}>Thông tin giao hàng</p>
        <div className={styles.wrapperUser}>
            <img className={styles.imgUser} src={`${API}/images/${user?.img ? user.img : "no_avatar.png"}`} alt='Ảnh' />
            <div className={styles.user}>
                <span>{`${user?.name}(${user?.email})`}</span>
                <span onClick={() => logoutUser()} className={styles.logOut}>Đăng xuất</span>
            </div>
        </div>

        <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => {
                return (<Form>
                    <InputField 
                        name='fullName'
                        placeholder='Vd: Nguyễn Quốc Tuấn'
                        label='Họ và tên'
                        type='text'
                        maxLength={300}
                    />
                    <InputField 
                        name='address'
                        placeholder='Vd: 1 Phạm Văn Đồng, Gò Vấp, TP. HCM'
                        label='Địa chỉ'
                        type='text'
                        maxLength={300}
                    />
                    <InputField 
                        name='phoneNumber'
                        placeholder='Vd: 0987******'
                        label='Số điện thoại'
                        type='text'
                        maxLength={13}
                    />

                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button className={styles.button} type='submit' title='Thanh toán' />
                    </div>
                </Form>)
            }}
        </Formik>
    </div>)
}

export default ShipmentDetails;