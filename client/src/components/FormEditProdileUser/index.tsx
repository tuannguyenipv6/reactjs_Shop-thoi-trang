import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { API, IShipmentDetails } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { InputField } from '../../custom-field';
import { addShipmentDetails } from '../../lib';
import { uploadImgUser } from '../../lib/auth';
import { uploadImg } from '../../lib/uploadImg';
import stylesAuth from '../../styles/Auth.module.css';
import styles from './FormEditProdileUser.module.css';

function FormEditProdileUser() {
    const {showToast} = useContext(ToastifyContext)
    const {loadUser, authState: {user}} = useContext(AuthContext)

    const initialValues: IShipmentDetails = {
        fullName: '',
        address: '',
        phoneNumber: '',
    }

    const [file, setFile] = useState({
        strFile: '',
        valueFile: undefined
    });
    const onChange = (e: any) => {
        if(e.target.files[0]) {
            setFile({
                valueFile: e.target.files[0],
                strFile: URL.createObjectURL(e.target.files[0])
            });
        }
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
        // upload img
        if(file.valueFile) {
            const formData = new FormData();
            formData.append('myFile', file.valueFile);
            const fetchFile = await uploadImg(formData);

            if(fetchFile.success) {
                const fetchUploadImgUser = await uploadImgUser(fetchFile.data);

                if(fetchUploadImgUser.success) {
                    loadUser();
                    const response = await addShipmentDetails(values);

                    if(response.success) {
                        showToast("Đã lưu!", "success");
                    }else {
                        showToast("Thất bại lỗi!", "error");
                    }
                }else {
                    showToast("Thất bại lỗi!", "error");
                }
            }else {
                showToast("Thất bại lỗi!", "error");
            }
        }else {
            // update ShipmentDetails
            const response = await addShipmentDetails(values);
            if(response.success) {
                showToast("Đã lưu!", "success");
            }else {
                showToast("Thất bại lỗi!", "error");
            }
        }
    }

    return (<div className={styles.inputFields}>
        <div className={styles.wrapperInputFields}>
            <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => {
                    return (
                    <Form>
                        <div className={styles.wrapperFields}>
                            <span className={styles.nameFields}>Tên user</span>
                            <p className={styles.valueFields}>Quốc Tuấn</p>
                        </div>

                        <InputField 
                            classWrapper={styles.wrapperFields}
                            classLabel={styles.nameFields}
                            classInput={styles.valueFields}
                            name='fullName'
                            placeholder='Vd: Nguyễn Quốc Tuấn'
                            label='Họ và tên'
                            type='text'
                            maxLength={300}
                        />

                        <InputField 
                            classWrapper={styles.wrapperFields}
                            classLabel={styles.nameFields}
                            classInput={styles.valueFields}
                            name='address'
                            placeholder='Vd: 1 Phạm Văn Đồng, Gò Vấp, TP. HCM'
                            label='Địa chỉ'
                            type='text'
                            maxLength={300}
                        />

                        <InputField 
                            classWrapper={styles.wrapperFields}
                            classLabel={styles.nameFields}
                            classInput={styles.valueFields}
                            name='phoneNumber'
                            placeholder='Vd: 0987******'
                            label='Số điện thoại'
                            type='text'
                            maxLength={13}
                        />

                        <div className={styles.wrapperFields}>
                            <span className={styles.nameFields}>Email/ Email đăng nhập</span>
                            <p className={styles.valueFields}>tuannguyen26@gmail.com</p>
                        </div>

                        <div className={styles.wrapperFields}>
                            <span className={styles.nameFields}></span>
                            <button style={{padding: "4px 16px"}} type='submit' className={stylesAuth.button}>
                                LƯU
                            </button>
                        </div>
                    </Form>
                    )
                }}
            </Formik>
        </div>

        <div className={styles.wrapperEditAvatar}>
            <img 
                className={styles.imgEdit} 
                src={file.strFile ? file.strFile : `${API}/images/${user?.img ? user.img : 'no_avatar.png'}`} 
            />

            <input 
                className={styles.inputFile} 
                id="upload" 
                type="file" 
                onChange={onChange}
            />
            <label className={styles.btn} htmlFor="upload">Chọn ảnh</label>

            <span className={styles.editDes}>Dụng lượng file tối đa 1 MB</span>
            <span className={styles.editDes}>Định dạng:.JPEG, .PNG</span>
        </div>
    </div>)
}

export default FormEditProdileUser;