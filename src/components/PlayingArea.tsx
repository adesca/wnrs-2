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
        handleNewLevel
    } = useDeckContext();
    const currLevelMeta = gameState[`${currLevel}_meta`]
    console.log(currLevelMeta)
    const hasFinishedLevel = currLevelMeta.cardsViewed === currLevelMeta.totalDeckSize

    return <>
        <div className={'playing-area' +
            ' is-flex is-flex-direction-column is-flex-wrap-wrap is-align-content-center'}>

            <div>Deck: {gameState.name}, <span className={'is-capitalized'}>{currLevelMeta.levelName}</span></div>
            <div className={'displayed-cards'}>
                <Card text={currCard} deck/>
            </div>


            <div className={'mx-auto'}>{Math.min(currLevelMeta.cardsViewed + 1, currLevelMeta.totalDeckSize)}/{currLevelMeta.totalDeckSize}</div>

            <span className={'mx-auto mt-5 buttons'}>
                <Button popoverTarget={'card-list'} isWhite={true}>Cheat</Button>
                {!hasFinishedLevel && <Button onClick={handleNext}>Next Card</Button> }
                {hasFinishedLevel && currLevelMeta.nextLevel !== null &&   <Button onClick={() => handleNewLevel(currLevelMeta.nextLevel as 'two' | 'three')}>Next Level <i className="fas fa-arrow-right" aria-hidden="true"></i></Button> }
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



