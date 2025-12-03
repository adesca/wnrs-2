import {Button} from "./Button.tsx";
import {useDeckContext} from "../context/DeckContext.tsx";
import {Fragment} from "react";
import {Card} from "./Card.tsx";

export function Toolbar() {
    const {handleNewLevel, cardHistory} = useDeckContext();

    return <>
        <nav className={'navbar level is-flex-direction-row has-background-primary px-3'}>
        <span className={'level-left'}>
            <span className={'level-item has-text-weight-bold has-text-white'}>WNRS</span>
        </span>

            <span className={'level-right is-flex-direction-row'}>
            <Button isLevel={true} isWhite={true} popoverTarget={"levels-modal"}>level</Button>
            <Button isLevel={true} isWhite={true} popoverTarget={'previous-cards-modal'}>previous cards</Button>
            <Button isLevel={true} isWhite={true}>decks</Button>
        </span>

            <dialog popover={"auto"} id={'levels-modal'} className={''}>
            <span className={'is-flex is-flex-direction-column'}>
            Select a level

            <Button isWhite={true} popoverTarget={'levels-modal'} onClick={() => handleNewLevel('one')}>Level 1</Button>
            <Button isWhite={true} popoverTarget={'levels-modal'} onClick={() => handleNewLevel('two')}>Level 2</Button>
            <Button isWhite={true} popoverTarget={'levels-modal'} onClick={() => handleNewLevel('three')}>Level 3</Button>
            </span>
            </dialog>

        </nav>

        <dialog popover={"auto"} id={'previous-cards-modal'} className={''}>
            <span className={'card-history'}>
                <ul>
                   {cardHistory.map(card => <Card key={card} text={card} classes={['mx-auto']} />)}
                </ul>
            </span>
        </dialog>
    </>
}

