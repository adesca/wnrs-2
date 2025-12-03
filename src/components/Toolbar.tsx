import {Button} from "./Button.tsx";
import {useDeckContext} from "../context/DeckContext.tsx";

export function Toolbar() {
    const {handleNewLevel} = useDeckContext();

    return <nav className={'navbar level is-flex-direction-row has-background-primary px-3'}>
        <span className={'level-left'}>
            <span className={'level-item has-text-weight-bold has-text-white'}>WNRS</span>
        </span>

        <span className={'level-right is-flex-direction-row'}>
            <Button isLevel={true} isWhite={true} popoverTarget={"levels-modal"}>level</Button>
            <Button isLevel={true} isWhite={true}>previous cards</Button>
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
}

