import style from './Choice.module.scss'

export default function Text({questionObj, onInput}) {

    if (!("answers" in questionObj))
        questionObj.answers = [""]

    const event = {
        addOptions: () => {
            questionObj.answers.push("")
            onInput("answers", questionObj.answers)
        },
        onInput: (e, index) => {
            let updateAnswers = [...questionObj.answers]
            updateAnswers[index] = e.target.value
            onInput("answers", updateAnswers)
        },
    }

    return (
        <div className={style.component}>
            <div className={style.labels}>
                <label>Svar</label>
            </div>
            <div className={style.component_content}>
                {questionObj.answers.map((o, i) => {
                    return (
                        <div key={"selectOptionText"+i} className={style.answers}>
                            <input value={o} onInput={(e) => event.onInput(e, i)} className={style.textInput} />
                        </div>
                    )
                })}
                <div onClick={() => event.addOptions()} className={style.add}><span>+</span></div>
            </div>
        </div>
    )
}