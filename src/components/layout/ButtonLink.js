import styles from './ButtonLink.module.css';
import { Link } from 'react-router-dom';

function ButtonLink({ to, text }) {
    return (
        <>
            <Link className={styles.btnLink} to={to}>
                {text}
            </Link>
            
        </>
    )
}

export default ButtonLink;