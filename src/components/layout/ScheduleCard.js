import { useState, useEffect } from 'react';
import styles from './ScheduleCard.module.css';
import { BsFillStarFill } from "react-icons/bs";

function ScheduleCard({ awayName, awayScore, homeName, homeScore, date, venue, myTeams }) {

    const [awayFlag, setAwayFlag] = useState(false);
    const [homeFlag, setHomeFlag] = useState(false);
    const [timer, setTimer] = useState(false);

    function dateFormat() {
        // date = `${date.slice(11,13) === '00' ? Number(date.slice(8,10)) -1 : date.slice(8,10) }/${date.slice(5,7)}/${date.slice(0,4)} - ${date.slice(11,13) === '00' ? '21' : Number(date.slice(11,13)) -3}:${date.slice(14,16)}`
        // date.slice(0, 1) === '0' && date.slice(1, 2) === '/' && (
        //     date = date.replace('0','01')
        //     )
        let dataObject = new Date(date)
        let timeObject = new Date(date)
        dataObject = dataObject.toLocaleDateString('pt-br', {dateStyle: 'short'})
        timeObject = timeObject.toLocaleTimeString('pt-br', {timeStyle: 'short'})
        date = `${dataObject} - ${timeObject}`
        
        
    }
    
    dateFormat()

    useEffect(() => {
        myTeams.map((item)=> {
            awayName === item ? setAwayFlag(true) : setAwayFlag(false)
            homeName === item ? setHomeFlag(true): setHomeFlag(false)
            return true; 
        })
        setTimer(true)
        //setAwayFlag(true) setHomeFlag(true)
        // eslint-disable-next-line 
    }, []);

    return(
            timer && (
                awayScore === '0' && awayScore === homeScore ? (
                    <div className={styles.scheduleCard}>
                        <div className={styles.mainInfo}>
                            <span className={styles.timeName}>{awayName}</span><span>{awayFlag && <BsFillStarFill />}</span><br/>      
                            <p>@</p> 
                            <span className={styles.timeName}>{homeName}</span><span>{homeFlag && <BsFillStarFill />}</span><br/>
                        </div>
                        <div className={styles.info}>
                            <p>{date}</p>
                            <p>{venue}</p>
                        </div>
                        
                    </div>
                ) : (
                    <div className={styles.scheduleCard}>
                        <div className={styles.mainInfo}>
                            <span className={styles.timeName}>{awayName}</span><span>{awayFlag && <BsFillStarFill />}</span><br/>
                            <p className={styles[Number(awayScore)>Number(homeScore)?'timeScoreWin':'timeScore']}>{awayScore}</p>
                            <p>@</p>
                            <p className={styles[Number(awayScore)<Number(homeScore)?'timeScoreWin':'timeScore']}>{homeScore}</p>  
                            <span className={styles.timeName}>{homeName}</span><span>{homeFlag && <BsFillStarFill />}</span><br/>
                        </div>
                        <div className={styles.info}>
                            <p>{date}</p>
                            <p>{venue}</p>
                        </div>
                    </div>
                ) 
            )
    )
}

export default ScheduleCard;