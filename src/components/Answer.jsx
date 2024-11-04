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
            ? '#d3852b' // Highlight color for the "on" state
            : isUserAnswer && isCorrectAnswer
            ? '#4caf50' // Green for correct user answer
            : isUserAnswer
            ? '#d3852b' // Orange for user answer (incorrect)
            : isCorrectAnswer
            ? '#4caf50' // Green for correct answer (not selected)
            : 'transparent',
        borderColor: on
            ? '#d3852b'
            : isUserAnswer && isCorrectAnswer
            ? '#4caf50' // Green for correct user answer
            : isUserAnswer
            ? '#d3852b'
            : isCorrectAnswer
            ? '#4caf50'
            : '#b9b1ac',
        color: on || isUserAnswer || isCorrectAnswer ? '#fffffb' : '',
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
