import logo from './logo.svg';
import './App.css';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';


function App() {
  const {id} = useParams();
  if (id)
    return <Questions id={id}/>
  return <SelectQuestions />
}

function Questions({id}) {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState(null)
  useEffect(() => {get()},[id])

  const get = async () => {
      const docRef = doc(db, "Questions", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        navigate("/");
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

function SelectQuestions() {
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
      navigate(`/${value}`);
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
