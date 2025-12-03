import {Button} from "./Button.tsx";
import './PlayingArea.css'
import {useDeckContext} from "../context/DeckContext.tsx";
import {useState} from "react";

export function PlayingArea() {
    const {
        currCard,
        cardHistory,
        currentDeck,
        handleNext,
        currLevel
    } = useDeckContext();


    return <div className={'playing-area' +
        ' is-flex is-flex-direction-column is-flex-wrap-wrap is-align-content-center'}>
        <div className={'is-capitalized'}>Level {currLevel}</div>
        <Card text={currCard}/>

        <div className={'mx-auto'}>{cardHistory.length + 1}/{cardHistory.length + currentDeck.length}</div>

        <span className={'mx-auto'}>
            <Button onClick={handleNext}>Next Card</Button>
        </span>
    </div>
}

interface CardProps {
    text: string;
    classes?: string[];
}

function Card(props: CardProps) {
    const {text, classes = []} = props;
    // return <span className={'card'}>
    //     <div className={'card-content'}>
    //         <div className={'content'}>
    //             {text}
    //         </div>
    //     </div>
    // </span>

    return <div className={`card has-text-weight-bold ${classes.join(' ')}`}>
        <div className="card-content">
            <div className="content">
                {text}
            </div>
        </div>
    </div>
}

