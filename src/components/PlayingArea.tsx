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
        deckInfo,
    } = useDeckContext();


    return <div className={'playing-area' +
        ' is-flex is-flex-direction-column is-flex-wrap-wrap is-align-content-center'}>
        <div className={'is-capitalized'}>Level {currLevel}</div>
        <div className={'has-width-50'}>
            <Card text={currCard}/>
        </div>


        <div className={'mx-auto'}>{deckInfo.currCardIdx}/{deckInfo.remainingCards + deckInfo.currCardIdx}</div>

        <span className={'mx-auto mt-5'}>
            <Button onClick={handleNext}>Next Card</Button>
        </span>
    </div>
}



