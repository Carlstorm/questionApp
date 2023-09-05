import logo from './logo.svg';
import './App.css';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

import style from './CreateQuestions.module.scss'
import Choice from './QuestionTypes/Choice';
import MultipleChoice from './QuestionTypes/MultipleChoice';
import Drag from './QuestionTypes/Drag';
import Text from './QuestionTypes/Text';

function App({homePagePath, createPagePath}) {
  const {id} = useParams();
  if (id)
    return <Questions id={id} homePagePath={homePagePath} />
  return <SelectQuestions homePagePath={homePagePath} createPagePath={createPagePath} />
}

function Questions({id, homePagePath}) {
  const ref = useRef(null)
  const navigate = useNavigate()
  const [questions, setQuestions] = useState(null)
  useEffect(() => {get()},[id])

  const get = async () => {
      const docRef = doc(db, "Questions", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        navigate(homePagePath);
        return
      }
      setQuestions(docSnap.data())
  }

  const para = () => {
    const headerElm = ref.current;
    const scrollHight = window.scrollY/6;

    headerElm.style.transform = `translateY(${scrollHight}px)`
  }

  useEffect(() => {
  

    window.addEventListener("scroll", para)
    return () => {
      window.removeEventListener("scroll", para)
    }
  },[ref.current])

  if (!questions)
    return <p className={style.load}>Loading...</p>


  const loadType = (type, q) => {
    switch (type) {
      case "0": return <Text question={q} />;
      case "1": return <Choice question={q} />;
      case "2": return <MultipleChoice question={q} />;
      case "3": return <Drag question={q} />;
    }
  }

  return (
    <div className={style.solvePage}>
      <div className={style.solvePage_header} ref={ref}>
        <h1>{questions.titel}</h1>
      </div>
      <div className={style.solvePage_wrap}>
        {questions.questions.map((q, i) => (
          <div key={"questionRender"+i} className={style.solvePage_question}>
            <div>
              <div className={style.solvePage_question_number_solved}>
                <span>{i}</span>
              </div>
            </div>
            <div>
              <h2>{q.question}</h2>
              {q.details ? <p>{q.details}</p> : null}
              {loadType(q.type, q)}
            </div>
          </div>
        ))}
        <div className={style.footer}>
          <div className={style.submitButton}>
            <div className={style.submitButton_wrapper}>
              <a href="#">Svar!</a>
              <div className={style.submitButton_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                  <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                </svg>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

function SelectQuestions({homePagePath, createPagePath}) {
  const navigate = useNavigate()
  const [questionsQuery, setQuestionsQuery] = useState([])
  useEffect(() => {get()},[])

  const get = async () => {
      const querySnapshot = await getDocs(collection(db, "Questions"));
      let queryData = []
      querySnapshot.forEach((doc) => {
          queryData.push({
              ...doc.data(),
              id: doc.id
          })
      });
      setQuestionsQuery(queryData)
  }


  const event = {
    select: (value) => {
      navigate(`${homePagePath}${value}`);
    }
  }

  return (
    <div className={style.home}>
      <div>
        <div>
          <label>Vælg Spørgeskema</label>
          <select name="selection" id="selection" onChange={(e) => event.select(e.target.value)}>
              {questionsQuery.map(q => (
                  <option key={q.id} value={q.id}>{q.titel}</option>
              ))}
              <option value="" disabled hidden selected>Vælg</option>
          </select>
        </div>
        <a href={"#"+createPagePath}>Lav/Rediger</a>
      </div>
    </div>
  )
}

export default App;
