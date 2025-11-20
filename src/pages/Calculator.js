import React, { useEffect, useRef, useState } from 'react';


const Calculator = ({ fag_data, studiefag }) => {
  /*const fag_data = {
    0: {},
    1: { 0: { name: "Produksjon og historiefortelling", ukeTimer: 5.5 }, 1: { name: "Konseptutvikling og programmering", ukeTimer: 5.5 }, 2: { name: "Teknologiforståelse", ukeTimer: 5.5 }, 3: { name: "YFF", ukeTimer: 6 }, 4: { name: "Engelsk", ukeTimer: 5 }, 5: { name: "Matte", ukeTimer: 3 }, 6: { name: "Naturfag", ukeTimer: 2 }, 7: { name: "Gym", ukeTimer: 2 }, name: "VG1", fag: 8 },
    1: { 0: { name: "Brukerstøtte", ukeTimer: 5 }, 1: { name: "Driftsstøtte", ukeTimer: 6 }, 2: { name: "Utvikling", ukeTimer: 6 }, 3: { name: "YFF", ukeTimer: 9 }, 4: { name: "Norsk", ukeTimer: 4 }, 5: { name: "Samfunnsfag", ukeTimer: 3 }, 6: { name: "Gym", ukeTimer: 2 }, name: "VG2 - IT", fag: 7 },
    2: { 0: { name: "Design og visualisering", ukeTimer: 5.5 }, 1: { name: "Konseptutvikling og kommunikasjon", ukeTimer: 5.5 }, 2: { name: "Teknologi og produksjon", ukeTimer: 5.5 }, 3: { name: "YFF", ukeTimer: 9 }, 4: { name: "Norsk", ukeTimer: 4 }, 5: { name: "Samfunnsfag", ukeTimer: 3 }, 6: { name: "Gym", ukeTimer: 2 }, name: "VG2 - Medie", fag: 7 },
  }*/

  const [fagID, setFagID] = useState(0);
  const handleFagChange = (event) => {
    setFagID(event.target.value);
  }

  const [timerVekke, setTimerVekke] = useState(0);
  const handleTimerVekkeChange = (event) => {
    setTimerVekke(event.target.value);
  }

  const [wholePercent, setWholePercent] = useState(0);
  const [halfPercent, setHalfPercent] = useState(0);
  const calculatePercent = () => {
    if (fag_data[yearID]["name"] === "Velg ett årsløp...") {
      setWholePercent("Velg ett årsløp over\n")
      setHalfPercent("Velg ett årsløp over\n")
      return;
    }

    console.log(parseFloat(fag_data[yearID][fagID].timer));


    if (studiefag) {
      setWholePercent((timerVekke / (parseFloat(fag_data[yearID][fagID].timer) * 38) * 100).toFixed(2));
      setHalfPercent((timerVekke / (parseFloat(fag_data[yearID][fagID].timer) * 19) * 100).toFixed(2));
    } else {
      setWholePercent(Math.round((((timerVekke * 0.75) / (parseInt(fag_data[yearID][fagID].timer))) * 100) * 100) / 100);
      setHalfPercent(Math.round((((timerVekke * 0.75) / (parseInt(fag_data[yearID][fagID].timer))) * 100) * 100) / 50);
    }

  }


  const [yearID, setYearID] = useState(0);
  const [optionsArray, setOptionsArray] = useState([]);

  useEffect(() => {
    if (fag_data && Object.keys(fag_data).length > 0) {
      const firstValidYearKey = Object.keys(fag_data).find(key => fag_data[key].name !== "pause");
      if (firstValidYearKey !== undefined) {
        setYearID(firstValidYearKey);

        const year = fag_data[firstValidYearKey];
        const options = [];

        for (let x = 0; x < year.fag; x++) {
          options.push(<option key={x} value={x}>{year[x].name}</option>);
        }

        setOptionsArray(options);
        setFagID(0);
      }
    }
  }, [fag_data]);


  const handleYearChange = (event) => {
    const year = event.target.value;
    setYearID(year);
    let options = [];
    for (let x = 0; x < fag_data[year].fag; x++) {
      options.push(<option key={x} value={x}>{fag_data[year][x].name}</option>);
    }
    setOptionsArray(options);

    setFagID(0);
  }


  /*const [optionsElement, setOptionsElement] = useState("");
  console.log(fag_data[fagID].fag);
  for (let x = 0; x < fag_data[fagID].fag; x++) {
    //const element = fag_data[fagID][x];
    setOptionsElement("<option value='7'>{fag_data[yearID][7].name}</option>")
  }*/


  console.log(fag_data);
  const keys = Object.keys(fag_data);

  const yearsData = [];
  for (let x = 0; x < keys.length; x++) {
    const name = fag_data[x]["name"];
    const fag = x;

    if (name === "pause") {
      const label = fag_data[x]["label"];
      yearsData.push([name, fag, label])
    }
    else {
      yearsData.push([name, fag]);
    }
  }
  console.log(yearsData);



  const timerRef = useRef(null);
  const handleFocus = () => {
    if (timerRef.current) {
      timerRef.current.select();
    }
  };


  return (
    <div className="App">
      {/*<h1>Informasjonsteknologi og medieproduksjon:</h1><br />*/}

      <form>
        <label htmlFor="year">Velg ett årsløp:</label><br />
        <select name="year" id="year" onChange={handleYearChange}>
          {/*<option value="null">Velg ett årsløp...</option>
          <option value="0">VG1</option>*/}

          {/*<option value="1">VG2 - IT</option>
          <option value="2">VG2 - Medie</option>*/}

          {
            yearsData.map((year) => (
              year[2] ? <optgroup key={year[1]} label={year[2]}></optgroup> : <option key={year[1]} value={year[1]}>{year[0]}</option>
            ))
          }
        </select><br /><br /><br />

        <label htmlFor="fag">Hvilket fag skal du ta fri fra?</label><br />
        <select name="fag" id="fag" onChange={handleFagChange}>
          {optionsArray}
        </select><br /><br /><br />

        <label htmlFor="timer">Hvor mange timer skal du ta fri?</label><br />
        <input type="number" name="timer" id="timer" value={timerVekke} onChange={handleTimerVekkeChange} onFocus={handleFocus} ref={timerRef} />

      </form>

      <button onClick={calculatePercent}>Regn ut:</button><br /><br />

      <div id="percents">
        <div>
          <strong>Fravær i prosent:</strong>
          {wholePercent > 10 ? <p style={{ color: '#FF0000' }}>{wholePercent}%</p> : wholePercent > 5 ? <p style={{ color: '#ff8c00' }}>{wholePercent}%</p> : <p>{wholePercent}%</p>}
          {wholePercent > 10 ? <p>❗</p> : wholePercent > 5 ? <p>⚠️</p> : <p></p>}
        </div>


      </div>
      <br /><br /><br /><br /><br />
      <a style={{ textDecoration: "underline" }} href="/rapporter">Funnet en feil? Rapporter den her!</a>
    </div>
  );
}

export default Calculator;