import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useContext } from 'react';
import { FaHandPointRight } from 'react-icons/fa';
import * as Yup from 'yup';
import ModalRegisterQuestion from '../../components/Modal/ModalRegisterQuestion';
import SupportAuth from '../../components/SuportAuth';
import { MoadalContext } from '../../contexts/ModalContext';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { InputField, InputFieldPassword } from "../../custom-field";
import { registerLogin } from '../../HOC';
import { registerUser } from '../../lib/auth';
import styles from '../../styles/Auth.module.css';

interface RegisterInput {
    name: string;
    email: string;
    password: string; 
    confirmPassword: string;
}

function Register() {

  const {showToast} = useContext(ToastifyContext);
  const {showModal} = useContext(MoadalContext);

  const initialValues: RegisterInput = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, 'Tối thiểu 6 ký tự!')
      .required('Vui lòng nhập trường này!')
    ,

    email: Yup.string()
      .email("Định dạng địa chỉ email không hợp lệ!").required('Vui lòng nhập trường này!')
    ,

    password: Yup.string()
      .min(6, 'Tối thiểu 6 ký tự!')
      .required('Vui lòng nhập trường này!')
      .matches(/^[a-z]+$/, 'Không đúng định dạng (không sử dụng số)!')
    ,

    confirmPassword: Yup.string()
      .min(6, 'Tối thiểu 6 ký tự!')
      .when("password",{
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Cả hai mật khẩu cần phải giống nhau!"
        )
      })
      .required('Vui lòng nhập trường này!')
      .matches(/^[a-z]+$/, 'Không đúng định dạng (không sử dụng số)!')
    ,
  });

  const registerSubmit = async (values: RegisterInput, { resetForm }: FormikHelpers<RegisterInput>) => {
    const registerData = await registerUser(values); 
    if(registerData.success) {
      showModal({
        title: 'Thông báo!',
        showModal: true,
        component: <ModalRegisterQuestion 
          accessToken={registerData.accessToken} 
          description={{
            title: "Đăng ký tài khoản thành công.",
            content: "Bạn có muốn đăng nhập ngay và luôn bằng tài khoản vừa tạo không"
          }}
        />
      });
      resetForm();
    }else {
      showToast(registerData.message, 'error')
    }
  } 

  return (<div className='row'>
    <div className='c-12 m-12 l-6'>
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={registerSubmit}
      >
        {() => {
          return (
            <Form className={styles.form}>
              <h3 className={styles.title}>ĐĂNG KÝ TÀI KHOẢN</h3>

              <InputField 
                name='name'
                placeholder='Vd: Tuấn Nguyễn'
                label='Tên đầy đủ'
                type='text'
                maxLength={25}
              />

              <InputField 
                name='email'
                placeholder='Vd: email@domain.com'
                label='Email'
                type='text'
                maxLength={25}
              />

              <InputFieldPassword 
                name='password'
                label='Mật khẩu'
                placeholder='Nhập mật khẩu'
                type='password'
                maxLength={12}
              />

              <InputFieldPassword 
                name='confirmPassword'
                label='Mật lại khẩu'
                placeholder='Nhập lại mật khẩu'
                type='password'
                maxLength={12}
              />

              <div className={styles.wrapperBtn}>
                <button type='submit' className={styles.button}>
                  ĐĂNG KÝ
                  <FaHandPointRight />
                </button>

                <p className={styles.alreadyAccount}>
                  Bạn đã có tài khoản?
                  <Link href='/login'>
                    Đăng nhập
                  </Link>
                </p>
              </div>

            </Form>
          )
        }}
      </Formik>
    </div>

    <div className='c-12 m-12 l-6'>
      <SupportAuth />
    </div>
  </div>)
}
  
export default registerLogin(Register);