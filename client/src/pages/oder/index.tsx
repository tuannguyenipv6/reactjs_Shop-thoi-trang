import { useEffect, useState } from 'react';
import Order from '../../components/Order';
import { IOder } from '../../datatypes';
import { withAuth } from '../../HOC';
import { getOder } from '../../lib';
import styles from './Oder.module.css';

function Oder() {
    const [oders, setOders] = useState<IOder[]>([]);

    const fetchData = async () => {
        const response = await getOder();

        if(response.success) {
            setOders(response.data)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    
    return <div className={styles.wrapper}>
        <h4>Các đơn hàng hiện có</h4>
        {
            oders.length > 0 ?
            oders.map(oder => (<Order oder={oder} fetchData={fetchData} />))
            : <h3 className={styles.noOder}>Hiện không có đơn hàng nào!</h3>
        }
    </div>
}

export default withAuth(Oder);