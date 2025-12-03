import type {ComponentProps, ReactNode} from "react";

interface ButtonProps {
    children: ReactNode
    isLevel?: boolean
    isWhite?: boolean
}
export function Button(props: ButtonProps & ComponentProps<HTMLButtonElement>) {
    const {children, isLevel, isWhite, ...buttonProps} = props
    let dynamicClassName = ''
    dynamicClassName += isLevel ? 'level-item ' : ''
    dynamicClassName += isWhite ? 'is-white ' : ' is-primary has-text-white '

    return <button {...buttonProps} className={`${dynamicClassName} is-uppercase button`}>{children}</button>
}