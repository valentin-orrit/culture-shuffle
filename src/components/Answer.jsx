export default function Answer({ on, text }) {
    const styles = {
        backgroundColor: on ? '#d3852b' : 'transparent',
    }

    return (
        <button style={styles} className="answer small-btn">
            {text}
        </button>
    )
}
