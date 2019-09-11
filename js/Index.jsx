import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz.jsx';


const Index = () => {
    return (
        <div>
            <Quiz/>
        </div>
    )
};




document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Index/>,
        document.getElementById('app')
    );
});