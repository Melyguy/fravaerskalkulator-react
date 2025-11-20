import { useSearchParams } from "react-router-dom"
import '../../src/App.css';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const Home = ({ redirect }) => {
  const cookies = new Cookies();


  const isUpdating = false; //change to true when updating
  useEffect(() => {
    if (isUpdating) {
      toast((t) => (
        <span>
          <p>Denne siden er under oppdatering og små feil/mangler må påregnes!⚠️</p>
          <p>Opplever du vedvarende feil? <br></br><a style={{ textDecoration: "underline" }} href="/rapporter">Rapporter de her!</a></p>
          <a onClick={() => toast.dismiss(t.id)} style={{ textDecoration: "underline", cursor: "pointer" }}>Lukk</a>
        </span>
      ), {
        duration: 10000,
        icon: "⚠️"
      });
    }
  })


  let linjeCookie = cookies.get('linjeCookie');
  if (linjeCookie === undefined) {
    console.log("LinjeCookie is undefined");
  } else {
    if (redirect === true) {
      return <Navigate to={linjeCookie} replace={true} />
    }
  }


  return (
    <div className='app'>
      {/*<div className='breadCrumbsContainer'>
        <a id='breadcrumbsLink' href='/home' color='inherit'>Hjem</a>
      </div>*/}
      <Toaster/>
      <div className="headerContainer">
        
      </div>

      <div id="linjeContainer">
        <a href="/studiefag/0?linjeId=0"> <div className="studiefag_button_home" id="linje_page_buttons"> <h2>Idrettsfag</h2> </div> </a>
        <a href="/studiefag/1?linjeId=1"> <div className="studiefag_button_home" id="linje_page_buttons"> <h2>Kunst, design og arkitektur</h2> </div> </a>
        <a href="/studiefag/2?linjeId=2"> <div className="studiefag_button_home" id="linje_page_buttons"> <h2>Medier og kommunikasjon</h2> </div> </a>
        <a href="/studiefag/3?linjeId=3"> <div className="studiefag_button_home" id="linje_page_buttons"> <h2>Musikk, dans og drama</h2> </div> </a>
        <a href="/studiefag/4?linjeId=4"> <div className="studiefag_button_home" id="linje_page_buttons"> <h2>Studiespesialisering</h2> </div> </a>
      </div>

      <br />

      <div id="linjeContainer">
        <a href="/yrkesfag/0?linjeId=0"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Bygg- og anleggsteknikk</h2> </div> </a>
        <a href="/yrkesfag/1?linjeId=1"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Elektro og datateknologi</h2> </div> </a>
        <a href="/yrkesfag/2?linjeId=2"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Frisør, blomster, interiør og eksponeringsdesign</h2> </div> </a>
        <a href="/yrkesfag/3?linjeId=3"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Helse- og oppvekstfag</h2> </div> </a>
        <a href="/yrkesfag/4?linjeId=4"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Håndverk, design og produktutvikling</h2> </div> </a>
        <a href="/yrkesfag/5?linjeId=5"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Informasjonsteknologi og medieproduksjon</h2> </div> </a>
        <a href="/yrkesfag/6?linjeId=6"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Naturbruk</h2> </div> </a>
        <a href="/yrkesfag/7?linjeId=7"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Restaurant- og matfag</h2> </div> </a>
        <a href="/yrkesfag/8?linjeId=8"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Salg, service og reiseliv</h2> </div> </a>
        <a href="/yrkesfag/9?linjeId=9"> <div className="yrkesfag_button_home" id="linje_page_buttons"> <h2>Teknologi- og industrifag</h2> </div> </a>
      </div>

    
    </div>
  )
}

export default Home;