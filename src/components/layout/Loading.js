import styles from "./Loading.module.css";
import LoadingSvg from "../img/loading-svgrepo-com.svg";

function Loading() {
  return (
    <div>
      <img src={LoadingSvg} alt="a" className={styles.loader} />
    </div>
  );
}

export default Loading;
