import { useLocation, useNavigate } from 'react-router-dom'
import Blobs from '../components/Blobs'

export default function ResultsPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const questions = location.state?.data

    //const correctAnswers = questions.map((question) => question.correct_answer)

    function newQuiz() {
        navigate('/')
    }

    return (
        <main>
            {console.log(questions)}
            <Blobs />
            <h1>Results</h1>
            <button className="home--start-btn big-btn" onClick={newQuiz}>
                Try again
            </button>
        </main>
    )
}
