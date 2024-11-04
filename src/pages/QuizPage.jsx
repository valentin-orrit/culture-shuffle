import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { decode } from 'html-entities'
import Answer from '../components/Answer'

export default function QuizPage() {
    const location = useLocation()
    const data = location.state?.data

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState([])
    const [isTransitioning, setIsTransitioning] = useState(false)
    const navigate = useNavigate()

    if (!data) {
        return (
            <main>
                <p>Loading questions...</p>
            </main>
        )
    }

    const questions = data.results
    const currentQuestion = questions[currentQuestionIndex]

    function handleAnswerSelect(answer) {
        setUserAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers]
            newAnswers[currentQuestionIndex] = answer
            return newAnswers
        })
    }

    function handleNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            setIsTransitioning(true)
            setTimeout(() => {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
                setIsTransitioning(false)
            }, 300) // Match this duration with your CSS transition duration
        } else {
            navigate('/results', {
                state: { data: { userAnswers, questions } },
            })
        }
    }

    return (
        <main>
            <h1 className="home--title">Question {currentQuestionIndex + 1}</h1>
            <div
                className={`quiz-container ${
                    isTransitioning ? 'slide-out' : 'slide-in'
                }`}
            >
                <div className="home--chose-challenge quiz-question">
                    <p>{decode(currentQuestion.question)}</p>
                </div>
                <div className="home--chose-btns">
                    {[
                        ...currentQuestion.incorrect_answers,
                        currentQuestion.correct_answer,
                    ]
                        .sort()
                        .map((answer, index) => (
                            <Answer
                                key={index}
                                text={decode(answer)}
                                on={
                                    userAnswers[currentQuestionIndex] === answer
                                }
                                handleClick={() => handleAnswerSelect(answer)}
                                isResultsPage={false}
                            />
                        ))}
                </div>
            </div>
            <button
                className="home--start-btn big-btn"
                onClick={handleNextQuestion}
                disabled={!userAnswers[currentQuestionIndex]}
            >
                {currentQuestionIndex < questions.length - 1
                    ? 'Next Question'
                    : 'Finish Quiz'}
            </button>
        </main>
    )
}
