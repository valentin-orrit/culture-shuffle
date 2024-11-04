import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { decode } from 'html-entities'
import Answer from '../components/Answer'
import confetti from 'canvas-confetti'

export default function ResultsPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const data = location.state?.data

    function newQuiz() {
        navigate('/')
    }

    function calculateScore() {
        let score = 0
        data.questions.forEach((question, index) => {
            if (data.userAnswers[index] === question.correct_answer) {
                score++
            }
        })
        return score
    }

    const score = calculateScore()

    // Launch Confettis when the score is perfect
    useEffect(() => {
        if (score === 5) {
            const launchConfetti = () => {
                confetti({
                    particleCount: 200,
                    spread: 180,
                    startVelocity: 40,
                    ticks: 300,
                    gravity: 0.6,
                    scalar: 1.6,
                })
            }
            launchConfetti()
        }
    }, [score])

    return (
        <main>
            <h1 className="results--title">Results</h1>
            <div className="results--questions">
                {data.questions.map((question, index) => (
                    <div key={index} className="results--question-block">
                        <div className="quiz-question">
                            <p>{decode(question.question)}</p>
                        </div>
                        <div className="home--chose-btns results--answer-btn">
                            {[
                                ...question.incorrect_answers,
                                question.correct_answer,
                            ]
                                .sort()
                                .map((answer, answerIndex) => (
                                    <Answer
                                        key={answerIndex}
                                        text={answer}
                                        isUserAnswer={
                                            answer === data.userAnswers[index]
                                        }
                                        isCorrectAnswer={
                                            answer === question.correct_answer
                                        }
                                        isResultsPage={true}
                                    />
                                ))}
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <div className="results--stats">
                <p>You scored {score}/5</p>
                <button
                    className="home--start-btn big-btn results--try-btn"
                    onClick={newQuiz}
                >
                    Try again
                </button>
            </div>
        </main>
    )
}
