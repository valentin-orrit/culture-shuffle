import { useNavigate } from 'react-router-dom'
import Blobs from '../components/Blobs'

export default function HomePage() {
    const navigate = useNavigate()

    function startQuiz() {
        navigate('/quiz')
    }

    return (
        <main>
            <Blobs />
            <div className="home--title">
                <h1>culture shuffle</h1>
                <p>Are you a true art nerd? Find out in 10 questions.</p>
            </div>
            <div className="home--chose-challenge">
                <p>choose your challenge</p>
            </div>
            <button className="home--start-btn big-btn" onClick={startQuiz}>
                start quiz!
            </button>
        </main>
    )
}
