import React, { useState } from 'react';
import './App.scss';

const drumSounds = [
  { 
    keyCode: 81,
    key: 'Q', 
    id: 'Heater 1', 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  { 
    keyCode: 87,
    key: 'W', 
    id: 'Heater 2', 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' 
  },
  { 
    keyCode: 69,
    key: 'E', 
    id: 'Heater 3', 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' 
  },
  { 
    keyCode: 65,
    key: 'A', 
    id: 'Heater 4', 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' 
  },
  { 
    keyCode: 83,
    key: 'S', 
    id: 'Clap', 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' 
  },
  { 
    keyCode: 68,
    key: 'D', 
    id: 'Open HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' 
  },
  { 
    keyCode: 90,
    key: 'Z', 
    id: "Kick n' Hat", 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' 
  },
  { 
    keyCode: 88,
    key: 'X', 
    id: 'Kick', 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' 
  },
  { 
    keyCode: 67,
    key: 'C', 
    id: 'Closed HH', 
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' 
  }
];  

const KeyboardKey = ({play, sound: {keyCode, key, id, src}, setDisplay}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleKeydown = (event) => {
    if (event.keyCode === keyCode) {
      play(key);
      setIsPressed(true);
      setDisplay(id);
    }
  }

  const handleKeyup = (event) => {
    if (event.keyCode === keyCode) {
      setIsPressed(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [])

  const buttonStyle = isPressed ? {background: 'var(--neutral-5)', borderColor: 'var(--neutral-4)'} : {};

  return (
    <button id={id}
      className="drum-pad"
      onClick={() => {play(key); setDisplay(id);}}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={buttonStyle} >
      {key}
      <audio id={key} src={src} className="clip" />
    </button>
  )
}

const DrumPad = ({play, setDisplay}) => {
  return drumSounds.map((sound) => <KeyboardKey play={play} sound={sound} setDisplay={setDisplay} />)
}


function DrumMachine() {
  const [display, setDisplay] = useState('');
  const play = (key) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play().catch((error) => console.log(error));
  }


  return (
    <>
      <div id="drum-machine">
        <DrumPad play={play} setDisplay={setDisplay} />
      </div>

      <div className="displayContainer">
        <h2 className="subHeading" >Sound</h2>
        <div id="display">
          <h3 className="displayText" >{display}</h3>
        </div>
      </div>
    </>
  );
}

export default DrumMachine;