interface CardProps {
    text: string;
    classes?: string[];
    phase?: string;
    onTransitionEnd?: () => void
}

export function Card(props: CardProps) {
    const {text, phase, onTransitionEnd = () => {}, classes = []} = props;
    const cardClass = text.toLowerCase().startsWith('wildcard') ? 'wild' : ''

    return <div className={`card ${cardClass} has-text-weight-bold ${classes.join(' ')}`}>
        <div className="card-content">
            <div className={`card-inner ${phase === 'fadeOut' ? 'fade-out' : ''} ${phase === 'fadeIn' ? 'fade-in' : ''}`} onTransitionEnd={onTransitionEnd}>
                <div className="content">
                    {text}
                </div>
            </div>
        </div>
    </div>
}