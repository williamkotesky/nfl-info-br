import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function Card({ id, name, img, titles, conference, division, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.cardContainer}>
      <img src={img} alt="" className={styles.cardImg} />
      <div className={styles.cardTeam}>
        <h5 className={styles.cardTeamTitle}>{name}</h5>
        <p>
          Super Bowl Titles: <span>{titles}</span>{" "}
        </p>
        <p>
          Conferencia: <span>{conference}</span>
        </p>
        <p>
          Divisão: <span>{division}</span>
        </p>
        <div className={styles.cardActions}>
          <Link to={`/times/${id}`}>
            <BsPencil /> Editar
          </Link>
          <button onClick={remove}>
            <BsFillTrashFill /> Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
