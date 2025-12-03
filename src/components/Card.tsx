interface CardProps {
    text: string;
    classes?: string[];
}

export function Card(props: CardProps) {
    const {text, classes = []} = props;

    return <div className={`card has-text-weight-bold ${classes.join(' ')}`}>
        <div className="card-content">
            <div className="content">
                {text}
            </div>
        </div>
    </div>
}