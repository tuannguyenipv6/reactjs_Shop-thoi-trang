import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TOKEN_NAME_LOCAL_STORAGE } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { MoadalContext } from '../../contexts/ModalContext';
import styles from './Modal.module.css';

interface IDescription {
  title: string;
  content: string;
}

interface IModalRegisterQuestion {
  accessToken?: string;
  description: IDescription;
  noHandle?: boolean;
}

const ModalRegisterQuestion = ({accessToken, description, noHandle}: IModalRegisterQuestion) => {

  const {hidenModal} = useContext(MoadalContext);
  const {loadUser} = useContext(AuthContext);
  const router = useRouter()

  const handleOk = async () => {
    if(accessToken) {
      localStorage.setItem(TOKEN_NAME_LOCAL_STORAGE, accessToken);
      const result = await loadUser();
      if(result) {
        router.replace("/");
      }
    }else {
      router.replace("/login");
    }
    hidenModal();
  }

  const hidenNO = () => {
    if(noHandle) {
      router.replace("/oder");
      hidenModal()
    }else {
      if(accessToken) {
        hidenModal()
      }else {
        router.replace("/register");
        hidenModal()
      }
    }
  }

  return (<div className={styles.registerQuestion}>
    <h3>{description.title}</h3>
    <p>{description.content}</p>
    <div className={styles.registerQuestionBtn}>
      <button onClick={hidenNO} className="mr-4">{noHandle ? "OK" : "Không"}</button>
      {
        noHandle ? null : <button onClick={handleOk}>Có</button>
      }
    </div>
  </div>)
}

export default ModalRegisterQuestion;