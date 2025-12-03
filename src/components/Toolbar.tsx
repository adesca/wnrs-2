import {Button} from "./Button.tsx";
import {useDeckContext} from "../context/DeckContext.tsx";

export function Toolbar() {
    const {setLevel} = useDeckContext();

    return <nav className={'navbar level is-flex-direction-row has-background-primary px-3'} >
        <span className={'level-left'}>
            <span className={'level-item has-text-weight-bold has-text-white'}>WNRS</span>
        </span>

        <span className={'level-right is-flex-direction-row'}>
            <Button isLevel={true} isWhite={true}>level</Button>
            <Button isLevel={true} isWhite={true}>previous cards</Button>
            <Button isLevel={true} isWhite={true}>decks</Button>
        </span>

    </nav>
}

