import { useLocation, useNavigate } from 'react-router-dom'
import { decode } from 'html-entities'
import Answer from '../components/Answer'

export default function ResultsPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const data = location.state?.data

    function newQuiz() {
        navigate('/')
    }

    function stats() {
        // Count the number of correct answers
        return data.questions.reduce((count, question, index) => {
            return (
                count +
                (data.userAnswers[index] === question.correct_answer ? 1 : 0)
            )
        }, 0)
    }

    const testString = 'Bill &amp; Ted&#039;s Excellent Adventure'
    console.log(decode(testString))

    return (
        <main>
            <h1 className="home--title">Results</h1>
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
                                        text={decode(answer)}
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
                <p>
                    You scored {stats()}/{data.questions.length} questions !
                </p>
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
