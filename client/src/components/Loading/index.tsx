import styles from './Loading.module.css';

function Loading() {
  return (<div className={styles.wrapper}>
    Đang loading...
    <div className={styles.ouverlay}></div>
    <div className={styles.loadingBx}>
      <div className={styles.loading}></div>
    </div>
  </div>)
}

export default Loading;