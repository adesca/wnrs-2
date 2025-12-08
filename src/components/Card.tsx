interface CardProps {
    text: string;
    classes?: string[];
}

export function Card(props: CardProps) {
    const {text, classes = []} = props;
    const cardClass = text.toLowerCase().startsWith('wildcard') ? 'wild' : ''

    return <div className={`card ${cardClass} has-text-weight-bold ${classes.join(' ')}`}>
        <div className="card-content">
            <div className="content">
                {text}
            </div>
        </div>
    </div>
}