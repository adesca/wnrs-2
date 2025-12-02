import type {ReactNode} from "react";

export function Toolbar() {

    return <nav className={'navbar level is-flex-direction-row has-background-primary px-3'} >
        <span className={'level-left'}>
            <span className={'level-item has-text-weight-bold has-text-white'}>WNRS</span>
        </span>

        <span className={'level-right is-flex-direction-row'}>
            <Button>level</Button>
            <Button>text2</Button>
        </span>

    </nav>
}

interface ButtonProps {
    children: ReactNode
}
function Button({children}: ButtonProps) {

    return <button className={'level-item is-uppercase button is-white'}>{children}</button>
}