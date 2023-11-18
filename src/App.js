import './App.css';
import React from 'react'
import Dice from './Dice';
import { nanoid } from 'nanoid'

function App() {
  const[dice,setDice] = React.useState(allNewDice());

  function generateNew(){
      return{
        value : Math.ceil(Math.random()*6),
        isHeld : false,
        id:nanoid()
      }
    
  }
  function allNewDice(){
    const newDice = []
    for(let i=0;i<10;i++){
        newDice.push(generateNew())
    }
    console.log(newDice)
    return newDice
  }

  const [count,setCount] = React.useState(0)
  const [min,setMin] = React.useState(1000)
  
  function rollDice(){
    if(!tenzie){
      setCount(prev=>prev+1)
      setDice(old=>old.map(die=>{
        return die.isHeld ? die : generateNew()
      })) 
    }else{
      setTenzie(false)
      setDice(allNewDice())
      setMin((prevMin) => Math.min(prevMin, count))
      setCount(0)
    }
  }
  

  function holdDie(id){
    setDice(pre => pre.map(die=>{
      return die.id === id ? {
        ...die,
        isHeld:!die.isHeld
      }:die
    }))
    console.log(id)
  }

  const diceElements = dice.map(dice => <Dice 
    key = {dice.id}
    value = {dice.value} 
    isHeld = {dice.isHeld}
    holdDie = {()=>holdDie(dice.id)}
    id = {dice.id}
  />)

    const [tenzie,setTenzie] = React.useState(false)

    React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
        setTenzie(true)
          console.log("You won!")
      }
  }, [dice])
  
  return (
    <main>
      {!tenzie?<h1>Count : {count}</h1>:<h1>Clicks to Win : {count}</h1>}
      <div className="dice-container">
          {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzie?"New Game":"Roll"}</button>
      <h1>Lowest Clicks to Win : {min}</h1>
    </main>
  );
}

export default App;
