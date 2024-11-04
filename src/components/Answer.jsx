export default function Answer({
    on,
    text,
    isUserAnswer,
    isCorrectAnswer,
    handleClick,
    isResultsPage = false,
}) {
    const styles = {
        backgroundColor: on
            ? '#d3852b'
            : isUserAnswer
            ? '#d3852b'
            : isCorrectAnswer
            ? '#4caf50'
            : 'transparent',
        borderColor: on
            ? '#d3852b'
            : isUserAnswer
            ? '#d3852b'
            : isCorrectAnswer
            ? '#4caf50'
            : '#b9b1ac',
        color: on || isUserAnswer || isCorrectAnswer ? '#fffffb' : '',
        fontWeight: isCorrectAnswer ? 'bold' : 'normal',
    }

    return (
        <button
            style={styles}
            className="answer small-btn"
            onClick={handleClick}
            disabled={isResultsPage}
        >
            {text}
        </button>
    )
}
