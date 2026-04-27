import type {ButtonHTMLAttributes, ComponentProps, CSSProperties, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    isLevel?: boolean
    isWhite?: boolean
    isSmall?: boolean
    isText?: boolean
}
export function Button(props: ButtonProps) {
    const {children, isLevel, isWhite, isSmall, isText, ...buttonProps} = props
    let dynamicClassName = ''
    dynamicClassName += isLevel ? 'level-item ' : ''
    dynamicClassName += isWhite ? 'is-white ' : ' is-primary has-text-white '
    dynamicClassName += isSmall ? 'is-small ' : ''
    dynamicClassName += isText ? 'is-text ' : ''

    let style: CSSProperties = {};
    if (isText) {
        style.border = 'none';
    }

    return <button {...buttonProps} className={`${dynamicClassName} is-uppercase button`} style={style} >{children}</button>
}