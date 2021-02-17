import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import useKeyPress from '../typing/useKeyPress';
import { generate } from '../typing/words';
import { currentTime } from '../typing/time';
import Modal from '../templates/modal';

import '../index.css'
const initialWords = generate();

function App(props) {

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');
  const [modalopen, setModalopen] = useState(false);

  const countdown=()=> {
    var seconds = 60;
    var counter = document.getElementById("counter");
    var shw = document.getElementById("show");
    shw.innerHTML=""
    clearTimeout(counter);       
    function tick() {
      seconds--;
      if(counter!==null)
      {
        counter.innerHTML = (seconds < 10 ? "0" : "") + String(seconds)+"s";
        if( seconds > 0 ) {
          setTimeout(tick, 1000);
        } else {
          counter.innerHTML = "";
          setModalopen(true)
        //alert("Timed Out...You can try Resent Option..!!");
      }
    }
  }
  tick();
}
  const clickRestart=()=>{
    setModalopen(!modalopen)
    window.location.reload()
  }
  const clickRegister=()=>{
    setModalopen(!modalopen)
    props.history.push('/Register')
  }

  useEffect(()=>{
    
  })
  useKeyPress(key => {
    if (!startTime) {
      countdown();
      setStartTime(currentTime());
    }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);

      if (incomingChars.charAt(0) === ' ') {
        setWordCount(wordCount + 1);
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
      else if(wpm>0) {
         setWpm(wpm-0.5)
      }
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2,
      ),
    );
  });

  const typingfailed=(
  <div>
    <Table bordered>
          <thead>
          <tr>
            <th style={{background:'gainsboro'}}>WPM :</th>
            <th>{wpm}</th>
            <th style={{background:'gainsboro'}}>Accuracy :</th>
            <th>{accuracy}</th>
          </tr>
          </thead>          
        </Table>
    <img src="https://img.icons8.com/emoji/96/000000/downcast-face-with-sweat.png"/>
    <h5 style={{color:'crimson'}}>Ohhhh...!! Your WPM is under 10...!!</h5>
    <p>Don't Worry..!! Just Press <strong>Restrat Test</strong> to Typify...!!</p>
  </div>
    )

const typingsuccess=(
  <div>
    <Table bordered>
          <thead>
          <tr>
            <th style={{background:'gainsboro'}}>WPM :</th>
            <th>{wpm}</th>
            <th style={{background:'gainsboro'}}>Accuracy :</th>
            <th>{accuracy}</th>
          </tr>
          </thead>          
        </Table>
    <img src="https://img.icons8.com/color/96/000000/party-baloons.png"/>
    <h5 style={{color:'crimson'}}>Congratulations...!!</h5>
    <p>You are qualified for Freelance Typers..!!</p>
  </div>
    )

  return (

    <div className="App">
      <header className="App-header">
      <h1>Welcome to the Freelance Typers</h1>
      <div id="show">Just Press Key To Start Test...!!</div>
      <div className="App-logo" id="counter" style={{fontSize:'100px'}}></div>
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
        <h3>
          WPM: {wpm} | ACC: {accuracy}%
        </h3>
        </header>
        {modalopen?(wpm>10?<Modal open={true} button1='Enter Freelance' clickButton1={clickRegister} button2='Restart Test' clickButton2={clickRestart} modalheader="Test Result" modalbody={typingsuccess} />:<Modal open={true} button2='Restart Test' clickButton2={clickRestart} modalheader="Test Result" modalbody={typingfailed} />):''}
    </div>
  );
}

export default App;
