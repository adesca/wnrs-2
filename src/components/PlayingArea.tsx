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

    return <>
        <div className={'playing-area' +
            ' is-flex is-flex-direction-column is-flex-wrap-wrap is-align-content-center'}>

            <div>Deck: {gameState.name}, <span className={'is-capitalized'}>{currLevelMeta.levelName}</span></div>
            <div className={'displayed-cards'}>
                <Card text={currCard}/>
            </div>


            <div className={'mx-auto'}>{currLevelMeta.cardsViewed + 1}/{currLevelMeta.totalDeckSize}</div>

            <span className={'mx-auto mt-5 buttons'}>
                <Button onClick={handleNext}>Next Card</Button>
                <Button popoverTarget={'card-list'}>Cheat</Button>
            </span>
        </div>
        <dialog popover={'auto'} id={'card-list'}>
            <span className={'card-history'}>
                <ul>
                   {gameState[currLevel].map(card => <Card key={card} text={card} classes={['mx-auto']} />)}
                </ul>
            </span>
        </dialog>
    </>
}



