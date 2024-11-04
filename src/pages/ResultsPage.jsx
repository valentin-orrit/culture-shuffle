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

    return (
        <main>
            <h1 className="home--title">Results</h1>
            <div className="results--questions">
                {data?.questions?.map((question, index) => (
                    <div key={index} className="results--question-block">
                        <div className="quiz-question">
                            <p>
                                {decode(question.question, {
                                    level: 'html5',
                                    mode: 'nonAscii',
                                })}
                            </p>
                        </div>
                        <div className="home--chose-btns">
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
                    </div>
                ))}
            </div>
            <button className="home--start-btn big-btn" onClick={newQuiz}>
                Try again
            </button>
        </main>
    )
}
