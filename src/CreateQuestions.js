import { useEffect, useState } from "react"
import Main from "./Create/Main"
import Sidebar from "./Create/Sidebar"

import style from './CreateQuestions.module.scss'
import Header from "./Create/Header"
import { db } from "./firebase"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs } from "firebase/firestore"


const baseQuestionObj = {question: "blank", type: "0", details: ""}

export default function CreateQuestionsAuth({createPagePath, homePagePath}) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState(null)

    const auth = getAuth();

    const event = {
        login: (e) => {
            e.preventDefault()
            let email = document.getElementById("email").value
            let password = document.getElementById("password").value
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.removeEventListener("keydown", event.login)
                setLoggedIn(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode+" "+errorMessage)
          });
        },
    }

    if (!loggedIn) {
        return (
            <div className={style.logIn}>
                <form onSubmit={(e) => {
                    event.login(e)
                }}>
                    {error ? <span>{error}</span> : null}
                    <div>
                        <label for="email">Email</label>
                        <input name="email" id="email" required></input>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" required></input>
                    </div>
                    <button type="submit">Log in</button>
                </form>
            </div>
        )
    } else {
        return <CreateQuestions createPagePath={createPagePath} homePagePath={homePagePath} />
    }

}

function CreateQuestions({createPagePath, homePagePath}) {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [questionArray, setQuestionArray] = useState([baseQuestionObj])
    const [questionsQuery, setQuestionsQuery] = useState([])

    const props = {
        questionsQuery,
        questionArray,
        setQuestionArray,
        selectedIndex,
        setSelectedIndex,
        baseQuestionObj,
    }

    useEffect(() => {get()},[])

    const get = async (callbackFunction, val) => {
        const querySnapshot = await getDocs(collection(db, "Questions"));
        let queryData = []
        querySnapshot.forEach((doc) => {
            queryData.push({
                ...doc.data(),
                id: doc.id
            })
        });
        setQuestionsQuery(queryData)
        if (callbackFunction && val)
            callbackFunction(val, queryData)
    } 
    
    return (
        <div className={style.page}>
            <Header {...props} get={get} createPagePath={createPagePath} homePagePath={homePagePath} />
            <div className={style.page_container}>
                <Sidebar {...props} />
                <Main {...props} />
            </div>
        </div>
    )
}