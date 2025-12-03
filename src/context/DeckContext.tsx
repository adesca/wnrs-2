import {createContext, useContext, useState} from "react";
import xxxDeck from '../decks/xxx.json';

// interface ContextType {
//     name: string,
//     one: string[],
//     two: string[],
//     three: string[]
// }

type LevelType = 'one' | 'two' | 'three'

interface ContextType {
    currentDeck: string[]
    currCard: string,
    cardHistory: string[],
    handleNext: () => void,
    currLevel: string,
}

// const DeckContext = createContext<null | {context: ContextType, currentLevel: LevelType}>(null);
const DeckContext = createContext<ContextType | null>(null);

export function useDeckContext() {
    const maybeContext = useContext(DeckContext);
    if (!maybeContext) throw new Error("Use deck context must be used within a deck provider")

    return maybeContext
}

const startingDeck = {
    name: 'xxx',
    one: xxxDeck.level_one,
    two: xxxDeck.level_two,
    three: xxxDeck.level_three
}

export function DeckContextProvider(props) {
    const gameState: {name: string, one: string[], two: string[], three: string[]} = {
        name: 'xxx',
        one: xxxDeck.level_one,
        two: xxxDeck.level_two,
        three: xxxDeck.level_three
    }
    // const [deckState, setDeckState] = useState<ContextType>({
    //     name: 'xxx',
    //     one: xxxDeck.level_one,
    //     two: xxxDeck.level_two,
    //     three: xxxDeck.level_three
    // })
    const [currLevel, setLevel] = useState<LevelType>('one')
    const [currCard, setCurrCard] = useState<string>(gameState[currLevel][0])
    const [cardHistory, setCardHistory] = useState<string[]>([])

    function handleNext() {
        const finalMessage = "You have finished this level!";
        if (gameState[currLevel].length === 1) {
            if (currCard === finalMessage) {
                return;
            } else {
                const tempHistory = [currCard, ...cardHistory];
                setCardHistory(tempHistory);
                setCurrCard(finalMessage);
            }
        } else {
            const tempHistory = [currCard, ...cardHistory];
            setCardHistory(tempHistory);
            gameState[currLevel].shift();
            setCurrCard(gameState[currLevel][0]);
        }
    }

    return <DeckContext value={{currentDeck: gameState[currLevel], currLevel, handleNext, currCard, cardHistory}}>
        {props.children}
    </DeckContext>
}