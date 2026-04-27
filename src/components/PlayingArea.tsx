import {Button} from "./Button.tsx";
import './PlayingArea.css'
import {useDeckContext} from "../context/DeckContext.tsx";
// import {Fragment} from "react";
import {Card} from "./Card.tsx";
import {useState} from "react";

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
    const [phase, setPhase] = useState<'fadeIn' | 'fadeOut' | 'idle'>('idle')
    const currLevelMeta = gameState[`${currLevel}_meta`]
    console.log(currLevelMeta)
    const hasFinishedLevel = currLevelMeta.cardsViewed === currLevelMeta.totalDeckSize

    let handleProgression = () => {}
    if (!hasFinishedLevel) {
        handleProgression = () => {
            if (phase !== 'idle') return;
            handleNext()
            setPhase('fadeOut');
        }
    } else if (hasFinishedLevel && currLevelMeta.nextLevel !== null) {
        handleProgression = () => handleNewLevel(currLevelMeta.nextLevel as 'two' | 'three')
    }

    const handleTransitionEnd = () => {
        if (phase === "fadeOut") {
            handleProgression()
            setPhase("fadeIn");
        } else if (phase === "fadeIn") {
            setPhase("idle");
        }
    };

    return <>
        <div className={'playing-area' +
            ' is-flex is-flex-direction-column is-flex-wrap-wrap is-align-content-center'}>

            <div>
                <div>
                    {gameState.name}
                </div>
                <span className={'is-capitalized tag is-dark'}>{currLevelMeta.levelName}</span></div>
            <div className={'displayed-cards mt-5'}>
                <Card text={currCard} classes={['wnrs-card']} phase={phase} onTransitionEnd={handleTransitionEnd}/>
            </div>

            <span className={'mx-auto mt-5 buttons'}>
                {!hasFinishedLevel && <Button onClick={handleProgression}>Next Card</Button>}
                {hasFinishedLevel && currLevelMeta.nextLevel !== null &&
                    <Button onClick={handleProgression}>Next Level <i
                        className="fas fa-arrow-right" aria-hidden="true"></i></Button>}
                <Button popoverTarget={'card-list'} isText={true} isWhite={true}>See all cards</Button>
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



