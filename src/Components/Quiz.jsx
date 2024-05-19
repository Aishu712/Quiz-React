import React ,{useRef , useState}from 'react'
import "./Quiz.css"
import { data } from "../assets/data"

const Quiz = () => {
  let [index,setIndex] = useState(0);
  let [questions,setQuestions] = useState(data[index])
  let [lock,setLock] = useState(false)
  let [score,setScore] = useState(0) 
  let [over ,setOver] = useState(false)

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)
  let optionArray = [option1,option2,option3,option4]

  function checkans(e,id){
    if (lock === false){
      if(id === questions.ans){
        e.target.classList.add("correct")
        setLock(true)
        setScore(s => s+1)
      }
      else{
        e.target.classList.add("wrong")
        optionArray[questions.ans -1].current.classList.add("correct")
        setLock(true)
      }
    }
  }
  const nextquestion = ()=>{
    if( lock === true){
      if(index === data.length-1){
        setOver(true)
        return 0
      }
      setIndex(++index)
      setQuestions(data[index])
      setLock(false)
      optionArray.map((item) => 
        {
          item.current.classList.remove("wrong")
          item.current.classList.remove("correct")
        }
       )
      return null 
    }
    else{
      alert("Please choose one of the options!")
    }
    
  }
    
  
  const reset = ()=>{
    setIndex(0)
    setQuestions(data[0])
    setLock(false)
    setOver(false)
    setScore(0)
  }
  return <>
    <div className="wrapper">
      <h2>Quiz-App</h2>
      <hr></hr>
      {over ? <></> :
      <>
      <h3>{index+1}. {questions.question}</h3>
      <ul>
        <li ref={option1} onClick={(e)=>{ checkans(e,1)}}>{questions.option1}</li>
        <li ref={option2} onClick={(e)=>{ checkans(e,2)}}>{questions.option2}</li>
        <li ref={option3} onClick={(e)=>{ checkans(e,3)}}>{questions.option3}</li>
        <li ref={option4} onClick={(e)=>{ checkans(e,4)}}>{questions.option4}</li>
      </ul>
      <button onClick={nextquestion}>Next</button>
      <h5>{index+1} of {data.length} Questions</h5>
      </>
      }
      {over ? <>
        <h3>You scored {score} out of {data.length} </h3>
        <button onClick={reset}>Reset</button>
      </>:
      <></>
      }

    </div>

  </>
}

export default Quiz