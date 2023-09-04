import logo from './logo.svg';
import './App.css';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';


function App({homePagePath}) {
  const {id} = useParams();
  if (id)
    return <Questions id={id} homePagePath={homePagePath} />
  return <SelectQuestions homePagePath={homePagePath} />
}

function Questions({id, homePagePath}) {
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

  if (!questions)
    return <p>loading</p>

  return <p>
    {JSON.stringify(questions)}
  </p>
}

function SelectQuestions({homePagePath}) {
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
    <select name="selection" id="selection" onChange={(e) => event.select(e.target.value)}>
        {questionsQuery.map(q => (
            <option key={q.id} value={q.id}>{q.titel}</option>
        ))}
        <option value="" disabled hidden selected>Vælg</option>
    </select>
  )
}

export default App;
