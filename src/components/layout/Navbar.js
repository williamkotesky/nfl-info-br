import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import styles from './Navbar.module.css';

function Navbar() {

  const [positionClass, setPositionClass] = useState('navMenuItems');
  const [displayClass, setDisplayClass] = useState('navMenu');
  const [flag, setFlag] = useState(false);

  function moveMenu() {
    function positionMenu() {
      return new Promise(resolve => {
        if (!flag) {
          setTimeout(() => {
            setPositionClass('navRight')
            setFlag(true)
            resolve()
            return;
          }, 50);
        }
        setPositionClass('navMenuItems')
        resolve()
        return;
      });
    }

    function displayMenu() {
      return new Promise(resolve => {
        if (!flag) {
          setDisplayClass('navDisplayFlex')
          resolve()
          return;
        }

        setTimeout(() => {
          setDisplayClass('navMenu')
        }, 500);
        setFlag(false)
        resolve()
        return;
      });
    }

    async function menuControl() {
      !flag ? await displayMenu() : await positionMenu()
      flag ? await displayMenu() : await positionMenu()
    }
    menuControl();
  }

  return (
    <>
      <nav className={styles.nav}>
        <Link to='/'><h1 className={styles.nflLogo}>NFL INFO BR</h1></Link>

        <label htmlFor="check" className={styles.checkBtn} onClick={moveMenu}>< FaAlignJustify /></label>
        <ul className={styles.navItems}>
          <li><NavLink to='/'  className={({ isActive }) =>
              isActive ? styles.active : undefined} >Home</NavLink></li>
          <li><NavLink to='/times'  className={({ isActive }) =>
              isActive ? styles.active : undefined} >Times</NavLink></li>
          <li><NavLink to='/stats'  className={({ isActive }) =>
              isActive ? styles.active : undefined} >Stats</NavLink></li>
          <li><NavLink to='/calendario'  className={({ isActive }) =>
              isActive ? styles.active : undefined} >Calendario</NavLink></li>
          <li><NavLink to='/writenews'  className={({ isActive }) =>
              isActive ? styles.active : undefined} >Escrever News</NavLink></li>
        </ul>

      </nav>

      <div className={styles[displayClass]}>
        <ul className={styles[positionClass]}>
          <li><NavLink to='/' onClick={moveMenu} className={({ isActive }) =>
              isActive ? styles.active : undefined}>Home</NavLink></li>
          <li><NavLink to='/times' onClick={moveMenu} className={({ isActive }) =>
              isActive ? styles.active : undefined}>Times</NavLink></li>
          <li><NavLink to='/stats' onClick={moveMenu} className={({ isActive }) =>
              isActive ? styles.active : undefined}>Stats</NavLink></li>
          <li><NavLink to='/calendario' onClick={moveMenu} className={({ isActive }) =>
              isActive ? styles.active : undefined}>Calendario</NavLink></li>
          <li><NavLink to='/writenews' onClick={moveMenu} className={({ isActive }) =>
              isActive ? styles.active : undefined} >Escrever News</NavLink></li>
        </ul>
      </div>

    </>
  );
}

export default Navbar;

