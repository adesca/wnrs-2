import {useState} from 'react'
import './App.css'
import {Toolbar} from "./components/Toolbar.tsx";
import {PlayingArea} from "./components/PlayingArea.tsx";

function App() {

    return (
        <div className={'container'}>
            <Toolbar/>
            <PlayingArea />
        </div>
    )
}

export default App
