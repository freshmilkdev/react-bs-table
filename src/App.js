import PropTypes from 'prop-types'
import React from 'react'
import './App.css';
import AlertQueue from "./components/AlertQueue";

let mockResults = [];
for (let i = 1; i < 101; i++) {
    mockResults.push({
        id: i,
        taskName: `Task #${i}`,
        start: '11/23/2020',
        finish: '11/23/2020',
        duration: `${i}`
    })
}
;

function App() {
    return (
        <div className="App">
            <AlertQueue handleClick={() => {
            }} results={mockResults}/>
        </div>
    );
}

export default App;
