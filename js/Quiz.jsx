import React from 'react';
import QuizData from './QuizData.jsx';



class Quiz extends React.Component {

    state = {
      userAnswer: null,
      currentQuestion: 0,
      options: []
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
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
        });
    };

    //updates the component
    componentDidUpdate(prevProps, prevState){
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(() => {
                return {
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].options,
                    answers: QuizData[currentQuestion].answer,
                };
            })
        }
    }


    render() {
        const {questions, options} = this.state;
        return (
            <div className="QuizApp">
                {questions}
                {options.map(option => (
                    <p key={option.id}>
                        {option}
                    </p>
                ))}
                <button onClick={this.nextQuestionHandle}>Next</button>
            </div>
        )
    }
}

export default Quiz;