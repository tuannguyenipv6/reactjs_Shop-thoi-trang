import {OrderInformation, ShipmentDetails} from '../../components/Pay';
import { withAuth } from '../../HOC';

function Pay() {
    return <div style={{display: 'flex'}}>
        <ShipmentDetails />

        <OrderInformation />
    </div>
}

export default withAuth(Pay);