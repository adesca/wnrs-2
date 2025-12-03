import {createContext, ReactNode, useContext, useState} from "react";
import xxxDeck from '../decks/xxx.json';
import {DeckIndex} from "../decks/DeckIndex.tsx";

type LevelType = 'one' | 'two' | 'three'

interface ContextType {
    currCard: string,
    currLevel: LevelType,
    cardHistory: string[],
    handleNext: () => void,
    handleNewLevel: (level: LevelType) => void,
    handleChangeDeck: (newDeckName: keyof typeof DeckIndex) => void
    gameState: GameState
}

// const DeckContext = createContext<null | {context: ContextType, currentLevel: LevelType}>(null);
const DeckContext = createContext<ContextType | null>(null);

export function useDeckContext() {
    const maybeContext = useContext(DeckContext);
    if (!maybeContext) throw new Error("Use deck context must be used within a deck provider")

    return maybeContext
}

interface GameState {
    name: string,
    one: string[],
    two: string[],
    three: string[]

    one_meta: {
        totalDeckSize: number,
        cardsViewed: number,
        levelName: string
    }

    two_meta: {
        totalDeckSize: number,
        cardsViewed: number,
        levelName: string
    }

    three_meta: {
        totalDeckSize: number,
        cardsViewed: number,
        levelName: string
    }
}

function buildGameState(deckName: keyof typeof DeckIndex): GameState {
    const deck = DeckIndex[deckName];
    return {
        name: deck.displayName,
        one_meta: {cardsViewed: 0, totalDeckSize: deck.deck.questions.one.length, levelName: deck.deck.levels[0]},
        three: shuffle(structuredClone(deck.deck.questions.three)),
        three_meta: {cardsViewed: 0, totalDeckSize: deck.deck.questions.three.length, levelName: deck.deck.levels[2]},
        two: shuffle(structuredClone(deck.deck.questions.two)),
        two_meta: {cardsViewed: 0, totalDeckSize: deck.deck.questions.two.length, levelName: deck.deck.levels[1]},
        one: shuffle(structuredClone(deck.deck.questions.one))
    }
}

export function DeckContextProvider(props: { children: ReactNode }) {
    const [gameState, setGameState] = useState<GameState>(buildGameState('Main'))
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

        setGameState(currInfo => {
            const tempInfo = structuredClone(currInfo);
            tempInfo[`${currLevel}_meta`].cardsViewed += 1;

            return tempInfo;
        })
    }

    function handleNewLevel(newLevel: LevelType) {
        setLevel(newLevel)
        setCurrCard(gameState[newLevel][0])
    }

    function handleChangeDeck(deckName: keyof typeof DeckIndex) {
       const newGameDeck = DeckIndex[deckName];
       const newGameState: GameState = {
           name: newGameDeck.displayName,
           one_meta: {cardsViewed: 0, totalDeckSize: newGameDeck.deck.questions.one.length, levelName: newGameDeck.deck.levels[0]},
           three: shuffle(structuredClone(newGameDeck.deck.questions.three)),
           three_meta: {cardsViewed: 0, totalDeckSize: newGameDeck.deck.questions.three.length, levelName: newGameDeck.deck.levels[2]},
           two: shuffle(structuredClone(newGameDeck.deck.questions.two)),
           two_meta: {cardsViewed: 0, totalDeckSize: newGameDeck.deck.questions.two.length, levelName: newGameDeck.deck.levels[1]},
           one: shuffle(structuredClone(newGameDeck.deck.questions.one))
       }
        setLevel('one')
        setCurrCard(newGameState.one[0])
        setGameState(newGameState)
        setCardHistory([])
    }


    return <DeckContext value={{
        currLevel,currCard,
        handleNext,handleNewLevel,handleChangeDeck,
        cardHistory, gameState
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