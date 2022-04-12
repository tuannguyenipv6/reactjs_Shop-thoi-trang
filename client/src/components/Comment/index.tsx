import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FOTMAT_DAY, VALUE_RATING } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { MoadalContext } from '../../contexts/ModalContext';
import { ToastifyContext } from '../../contexts/ToastifyContext';
import { IComment } from '../../datatypes';
import { addAndUpdateComment } from '../../lib';
import stylesAuth from '../../styles/Auth.module.css';
import ModalRegisterQuestion from '../Modal/ModalRegisterQuestion';
import styles from './Comment.module.css';
import ItemComments from './ItemComments';

interface ICommentProps {
    comments: IComment[]
}

function Comment({comments}: ICommentProps) {
    const { query } = useRouter();

    const {authState: {user}} = useContext(AuthContext);
    const {showToast} = useContext(ToastifyContext);
    const {showModal} = useContext(MoadalContext);

    const [arrComment, setArrComment] = useState(comments);
    const [valueComponent, setValueComment] = useState('');
    const [star, setStar] = useState(0);

    const handleSetStar = (key: number) => {
        if(key === star) {
            setStar(star - 20);
        }else {
            setStar(key);
        }
    }

    useEffect(() => {
        if(user) {
            arrComment.forEach(comment => {
                if(comment.user === user._id) {
                    setStar(comment.star);
                    setValueComment(comment.content);
                }
            })
        }
    }, [user]);

    const handleSendCmt = async () => {
        if(user) {
            if(valueComponent.trim()) {
                const params = `${query.id}`;
                const arrayParams = params.split(".");
                const id = arrayParams[arrayParams.length - 1];

                const response = await addAndUpdateComment(id, {
                    avatar: `${user?.img ? user?.img : 'no_avatar.png'}`,
                    content: valueComponent,
                    date: FOTMAT_DAY(new Date()),
                    name: user.name ? user.name : 'NOT_FOUND',
                    product: Number(id),
                    star: star,
                    user: null,
                });

                if(response.success) {
                    const {comment} = response;

                    const isComment = arrComment.some(cmt => {
                        return cmt.product === comment.product && cmt.user === comment.user
                    })

                    if(isComment) {
                        const newArrComment = arrComment.map(cmt => {
                            if(cmt.product === comment.product && cmt.user === comment.user) {
                                return comment;
                            }else {
                                return cmt
                            }
                        })
                        setArrComment(newArrComment)
                    }else {
                        setArrComment([
                            comment,
                            ...arrComment
                        ])
                    }
                }else {
                    showToast('Lỗi, không thể cập nhật dữ liệu mới!', 'error')
                }
            }else {
                showToast('Vui lòng nhập đầy đủ giá trị!', 'warning')
            }
        }else {
            showModal({
                title: 'Thông báo!',
                showModal: true,
                component: <ModalRegisterQuestion 
                  description={{
                    title: "Bạn chưa đăng nhập tài khoản",
                    content: "Hãy đăng ký hoặc dùng tài khoản của bạn để sử dụng các dịch vụ của chúng tôi!. Bạn đã có tài khoản?"
                  }}
                />
            });
        }
    }

    return (<>
        <div className='row'>
            <div className='c-12 m-12 l-12'>
                <b className={styles.title}>Bình luận</b>
            </div>
        </div>
        
        <div className="row">
            <div className="c-12 m-4 l-4">
                <div className={styles.wrapperComment}>
                    <div className={styles.wrapperStar}>
                        {
                            VALUE_RATING.map((key, i) => {
                                if(star >= key) {
                                    return <FaStar 
                                        onClick={() => handleSetStar(key)} 
                                        color='#ffd52e' 
                                        size={20} key={i} 
                                    />
                                }else {
                                    return <FaRegStar
                                        onClick={() => handleSetStar(key)} 
                                        color='#ffd52e' 
                                        size={20} key={i} 
                                    />
                                }
                            })
                        }
                    </div>

                    <textarea value={valueComponent} onChange={e => setValueComment(e.target.value)} className={styles.inputComment} />

                    <div className={styles.wrapperBtn}>
                        <button 
                            type='button' 
                            className={`${stylesAuth.button} ${styles.btn}`}
                            onClick={handleSendCmt}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
            <div className="c-12 m-8 l-8">
                <div className={styles.wrapperComments}>
                    {
                        arrComment.length > 0 ?
                        arrComment.map(comment => (
                            <ItemComments comment={comment} key={comment.user} />
                        ))
                        : <h3 style={{display: 'flex', justifyContent: 'center'}}>Chưa có bình luận nào</h3>
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Comment;