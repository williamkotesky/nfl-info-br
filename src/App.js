import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/layout/ScroolToTop";
import Home from "./components/pages/Home";
import Times from "./components/pages/Times";
import Stats from "./components/pages/Stats";
import Calendario from "./components/pages/Calendario";
import NewTeam from "./components/pages/NewTeam";
import Time from "./components/pages/Time";
import NovaNews from "./components/pages/NovaNews";
import News from "./components/pages/News";
import NewsList from "./components/pages/NewsList";
import styles from "./App.module.css";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="times" element={<Times />} />
        <Route path="stats" element={<Stats />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="writenews" element={<NovaNews />} />
        <Route path="newteam" element={<NewTeam />} />
        <Route path="times/:id" element={<Time />} />
        <Route path="/:id" element={<News />} />
        <Route path="/:id/:title" element={<News />} />
        <Route path="newslist" element={<NewsList />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
