import {Button} from "./Button.tsx";
import {useDeckContext} from "../context/DeckContext.tsx";
import {Fragment, useRef, useState} from "react";
import {Card} from "./Card.tsx";
import {DeckIndex} from "../decks/DeckIndex.tsx";

export function Toolbar() {
    const {handleNewLevel, cardHistory, handleChangeDeck} = useDeckContext();

    return <>
        <nav className={'navbar level is-flex-direction-row has-background-primary px-3'}>
        <span className={'level-left'}>
            <span className={'level-item has-text-weight-bold has-text-white'}>WNRS</span>
        </span>

            <span className={'level-right is-flex-direction-row'}>
            <Button isLevel={true} isWhite={true} popoverTarget={"levels-modal"}>level</Button>
            <Button isLevel={true} isWhite={true} popoverTarget={'previous-cards-modal'}>previous cards</Button>
            <Button isLevel={true} isWhite={true} popoverTarget={'decks'}>decks</Button>
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

        <DeckList />
    </>
}

function DeckList() {
    const popoverRef = useRef<HTMLDialogElement | null>(null)
    const {handleChangeDeck} = useDeckContext();
    const [selectedDeck, setSelectedDeck]= useState<keyof typeof DeckIndex | null>(null)
    const listOfDecks: Array<{desc: string, name: string, key: keyof typeof DeckIndex}> = Object.values(DeckIndex).map(deckInfo => ({name: deckInfo.displayName, desc: deckInfo.deck.backDesc, key: deckInfo.key as keyof typeof DeckIndex}))

    function selectDeck() {
        handleChangeDeck(selectedDeck!);
        if (popoverRef.current) {
            popoverRef.current.hidePopover()
        }

    }

    return <dialog ref={popoverRef} popover={"auto"} id={'decks'} className={''} onToggle={() => {setSelectedDeck(null)}}>
            <div className="radios is-flex-direction-column">
                {listOfDecks.map(d => (
                    <label className={'radio pb-2'}>
                        <input type={'radio'} name={'deck-choice'}
                                checked={selectedDeck === d.key}
                                onChange={() => setSelectedDeck(d.key)}/> {d.name}
                        <div>{d.desc}</div>
                    </label>
                ))}
            </div>
        <Button disabled={selectedDeck === null} onClick={selectDeck}>Select deck</Button>
        <div className={'pt-3'}>Tip: selecting your current deck will reset the game!</div>
    </dialog>
}

