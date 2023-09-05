export default function Choice({question}) {
    return (
        <div>
            {question.options.map((o, i) => (
                <div key={i}>
                    <input type="radio" id="html" name="fav_language" value={i} />
                    <label for="html">{o.value}</label>
                </div>
            ))}
        </div>
    )
}
