import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import NewsCard from '../layout/NewsCard';
import styles from './Home.module.css';
import ButtonLink from '../layout/ButtonLink';
import BigNewsCard from '../layout/BigNewsCard';
import React from 'react';
import { Link } from 'react-router-dom';


function Home() {

//flash msgs

//stars no calendario


  const [news, setNews] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`https://nfl-info-br-db.netlify.app/db.json/teams`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(resp => resp.json())
      .then(data => {
          setNews(data);
          setShowLoading(true);

          })
      .catch(err => console.log(err))
    }, 1000);
      
  }, []);
    
    
    return (
      <section className={styles.Homecontainer}>
          <div className={styles.title}>
            <h1>NFL INFO BR</h1>
            <h5>Site com informações dos seus times favoritos da liga</h5>
          </div>

          <div className={styles.newsContainer}>
            {news.slice(0).reverse().map((item, index)=> (
                  index === 0 && 
                    <div className={styles.bigNews} key={item.id}>
                      <BigNewsCard id={item.id} 
                                    title={item.title} 
                                    img={item.img} 
                                    alt={item.alt}
                                    key={item.id}  
                      />

                    <p>Para acessar a lista de news do site, </p> <span className={styles.linkList}><Link to="/newslist">clique aqui.</Link></span> 
                    </div> 
            ))}

            <div className={styles.smallNewsGrid}>
              {news.slice(0).reverse().map((item, index) => (
                index < 5 && 
                index !== 0 &&
                <div className={styles.smallNews} key={item.id}>
                  <NewsCard id={item.id} 
                            title={item.title} 
                            img={item.img} 
                            alt={item.alt}
                            key={item.id} 
                  />
                </div>
              ))

              }
              
            </div>  

          </div>
        
        {!showLoading && (<div className={styles.loaderPlace}><Loading /></div>)}
        {showLoading && news.length === 0 && (
          <div className={styles.zeroNews}>
            <p>Site sem news. Escreva uma news clicando no botão abaixo:</p>
            <ButtonLink to="/writenews" text="Escrever News" />
          </div>
        )}
      </section> 
          
    )
}

export default Home;

// src="https://img2.thejournal.ie/article/3179351/river?version=3179540&width=1340"
         
// src="https://media.gq-magazine.co.uk/photos/5d13ad354113b55f8e46adb7/16:9/w_1280,c_limit/New-England-Patriots-06-GQ-18Oct17_getty_b.jpg"

// src="https://www.al.com/resizer/CT0GBMGt71D4wxpodbx-WB_GmQQ=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/ZCOR2EFZ7VHQZNPMGZBGKEWLCM.jpg"
          


// Math.max(...news.map(item => item.id))
// news.slice(0).reverse().map((item, index)=> ())