import type {ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    isLevel?: boolean
    isWhite?: boolean
    isSmall?: boolean
}
export function Button(props: ButtonProps) {
    const {children, isLevel, isWhite, isSmall, ...buttonProps} = props
    let dynamicClassName = ''
    dynamicClassName += isLevel ? 'level-item ' : ''
    dynamicClassName += isWhite ? 'is-white ' : ' is-primary has-text-white '
    dynamicClassName += isSmall ? 'is-small ' : ''

    return <button {...buttonProps} className={`${dynamicClassName} is-uppercase button`}>{children}</button>
}