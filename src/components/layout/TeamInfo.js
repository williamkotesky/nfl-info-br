import { useState, useEffect } from 'react';
import Loading from './Loading';
import styles from './TeamInfo.module.css';

function TeamInfo({ teamData, idData }) {
    const [stats, setStats] = useState();
 // eslint-disable-next-line
    const [team, setTeam] = useState(teamData || {});

    

    useEffect(() => {      
        setTimeout(() => {
            fetch(`http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/teams/${idData}/records/0?lang=en&region=us`, {
            method: "GET"
        })
        .then(resp => resp.json())
        .then(data => {
            setStats(data);
            
            })
        .catch(err => console.log(err))
        }, 1000);
        
    },[idData])
    
    return(
        <section className={styles.infoSection}>
            {stats ?
            <div className={styles.infoContainer}>
                <span className={styles.infoField}>Campanha Geral: </span><span>{stats.summary}</span><br/>
                <span className={styles.infoField}>Percentual de vitórias: </span><span>{`${stats.value*100}%`}</span><br/>
                <span className={styles.infoField}>Desempenho na divisão: </span><span>{stats.stats[19].displayValue}</span><br/>
                <span className={styles.infoField}>Sequência de vitórias: </span><span> {stats.stats[14].value}</span><br/>
                <span className={styles.infoField}>Percentual de vitórias na divisão: </span><span>{`${(Number(stats.stats[5].displayValue)*100).toFixed(1)}%`}</span><br/>
                <span className={styles.infoField}>Total de pontos marcados: </span><span>{stats.stats[13].displayValue}</span><br/>
                <span className={styles.infoField}>Total de pontos sofridos: </span><span>{stats.stats[12].displayValue}</span><br/>
                <span className={styles.infoField}>Saldo de pontuação: </span><span>{stats.stats[4].displayValue}</span><br/>
                <span className={styles.infoField}>Pontos por jogo: </span><span>{stats.stats[3].displayValue}</span><br/>
                <span className={styles.infoField}>Pontos sofridos por jogo: </span><span>{stats.stats[2].displayValue}</span><br/>
                <span className={styles.infoField}>Playoff Seed: </span><span>{`#${stats.stats[10].displayValue}`}</span><br/>

            </div>
        : <div className={styles.LoaderPlace}><Loading /></div>}
        </section>
    )
}


export default TeamInfo;