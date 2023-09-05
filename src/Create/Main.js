import Choice from "./Types/Choice"
import Drag from "./Types/Drag"
import MultipleChoice from "./Types/MultipleChoice"
import Text from "./Types/Text"

import style from './style.module.scss'

export default function Main(props) {

    const {questionArray, setQuestionArray, selectedIndex} = props

    const questionObj = questionArray[selectedIndex]

    const event = {
        onInput: (name, value) => {
            const UpdatedQuestionArray = [...questionArray]
            UpdatedQuestionArray[selectedIndex] = {
                ...{...questionObj},
                [name]: value
            }
            setQuestionArray(UpdatedQuestionArray)
        },
    }

    return (
        <div className={style.main}>
            <div>
                <label for="questionName">Spørgsmål</label>
                <textarea onInput={(e) => event.onInput(e.target.name, e.target.value)} id="questionName" name="question" value={questionObj.question} />
            </div>

            <div>
                <label for="questionDetails">Detaljer</label>
                <textarea 
                    onInput={(e) => event.onInput(e.target.name, e.target.value)}
                    name="details"
                    id="questionDetails"
                    value={questionObj.details}
                />
            </div>

            <div>
                <label for="questionType">Type</label>
                <select value={questionObj.type} onChange={(e) => event.onInput(e.target.name, e.target.value)} name="type" id="questionType">
                    <option value="0">text</option>
                    <option value="1">choice</option>
                    <option value="2">multiple choice</option>
                    <option value="3">drag</option>
                </select>
            </div>

            {questionObj.type === "0" ? <div>
                <Text questionObj={questionObj} onInput={event.onInput} />
            </div> : questionObj.type === "1" ? <div>
                <Choice questionObj={questionObj} onInput={event.onInput} />
            </div> : questionObj.type === "2" ? <div>
                <MultipleChoice questionObj={questionObj} onInput={event.onInput} />
            </div> : questionObj.type === "3" ? <div>
                <Drag />
            </div> : <span>slam kode ;/</span>}
        </div>
    )
}