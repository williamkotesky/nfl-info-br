import { Link } from 'react-router-dom';
import styles from './BigNewsCard.module.css';

function BigNewsCard({ id, title, img, alt }) {
    return(
        <>
            <div className={styles.bigNewsImageContainer}>
                <img src={img} alt={alt} />
            </div>
                <Link to={`/${id}/${title.replace(/\s/g, '-').toLowerCase()}`}> 
                    <h2>{title}</h2>
                </Link>
        </>
    )
}

export default BigNewsCard;