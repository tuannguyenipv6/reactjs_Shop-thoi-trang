import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { DashboardsContext } from '../../contexts/DashboardsContext';
import Order from '../Order';
import styles from './Dashboards.module.css';

function OrderDashboards() {
    const {authState: {user}} = useContext(AuthContext)
    const {dashboardsState: {orders}, fetchDataOrder} = useContext(DashboardsContext)
    // const [state, setState] = useState<IOder[]>([]);

    // const fetchData = async () => {
    //     const res = await getAllOder();
    //     if (res.success) {
    //         setState(res.data);
    //     }
    // }
 
    // useEffect(() => {
    //     fetchData()
    // }, [])
    
    return (<div className={styles.wrapperOder}>
        {
            orders.map(oder => (<Order userAdmin={user?.admin} key={oder._id} oder={oder} fetchData={fetchDataOrder} />))
        }
    </div>)
}

export default OrderDashboards;