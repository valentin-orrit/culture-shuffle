import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Blobs from '../components/Blobs'
import Answer from '../components/Answer'

export default function HomePage() {
    const [active, setActive] = useState(false)

    // category list
    const answers = [
        { id: 1, text: 'music', category: 12, on: false },
        { id: 2, text: 'cinema', category: 11, on: false },
        { id: 3, text: 'fine arts', category: 25, on: false },
        { id: 4, text: 'literature', category: 10, on: false },
    ]

    function handleClick(e) {
        e.preventDefault()
        setActive(!active)

        console.log(active)
    }

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
                    {answers.map((answer) => (
                        <Answer
                            key={answer.id}
                            on={answer.on}
                            text={answer.text}
                            handleClick={() => handleClick(answer.id)}
                        />
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
