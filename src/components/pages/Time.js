import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import TeamsForm from "../teams/TeamsForm";
import Content from "../data/Content";
import ButtonLink from "../layout/ButtonLink";
import TeamInfo from "../layout/TeamInfo";
import styles from "./Time.module.css";

function Time() {
  const history = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [showTeamsForm, setShowTeamsForm] = useState(false);
  const [teamId, setTeamId] = useState();
  const [showTeamErrorEdit, setShowTeamErrorEdit] = useState(false);
  const [teamNameError, setTeamNameError] = useState(false);
  const teams = [
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
  ];

  useEffect(() => {
    let clickedTeam;
    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageTeams")
    );
    if (localStorageRecover !== null) {
      const teamConcat = Content.teams.concat(localStorageRecover.teams);
      clickedTeam = teamConcat.find((item) => item.id === Number(id));
      setTeam(clickedTeam);
      return;
    }
    clickedTeam = Content.teams.find((item) => item.id === Number(id));
    setTeam(clickedTeam);
  }, [id]);

  useEffect(() => {
    IdSearch();
    // eslint-disable-next-line
  }, []);

  function IdSearch() {
    for (let i = 0; i < teams.length; i++) {
      if (team.name === teams[i]) {
        setTeamId(i);
      }
    }
  }

  function editPost(upDatedteam) {
    const teamNameCheck = teams.find((item) => item === upDatedteam.name);
    if (teamNameCheck === undefined) {
      setTeamNameError(true);
      return;
    }

    if (upDatedteam.id <= 5 && id % 1 === 0) {
      setShowTeamErrorEdit(true);
      return;
    }

    const localStorageRecover = JSON.parse(
      localStorage.getItem(`localStorageTeams`)
    );

    const teamsArray = localStorageRecover.teams;
    let upDatedData = teamsArray.map((item) => {
      if (item.id === team.id) {
        return upDatedteam;
      }
      return item;
    });

    localStorageRecover.teams = upDatedData;
    localStorage.setItem(
      "localStorageTeams",
      JSON.stringify(localStorageRecover)
    );
    history("/times");
  }

  function toggleTeamsForm() {
    setShowTeamsForm(!showTeamsForm);
  }

  return (
    <>
      {team.name ? (
        <section className={styles.timeContainer}>
          <h1>{team.name}</h1>
          <div className={styles.timeBtns}>
            <button className={styles.actionBtn} onClick={toggleTeamsForm}>
              {!showTeamsForm ? "Info" : "Editar"}
            </button>
            <ButtonLink to="/times" text="Voltar" />
          </div>
          {teamNameError && (
            <div className={styles.showTeamNameError}>
              <p>O nome do time foi digitado incorretamente.</p>
            </div>
          )}

          {showTeamsForm ? (
            <>{teamId && <TeamInfo idData={teamId} />}</>
          ) : (
            <TeamsForm
              handleSubmit={editPost}
              btnText="Concluir edição"
              teamData={team}
              teamError={showTeamErrorEdit}
            />
          )}
        </section>
      ) : (
        <div className={styles.loaderPlace}>
          <Loading />
        </div>
      )}
    </>
  );
}

export default Time;
