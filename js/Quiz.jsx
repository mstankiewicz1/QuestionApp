import React from 'react';
import QuizData from './QuizData.jsx';



class Quiz extends React.Component {

    state = {
      userAnswer: null,
      currentQuestion: 0,
      options: [],
      QuizEnd: false,
      score: 0,
      disabled: true
    };



    loadQuiz = () => {
        const {currentQuestion} = this.state;
        this.setState(() => {
        return {
            questions: QuizData[currentQuestion].question,
            options: QuizData[currentQuestion].options,
            answers: QuizData[currentQuestion].answer,
        }
      })
    };

    componentDidMount() {
        this.loadQuiz();
    }

    nextQuestionHandle = () => {

        const {userAnswer, answers, score} = this.state;

        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
        });
        /*zliczanie punktów*/
        if (userAnswer === answers){
            this.setState({
                score: score + 1,
            })
        }
    };

    //updates the component
    componentDidUpdate(prevProps, prevState){
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(() => {
                return {
                    disabled: true,
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].options,
                    answers: QuizData[currentQuestion].answer,
                };
            })
        }
    }

    /*checkedAnswer*/
    checkedAnswer = answer => {
      this.setState({
          userAnswer: answer,
          disabled: false
      })
    };

    finishHandle = () => {
        if (this.state.currentQuestion === QuizData.length - 1){
            this.setState({
                QuizEnd: true
            })
        }
    };


    render() {
        const {questions, options, currentQuestion, userAnswer, QuizEnd} = this.state;

        if (QuizEnd){
            return(
                <div>
                    <h2>Koniec Gry Twoj wynik to {this.state.score} punktow</h2>
                    <p>Poprawne odpowiedzi to: </p>
                    {QuizData.map((item, index) => (
                        <li key={index}>
                            {item.answer}
                        </li>
                        ))
                    }
                </div>
            )
        }


            return (
                <div className="QuizApp">
                    <h2>{questions}</h2>
                    <span>{`Pytanie ${currentQuestion + 1} z ${QuizData.length}`}</span>
                    {options.map(option => (
                        <p key={option.id}
                           className={`optionStyle ${userAnswer === option ? "selected" : null}`}
                           onClick={() => this.checkedAnswer(option)}
                        >
                            {option}
                        </p>
                    ))}
                    {currentQuestion < QuizData.length - 1 &&
                    <button onClick={this.nextQuestionHandle} disabled={this.state.disabled}>Next</button>
                    }
                    {currentQuestion === QuizData.length - 1 &&
                    <button disabled={this.state.disabled} onClick={this.finishHandle}>Finish</button>
                    }
                </div>
            )
        }
    }

export default Quiz;