import { useNavigate } from "react-router-dom";
import TeamsForm from "../teams/TeamsForm";
import styles from "./NewTeam.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function NewTeam() {
  const history = useNavigate();
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
  const [teamNameError, setTeamNameError] = useState(false);

  function createPost(team) {
    const teamNameCheck = teams.find((item) => item === team.name);
    if (teamNameCheck === undefined) {
      setTeamNameError(true);
      return;
    }

    if (!localStorage.getItem("localStorageTeams")) {
      const localStorageTeams = { teams: [] };
      localStorage.setItem(
        "localStorageTeams",
        JSON.stringify(localStorageTeams)
      );
    }

    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageTeams")
    );

    // function teamsId() {
    //   if (
    //     localStorageRecover &&
    //     Object.keys(localStorageRecover).length === 0
    //   ) {
    //     return 6;
    //   }
    //   return 6 + Object.keys(localStorageRecover.teams).length; //ALTERAR?????????????
    // }

    const teamsIdValue = uuidv4();
    const idNumber = parseInt(teamsIdValue.replace(/-/g, ""), 16);
    team = { ...team, id: idNumber };
    localStorageRecover && localStorageRecover.teams.push(team);

    localStorage.setItem(
      "localStorageTeams",
      JSON.stringify(localStorageRecover)
    );
    history("/times");
    // fetch('http://localhost:5000/teams', {
    //     method: 'POST',
    //     headers: {
    //         "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(team)
    // }).then((resp) => resp.json())
    // .then((data) => {
    //     history('/times', {state: { message: 'Time registrado com sucesso' }})

    // })
    // .catch((err) => console.log(err));
  }

  return (
    <section className={styles.newTeamContainer}>
      <h2 className={styles.newTeamContainerTitle}>Registre um novo time:</h2>
      {teamNameError && (
        <div className={styles.showTeamNameError}>
          <p>O nome do time foi digitado incorretamente.</p>
        </div>
      )}
      <TeamsForm handleSubmit={createPost} btnText="Registrar Time" />
    </section>
  );
}

export default NewTeam;
