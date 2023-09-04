import { useState } from 'react';
import style from './style.module.scss'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Header({questionArray, questionsQuery, setSelectedIndex, setQuestionArray, baseQuestionObj, get}) {

    const [title, setTitle] = useState("")
    const [id, setId] = useState("")

    const event = {
        upload: async () => {
            if (!title) {
                alert("skriv en titel gamle")
                return
            }
            if (id) {
                try {
                    const selectionsRef = doc(db, "Questions", id);
                    await updateDoc(selectionsRef, {
                        questions: questionArray,
                        titel: title,
                    });
                    get()
                    alert("Opdateret successfuldt!")
                    console.log("Document updating with ID: ", id);
                  } catch (e) {
                    console.error("Error updating document: ", e);
                  }
            } else {
                try {
                    const docRef = await addDoc(collection(db, "Questions"), {
                      questions: questionArray,
                      titel: title,
                    });
                    alert("Nyt spørgeskema tilføjet!!")
                    console.log("Document written with ID: ", docRef.id);
                    get(event.changeSelection, docRef.id)
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
            }
        },
        link: () => {
            alert(window.location.href.replace("create", id))
        },
        delete: async () => {
            const response = window.confirm("sikker på du vil slette?")
            if (!response)
                return
            try {
                const selectionsRef = doc(db, "Questions", id);
                await deleteDoc(selectionsRef);
                get(event.changeSelection, "new")
                alert("Slettet successfuldt!")
                console.log("Document Deleted with ID: ", id);
              } catch (e) {
                console.error("Error Deleting document: ", e);
              }
        },
        changeSelection: (value, query) => {
            setSelectedIndex(0)
            if (value === "new") {
                setQuestionArray([baseQuestionObj])
                setTitle("")
                setId("")
                return
            }
            let questionObj = {}
            if (query)
                questionObj = query.find(q => q.id === value)
            else
                questionObj = questionsQuery.find(q => q.id === value)
            setQuestionArray(questionObj.questions)
            setTitle(questionObj.titel)
            setId(questionObj.id)
        },
        changeTitle: (e) => {
            setTitle(e.target.value)
        }
    }

    return (
        <div className={style.header}>
            <select name="selection" id="selection" onChange={(e) => event.changeSelection(e.target.value)} className={style.selectInput}>
                {questionsQuery.map(q => (
                    <option key={q.id} value={q.id} selected={id === q.id} >{q.titel}</option>
                ))}
                <option value="new" selected={!id}>Ny +</option>
            </select>
            <input className={style.input} value={title} onInput={(e) => event.changeTitle(e)} placeholder='titel på spørgeskema'></input>
            {!id ?
            <div onClick={() => event.upload()} className={style.button}>
                <span>Gem</span>
            </div>
            : 
            <div className={style.button_wrap}>
                <div onClick={() => event.upload()} className={style.button}>
                    <span>Gem</span>
                </div>
                <a href={window.location.href.replace("create", id)} target="_blank" className={style.button_link}>
                    <span>Link</span>
                </a>
                <div onClick={() => event.delete()} className={style.button_delete}>
                    <span>Slet</span>
                </div>
            </div>
            }

        </div>
    )
}