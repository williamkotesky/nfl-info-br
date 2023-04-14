import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import ScheduleCard from "../layout/ScheduleCard";
import styles from "./Calendario.module.css";

function Calendario() {
  const [bye, setBye] = useState([]);
  const [schedule, setSchedule] = useState([]);
  // eslint-disable-next-line
  const [teams, setTeams] = useState([
    "Falcons",
    "Bills",
    "Bears",
    "Bengals",
    "Browns",
    "Cowboys",
    "Broncos",
    "Lions",
    "Packers",
    "Titans",
    "Colts",
    "Chiefs",
    "Raiders",
    "Rams",
    "Dolphins",
    "Vikings",
    "Patriots",
    "Saints",
    "Giants",
    "Jets",
    "Eagles",
    "Cardinals",
    "Steelers",
    "Chargers",
    "49ers",
    "Seahawks",
    "Buccaneers",
    "Commanders",
    "Panthers",
    "Jaguars",
    "Ravens",
    "Texans",
  ]);
  //const [myTeams, setMyTeams] = useState([]);
  // eslint-disable-next-line
  const [myTeamsFav, setMyTeamsFav] = useState([]);
  const [offSeason, setoffSeason] = useState();

  useEffect(() => {
    const calendarApiUrl = process.env.REACT_APP_calendarApi;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": calendarApiUrl,
        "X-RapidAPI-Host": "nfl-schedule.p.rapidapi.com",
      },
    };

    setTimeout(() => {
      fetch("https://nfl-schedule.p.rapidapi.com/v1/schedules", options)
        .then((response) => response.json())
        .then((response) => {
          const dataArray = [];

          for (let i in response.data) {
            const dataFilter = factorySchedule(response, i);
            dataArray.push(dataFilter);
          }
          setSchedule(dataArray);
        })
        .catch((err) => setoffSeason(true));
    }, 2000);

    function factorySchedule(object, i) {
      return {
        id: i,
        awayName: object.data[i].awayTeam.name,
        awayScore: object.data[i].awayTeam.score,
        homeName: object.data[i].homeTeam.name,
        homeScore: object.data[i].homeTeam.score,
        date: object.data[i].date,
        venue: object.data[i].venue,
        completeName: object.data[i].name,
      };
    }
  }, []);

  useEffect(() => {
    const byeArray = [];
    teams.map((itemTeams) => {
      let teamCont = 0;

      schedule.map((itemSchedule) => {
        if (
          itemTeams === itemSchedule.awayName ||
          itemTeams === itemSchedule.homeName
        )
          teamCont++;
        return true;
      });

      if (teamCont === 0) {
        byeArray.push(itemTeams);
      }
      return true;
    });
    setBye(byeArray);
    // eslint-disable-next-line
  }, [schedule]);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/news`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setMyTeams(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   let myTeamsFilter = [];
  //   myTeams &&
  //     myTeams.map((item) => {
  //       const lastNameArray = item.name.split(" ");
  //       const lastName = lastNameArray[lastNameArray.length - 1];
  //       myTeamsFilter.push(lastName);
  //       return true;
  //     });
  //   setMyTeamsFav(myTeamsFilter);
  // }, [myTeams]);

  return (
    <>
      {offSeason ? (
        <section className={styles.calendarioContainerOff}>
          <h2>Perídodo de offSeason</h2>
          <h3>Calendário: Setembro/2023</h3>
        </section>
      ) : schedule[0] ? (
        <section className={styles.calendarioContainer}>
          <h1>Calendário da Semana</h1>
          {bye.length > 0 && (
            <div className={styles.byeContainer}>
              <span className={styles.bye}>Bye: </span>
              {bye.map((item, index) =>
                index === bye.length - 1 ? (
                  <span key={index}>{`${item}.`}</span>
                ) : (
                  <span key={index}>{`${item}, `}</span>
                )
              )}
            </div>
          )}
          <div className={styles.calendarioGrid}>
            {myTeamsFav &&
              schedule.map((item) => (
                <ScheduleCard
                  awayName={item.awayName}
                  awayScore={item.awayScore}
                  homeName={item.homeName}
                  homeScore={item.homeScore}
                  date={item.date}
                  venue={item.venue}
                  key={item.id}
                  myTeams={myTeamsFav}
                />
              ))}
          </div>
        </section>
      ) : (
        <div className={styles.loadingPlace}>
          <Loading />
        </div>
      )}
    </>
  );
}

export default Calendario;
