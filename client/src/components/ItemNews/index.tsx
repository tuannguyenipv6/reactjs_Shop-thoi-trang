import { API } from '../../constants';
import { News } from '../../datatypes';
import styles from './ItemNews.module.css';

interface IItemNewsProps {
    news: News;
}

function ItemNews({news}: IItemNewsProps) {
    return (<div className={styles.wrapper}>
        <div className={styles.item}>
            <div className={styles.itemImg} style={{backgroundImage: `url(${API}/images/${news.img})`}} />
            <div className={styles.itemConten}>
                <h3 className={styles.itemTitle}>{news.title}</h3>
                <p className={styles.itemDescription}>{news.description}</p>
            </div>
        </div>
    </div>)
}

export default ItemNews;