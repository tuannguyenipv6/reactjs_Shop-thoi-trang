import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { defaultInfo, Info } from '../constants/dataDefault';
import { AuthContextProvider, ModalContextProvider } from '../contexts';
import DashboardsProvider from '../contexts/DashboardsContext';
import PayContextProvider from '../contexts/PayContext';
import SearchContextProvider from '../contexts/SearchContext';
import ToastifyContextProvider from '../contexts/ToastifyContext';
import { getInfoShop } from '../lib';
import '../styles/globals.css';

interface AppProps2 extends AppProps {
  info: Info;
}

const MyApp = ({ Component, pageProps, info }: AppProps2) => {
  const router = useRouter();

  if(router.pathname === "/dashboards") {
    return (
      <AuthContextProvider>
        <DashboardsProvider>
          <ToastifyContextProvider>
            <Component {...pageProps} />
          </ToastifyContextProvider>
        </DashboardsProvider>
      </AuthContextProvider>
    )
  }

  return (
    <PayContextProvider>
      <SearchContextProvider>
        <ModalContextProvider>
          <AuthContextProvider>
            <ToastifyContextProvider>
              <Layout infoShop={info} >
                <Component {...pageProps} />
                <Modal />
              </Layout>
            </ToastifyContextProvider>
          </AuthContextProvider>
        </ModalContextProvider>
      </SearchContextProvider>
    </PayContextProvider>
  )
}
MyApp.getInitialProps = async () => {
  const response = await getInfoShop();
  if(!response.success) {
    return {
      info: defaultInfo
    }
  }

  const {infoShop} = response;
  return { 
    info: infoShop
  }
}
export default MyApp