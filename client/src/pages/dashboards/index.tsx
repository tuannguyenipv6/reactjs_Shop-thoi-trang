import Head from 'next/head';
import { MenuDashboards, OrderDashboards } from '../../components/Dashboards';
import HeaderDashboards from '../../components/Dashboards/HeaderDashboards';
import withAuthAdmin from '../../HOC/withAuthAdmin';
import styles from './Dashboards.module.css';

function Dashboards() {
    return (<>
        <Head>
            <title>Admin NQT Shop</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.wrapper}>
            <MenuDashboards />

            <div className={styles.wrapperContent}>
                <HeaderDashboards />

                <div className={styles.content}>
                    <OrderDashboards />
                </div>
            </div>
        </div>
    </>)
}

export default withAuthAdmin(Dashboards);