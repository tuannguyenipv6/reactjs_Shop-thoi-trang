import { memo } from 'react';
import { FaEnvelopeSquare, FaPhone, FaSearchLocation } from 'react-icons/fa';
import { Info } from '../../constants/dataDefault';
import styles from './InfoShop.module.css';

interface IInfoShopProps {
    className?: string;
    classes?: string[];
    infoShop: Info;
}

function InfoShop({className='', classes, infoShop}: IInfoShopProps) {
    return (<li className={`${className === '' ? styles.contactList : className} ${classes ? classes.join(' ') : ''}`}>
        <ul>
            <p>
                <FaSearchLocation />
                {infoShop.City ? infoShop.City : 'Chưa có'}
            </p>
        </ul>

        <ul>
            <p>
                <FaPhone />
                Phone: 
                <a href="tel:0987654321">{infoShop.Phone ? infoShop.Phone : 'Chưa có'}</a>
            </p>
        </ul>

        <ul>
            <p>
                <FaEnvelopeSquare />
                Email: 
                <a href="mailto:">{infoShop.Email ? infoShop.Email : 'Chưa có'}</a>
            </p>
        </ul>
    </li>)
}

export default memo(InfoShop);