import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FaHandPointRight } from 'react-icons/fa';
import * as Yup from 'yup';
import SupportAuth from '../../components/SuportAuth';
import { TOKEN_NAME_LOCAL_STORAGE } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { InputField, InputFieldPassword } from "../../custom-field";
import { User } from '../../datatypes';
import { registerLogin } from '../../HOC';
import { loginUser } from '../../lib/auth';
import styles from '../../styles/Auth.module.css';

function Login() {
  const {showToast} = useContext(ToastifyContext);
  const {loadUser} = useContext(AuthContext)
  const router = useRouter()

  // giá trị ban đầu của form
  const initialValues: User = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Định dạng địa chỉ email không hợp lệ!")
      .required('Vui lòng nhập trường này!'),

    password: Yup.string()
      .min(6, 'Tối thiểu 6 ký tự!')
      .required('Vui lòng nhập trường này!')
  });
 
  const loginSubmit = async (values: User) => {
    const loginData = await loginUser(values);
    if(loginData.success) {
      localStorage.setItem(TOKEN_NAME_LOCAL_STORAGE, loginData.accessToken);
      const result = await loadUser();
      if(result <= 0) {
        router.replace("/");
      }else if(result === 1) {
        router.replace("/dashboards");
      }
    }else {
      showToast('Thông tin đăng nhập không chín xác', 'error')
    }
  }

  return (<div className='row'>
    <div className='c-12 m-12 l-6'>
      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={loginSubmit}
      >
        {() => {
          return (
            <Form className={styles.form}>
              <h3 className={styles.title}>ĐĂNG NHẬP</h3>

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
                maxLength={15}
              />

              <div className={styles.wrapperBtn}>
                <button type='submit' className={styles.button}>
                  ĐĂNG NHẬP
                  <FaHandPointRight />
                </button>

                <p className={styles.alreadyAccount}>
                  Bạn chưa co tài khoản?
                  <Link href="/register">
                    Đăng ký
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

export default registerLogin(Login);