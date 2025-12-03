import {createContext, ReactNode, useContext, useState} from "react";
import xxxDeck from '../decks/xxx.json';

type LevelType = 'one' | 'two' | 'three'

interface ContextType {
    currentDeck: string[]
    currCard: string,
    cardHistory: string[],
    handleNext: () => void,
    currLevel: LevelType,
    handleNewLevel: (level: LevelType) => void,
    deckInfo: {currCardIdx: number, remainingCards: number}
}

// const DeckContext = createContext<null | {context: ContextType, currentLevel: LevelType}>(null);
const DeckContext = createContext<ContextType | null>(null);

export function useDeckContext() {
    const maybeContext = useContext(DeckContext);
    if (!maybeContext) throw new Error("Use deck context must be used within a deck provider")

    return maybeContext
}

export function DeckContextProvider(props: {children: ReactNode}) {
    const gameState: {name: string, one: string[], two: string[], three: string[]} = {
        name: 'xxx',
        one: shuffle(xxxDeck.level_one),
        two: shuffle(xxxDeck.level_two),
        three: shuffle(xxxDeck.level_three)
    }

    const [currLevel, setLevel] = useState<LevelType>('one')
    const [currCard, setCurrCard] = useState<string>(gameState[currLevel][0])
    const [cardHistory, setCardHistory] = useState<string[]>([])
    const [deckInfo, setDeckInfo] = useState({currCardIdx: 1, remainingCards: 100})

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

    function handleNewLevel(newLevel: LevelType) {
        setLevel(newLevel)
        setCurrCard(gameState[newLevel][0])
        setDeckInfo({currCardIdx: 1, remainingCards: gameState[newLevel].length})
    }


    return <DeckContext value={{
        currentDeck: gameState[currLevel], currLevel, handleNext, currCard, cardHistory,
        handleNewLevel, deckInfo
    }}>
        {props.children}
    </DeckContext>
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}