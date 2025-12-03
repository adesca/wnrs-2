import {Button} from "./Button.tsx";
import './PlayingArea.css'
import {useDeckContext} from "../context/DeckContext.tsx";
// import {Fragment} from "react";
import {Card} from "./Card.tsx";

export function PlayingArea() {
    const {
        currCard,
        cardHistory,
        // currentDeck,
        handleNext,
        currLevel,
        gameState,
    } = useDeckContext();
    const currLevelMeta = gameState[`${currLevel}_meta`]

    return <div className={'playing-area' +
        ' is-flex is-flex-direction-column is-flex-wrap-wrap is-align-content-center'}>
        <div>Deck: {gameState.name}, <span className={'is-capitalized'}>{currLevelMeta.levelName}</span></div>
        <div className={'displayed-cards'}>
            <Card text={currCard}/>
        </div>


        <div className={'mx-auto'}>{currLevelMeta.cardsViewed + 1}/{currLevelMeta.totalDeckSize}</div>

        <span className={'mx-auto mt-5'}>
            <Button onClick={handleNext}>Next Card</Button>
        </span>
    </div>
}



