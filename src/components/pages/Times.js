import { useState, useEffect } from "react";
import ButtonLink from "../layout/ButtonLink";
import Card from "../layout/Card";
import Loading from "../layout/Loading";
import Content from "../data/Content";
import styles from "./Times.module.css";

function Times() {
  const [teams, setTeams] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showTeamErrorDelete, setShowTeamErrorDelete] = useState(false);

  useEffect(() => {
    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageTeams")
    );
    if (localStorageRecover !== null) {
      setTeams(Content.teams.concat(localStorageRecover.teams));
      setRemoveLoading(true);
      return;
    }

    setTeams(Content.teams);
    setRemoveLoading(true);
  }, []);

  function removeTeam(id) {
    if (id <= 5 && id % 1 === 0) {
      setShowTeamErrorDelete(true);
      return;
    }

    const localStorageRecover = JSON.parse(
      localStorage.getItem("localStorageTeams")
    );
    const teamsArray = localStorageRecover.teams;
    const newTeamsArray = teamsArray.filter((item) => item.id !== id);
    localStorageRecover.teams = newTeamsArray;
    localStorage.setItem(
      "localStorageTeams",
      JSON.stringify(localStorageRecover)
    );

    if (newTeamsArray.length === 0) {
      localStorage.removeItem("localStorageTeams");
      window.location.reload();
      window.scrollTo(0, 0);
      return;
    }
    window.location.reload();
    window.scrollTo(0, 0);
  }

  return (
    <section className={styles.timesContainer}>
      <div>
        <h1>Times Favoritos</h1>
      </div>
      <div className={styles.linkDiv}>
        <ButtonLink to="/newteam" text="Registrar novo time" />
      </div>

      {showTeamErrorDelete && (
        <div className={styles.showTeamErrorClass}>
          <p>Você não pode deletar informações preexistentes</p>
        </div>
      )}

      <div className={styles.timesGrid}>
        {teams.length > 0 &&
          teams.map((team) => (
            <Card
              id={team.id}
              name={team.name}
              img={team.img}
              titles={team.sb_titles}
              conference={team.conference ? team.conference.name : "none"}
              division={team.division ? team.division.name : "none"}
              key={team.id}
              handleRemove={removeTeam}
            />
          ))}
        {!removeLoading && (
          <div className={styles.loadingPlace}>
            <Loading />
          </div>
        )}
        {removeLoading && teams.length === 0 && (
          <p className={styles.zeroCadastro}>Não há times cadastrados.</p>
        )}
      </div>
    </section>
  );
}

export default Times;
