import style from './style.module.scss'

export default function Sidebar({questionArray, setQuestionArray, selectedIndex, setSelectedIndex, baseQuestionObj}) {

    const event = {
        newQuestion: () => {
            let UpdatedQuestionArray = [...questionArray]
            UpdatedQuestionArray.push(baseQuestionObj)
            setQuestionArray(
                UpdatedQuestionArray
            )
            setSelectedIndex(questionArray.length)
        },
        setSelected: (index) => {
            setSelectedIndex(index)
        }
    }

    return (
        <div className={style.Sidebar}>
            <div className={style.Sidebar_scrollwrap}>
                {questionArray.map((q, i) => {
                    return (
                        <div className={i === selectedIndex ? style.question_selected : style.question} onClick={() => event.setSelected(i)}>
                            {q.question}
                        </div>
                    )
                })}
                <div onClick={() => event.newQuestion()} className={style.add}><span>+</span></div>
            </div>
        </div>
    )
}