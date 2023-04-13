import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import styles from "./Stats.module.css";

function Stats() {
  // eslint-disable-next-line
  const [teams, setTeams] = useState([
    null,
    "Atlanta Falcons",
    "Buffalo Bills",
    "Chicago Bears",
    "Cincinnati Bengals",
    "Cleveland Browns",
    "Dallas Cowboys",
    "Denver Broncos",
    "Detroit Lions",
    "Green Bay Packers",
    "Tennessee Titans",
    "Indianapolis Colts",
    "Kansas City Chiefs",
    "Las Vegas Raiders",
    "Los Angeles Rams",
    "Miami Dolphins",
    "Minnesota Vikings",
    "New England Patriots",
    "New Orleans Saints",
    "New York Giants",
    "New York Jets",
    "Philadelphia Eagles",
    "Arizona Cardinals",
    "Pittsburgh Steelers",
    "Los Angeles Chargers",
    "San Francisco 49ers",
    "Seattle Seahawks",
    "Tampa Bay Buccaneers",
    "Washington Commanders",
    "Carolina Panthers",
    "Jacksonville Jaguars",
    null,
    null,
    "Baltimore Ravens",
    "Houston Texans",
  ]);

  const [stats, setStats] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      async function getData() {
        const data = Promise.all(
          teams.map(
            async (i, index) =>
              i &&
              (await (
                await fetch(
                  `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/teams/${index}/records/0?lang=en&region=us`
                )
              ).json())
          )
        );
        return data;
      }

      getData().then((data) => {
        setStats(data);
      });
    }, 1000);
  }, [teams]);

  return (
    <>
      {stats.length > 0 ? (
        <section className={styles.statsContainer}>
          <h1>Stats</h1>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Vitórias</th>
                <th>Derrotas</th>
                <th>Empates</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(
                (item, index) =>
                  item && (
                    <tr key={teams[index]}>
                      <td>{teams[index]}</td>
                      <td>{item.stats[18].value}</td>
                      <td>{item.stats[10].value}</td>
                      <td>{item.stats[16].value}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </section>
      ) : (
        <div className={styles.loadingPlace}>
          <Loading />
        </div>
      )}
    </>
  );
}

export default Stats;
