// QuizPage.jsx
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { decode } from 'html-entities'
import Blobs from '../components/Blobs'
import Answer from '../components/Answer'

export default function QuizPage() {
    const location = useLocation()
    const data = location.state?.data

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState([])

    if (!data) {
        return (
            <main>
                <Blobs />
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
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        } else {
            console.log('Quiz completed!', userAnswers)
            //
            // TO DO : redirect to results page
            //
        }
    }

    return (
        <main>
            <Blobs />
            <h1 className="home--title">Question {currentQuestionIndex + 1}</h1>
            <div className="home--chose-challenge quiz-question">
                <p>
                    {
                        // decode html entities
                        decode(currentQuestion.question, {
                            level: 'html5',
                            mode: 'nonAscii',
                        })
                    }
                </p>
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
                            text={answer}
                            on={userAnswers[currentQuestionIndex] === answer}
                            handleClick={() => handleAnswerSelect(answer)}
                        />
                    ))}
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
