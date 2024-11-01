import { useLocation } from 'react-router-dom'
import Blobs from '../components/Blobs'

export default function ResultsPage() {
    const location = useLocation()
    const questions = location.state?.data

    // const correctAnswers = questions.map((question) => question.correct_answer)

    return (
        <main>
            {console.log(questions)}
            <Blobs />
            <h1>Results</h1>
        </main>
    )
}
