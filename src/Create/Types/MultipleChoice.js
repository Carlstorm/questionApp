import style from './MultipleChoice.module.scss'

const optionTemplate = {value: "", correct: false}

export default function MultipleChoice({questionObj, onInput}) {

    if (!("options" in questionObj))
        questionObj.options = [optionTemplate]

    const event = {
        addOptions: () => {
            questionObj.options.push(optionTemplate)
            onInput("options", questionObj.options)
        },
        onInput: (e, index) => {
            let updateOptions = [...questionObj.options]
            updateOptions[index] = {
                ...updateOptions[index], 
                value: e.target.value
            }
            onInput("options", updateOptions)
        },
        onCorrect: (e, index) => {
            let updateOptions = [...questionObj.options]
            updateOptions[index] = {
                ...updateOptions[index], 
                correct: !e.target.checked
            }
            onInput("options", updateOptions)
        }
    }

    return (
        <div className={style.component}>
            <div className={style.labels}>
                <label>Svar</label>
                <label>Correct</label>
            </div>
            <div className={style.component_content}>
                {questionObj.options.map((o, i) => {
                    return (
                        <div key={"selectOptionText"+i} className={style.answers}>
                            <input value={o.value} onInput={(e) => event.onInput(e, i)} className={style.textInput} />
                            <div>
                                <input type="checkbox" className={style.checkInput} value={o.correct} checked={o.correct} onInput={(e) => event.onCorrect(e, i)} />
                            </div>
                        </div>
                    )
                })}
                <div onClick={() => event.addOptions()} className={style.add}><span>+</span></div>
            </div>
        </div>
    )
}