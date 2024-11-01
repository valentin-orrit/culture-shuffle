export default function Answer({ on, text, handleClick }) {
    const styles = {
        backgroundColor: on ? '#d3852b' : 'transparent',
        borderColor: on ? '#d3852b' : '#b9b1ac',
        color: on ? '#fffffb' : '',
    }

    return (
        <button
            style={styles}
            className="answer small-btn"
            onClick={handleClick}
        >
            {text}
        </button>
    )
}
