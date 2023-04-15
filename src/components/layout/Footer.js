import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

function Footer() {
  const [dataYear, setDataYear] = useState();

  function year() {
    const data = new Date();
    setDataYear(data.getFullYear());
  }

  useEffect(() => {
    year();
  }, []);

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.infoFooter}>
        <p>Site feito com React.js, com objetivos acadêmicos.</p>
        <p>Marcas e nomes dos times são propriedades da NFL.</p>
        <p className={styles.year}>{dataYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
