import { Link } from 'react-router-dom';
import styles from './NewsCard.module.css';

function NewsCard({ id, title, img, alt }) {
    return(
        <>
            <div className={styles.smallNewsContainer}>
                  <div className={styles.imgContainer}>
                    <img src={img} alt={alt} />
                  </div>
                  <Link to={`/${id}/${title.replace(/\s/g, '-').toLowerCase()}`}> <h3>{title}</h3>
                  </Link>
            </div>
        </>
    )
}

export default NewsCard;