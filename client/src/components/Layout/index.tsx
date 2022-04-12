import { ReactNode } from "react";
import { Info } from "../../constants/dataDefault";
import Footer from "../Footer";
import Loading from "../Loading";
import Navbar from "../Navbar";
import styles from './Layout.module.css';

interface ILayoutProps {
    children: ReactNode;
    infoShop: Info
}

function Layout({children, infoShop}: ILayoutProps) {
    return (<>
        <Navbar infoShop={infoShop} />
            <div className={styles.wrapperChildren}>
               {
                children ? children :
                <Loading />
               }
            </div>
        <Footer infoShop={infoShop} />
    </>)
}

export default Layout;