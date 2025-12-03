import './App.css'
import {Toolbar} from "./components/Toolbar.tsx";
import {PlayingArea} from "./components/PlayingArea.tsx";
import {DeckContextProvider} from "./context/DeckContext.tsx";

function App() {

    return (
        <div className={'container'}>
            <DeckContextProvider>
                <Toolbar/>
                <PlayingArea/>
            </DeckContextProvider>
        </div>
    )
}

export default App
