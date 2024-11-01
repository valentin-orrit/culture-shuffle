import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Blobs from '../components/Blobs'

export default function HomePage() {
    const [active, setActive] = useState(false)

    // category list
    const answers = [
        { id: 1, text: 'music', category: 12 },
        { id: 2, text: 'cinema', category: 11 },
        { id: 3, text: 'fine arts', category: 25 },
        { id: 4, text: 'literature', category: 10 },
    ]

    // Starting the quiz
    const navigate = useNavigate()

    function startQuiz(e) {
        e.preventDefault()
        navigate('/quiz')
    }

    return (
        <main>
            <Blobs />

            <div className="home--title">
                <h1>culture shuffle</h1>
                <p>Are you a true art nerd? Find out in 10 questions.</p>
            </div>

            <form className="home--form">
                <div className="home--chose-challenge">
                    <p>choose your challenge</p>
                </div>
                <div className="home--chose-btns">
                    {answers.map((item) => (
                        <button key={item.id} className="small-btn">
                            {item.text}
                        </button>
                    ))}
                </div>
                <button
                    className="home--start-btn big-btn"
                    onClick={startQuiz}
                    type="submit"
                >
                    start quiz!
                </button>
            </form>
        </main>
    )
}
