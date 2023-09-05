export default function MultipleChoice({question}) {
    return (
        <div>
            {question.options.map((o, i) => (
                <div key={i}>
                    <input type="checkbox" id="html" name="fav_language" value={i} />
                    <label for="html">{o.value}</label>
                </div>
            ))}
        </div>
    )
}