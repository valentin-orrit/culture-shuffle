import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Blobs from '../components/Blobs'
import Answer from '../components/Answer'

export default function HomePage() {
    // category list
    const [answers, setAnswers] = useState([
        { id: 1, text: 'Music', category: 12, on: false },
        { id: 2, text: 'Cinema', category: 11, on: false },
        { id: 3, text: 'Fine Arts', category: 25, on: false },
        { id: 4, text: 'Literature', category: 10, on: false },
    ])

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [attemptedQuizStart, setAttemptedQuizStart] = useState(false)
    const navigate = useNavigate()

    function handleClick(e, id) {
        e.preventDefault()
        setAnswers((prevAnswers) => {
            return prevAnswers.map((answer) => {
                if (answer.id === id) {
                    setSelectedCategory(answer.category)
                    return { ...answer, on: true }
                } else {
                    return { ...answer, on: false }
                }
            })
        })
    }

    // Starting the quiz
    async function startQuiz(e) {
        e.preventDefault()
        setAttemptedQuizStart(true)
        if (selectedCategory) {
            const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}`
            try {
                const response = await axios.get(url)
                console.log('API Response:', response.data)
                navigate('/quiz', { state: { data: response.data } })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    }

    return (
        <main>
            <Blobs />

            <div className="home--title">
                <h1>Culture Shuffle</h1>
                <p>Are you a true art nerd? Find out in 10 questions.</p>
            </div>

            <form className="home--form">
                <div className="home--chose-challenge">
                    <p>Choose your challenge</p>
                </div>
                <div className="home--chose-btns">
                    {answers.map((answer) => (
                        <Answer
                            key={answer.id}
                            on={answer.on}
                            text={answer.text}
                            handleClick={(e) => handleClick(e, answer.id)}
                        />
                    ))}
                </div>
                <button
                    className="home--start-btn big-btn"
                    onClick={startQuiz}
                    type="submit"
                >
                    Start quiz
                </button>
                <div>
                    {attemptedQuizStart && !selectedCategory && (
                        <div className="home--warning-message">
                            <p>You need to select a challenge!</p>
                        </div>
                    )}
                </div>
            </form>
        </main>
    )
}
