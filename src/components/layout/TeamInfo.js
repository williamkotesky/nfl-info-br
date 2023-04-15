import { useState, useEffect } from "react";
import Loading from "./Loading";
import styles from "./TeamInfo.module.css";

function TeamInfo({ idData }) {
  const [stats, setStats] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(
        `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/teams/${idData}/records/0?lang=en&region=us`,
        {
          method: "GET",
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setStats(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [idData]);

  return (
    <section className={styles.infoSection}>
      {stats ? (
        <div className={styles.infoContainer}>
          <div className={styles.divStats}>
            <div>
              <span className={styles.infoField}>Campanha Geral: </span>
              <span>{stats.summary}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>% de vitórias: </span>
              <span>{`${(stats.value * 100).toFixed(2)}%`}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>Desempenho na divisão: </span>
              <span>{stats.stats[20].displayValue}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>Sequência de vitórias: </span>
              <span> {stats.stats[15].value}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>
                % de vitórias na divisão:
              </span>
              <span>{`${(stats.stats[6].value * 100).toFixed(2)}%`}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>
                Total de pontos marcados:{" "}
              </span>
              <span>{stats.stats[14].displayValue}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>
                Total de pontos sofridos:{" "}
              </span>
              <span>{stats.stats[13].displayValue}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>Saldo de pontuação: </span>
              <span>{stats.stats[5].displayValue}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>Pontos por jogo: </span>
              <span>{stats.stats[3].displayValue}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>
                Pontos sofridos por jogo:{" "}
              </span>
              <span>{stats.stats[2].displayValue}</span>
            </div>
            <br />
            <div>
              <span className={styles.infoField}>Playoff Seed: </span>
              <span>{`#${stats.stats[11].displayValue}`}</span>
            </div>
            <br />
          </div>
        </div>
      ) : (
        <div className={styles.LoaderPlace}>
          <Loading />
        </div>
      )}
    </section>
  );
}

export default TeamInfo;
