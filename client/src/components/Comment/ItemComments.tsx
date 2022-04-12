import { API } from '../../constants';
import { IComment } from '../../datatypes';
import RatingsStar from '../RatingsStar';
import styles from './Comment.module.css';

interface IItemCommentsProps {
    comment: IComment
}

function ItemComments({comment}: IItemCommentsProps) {
    return  (<div className={styles.comments}>
        <img 
            className={styles.avatar}
            src={`${API}/images/${comment.avatar}`}
            alt="Ảnh Avatar"
        />
        <div className={styles.wrapperItemComment}>
            <div className={styles.wrapperNameComment}>
                <b>{comment.name}</b>
                <span className={styles.dayComment}>{comment.date}</span>
            </div>

            <div className={styles.wrapperItemCommentStar}>
                <RatingsStar star={comment.star} />
            </div>

            <span>{comment.content}</span>
        </div>
    </div>)
}

export default ItemComments;