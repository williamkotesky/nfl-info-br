import styles from "./ScheduleCard.module.css";

function ScheduleCard({
  awayName,
  awayScore,
  homeName,
  homeScore,
  date,
  venue,
}) {
  function dateFormat() {
    let dataObject = new Date(date);
    let timeObject = new Date(date);
    dataObject = dataObject.toLocaleDateString("pt-br", { dateStyle: "short" });
    timeObject = timeObject.toLocaleTimeString("pt-br", { timeStyle: "short" });
    date = `${dataObject} - ${timeObject}`;
  }

  dateFormat();

  return awayScore === "0" && awayScore === homeScore ? (
    <div className={styles.scheduleCard}>
      <div className={styles.mainInfo}>
        <span className={styles.timeName}>{awayName}</span>
        <br />
        <p>@</p>
        <span className={styles.timeName}>{homeName}</span>
        <br />
      </div>
      <div className={styles.info}>
        <p>{date}</p>
        <p>{venue}</p>
      </div>
    </div>
  ) : (
    <div className={styles.scheduleCard}>
      <div className={styles.mainInfo}>
        <span className={styles.timeName}>{awayName}</span>
        <br />
        <p
          className={
            styles[
              Number(awayScore) > Number(homeScore)
                ? "timeScoreWin"
                : "timeScore"
            ]
          }
        >
          {awayScore}
        </p>
        <p>@</p>
        <p
          className={
            styles[
              Number(awayScore) < Number(homeScore)
                ? "timeScoreWin"
                : "timeScore"
            ]
          }
        >
          {homeScore}
        </p>
        <span className={styles.timeName}>{homeName}</span>
        <br />
      </div>
      <div className={styles.info}>
        <p>{date}</p>
        <p>{venue}</p>
      </div>
    </div>
  );
}

export default ScheduleCard;
