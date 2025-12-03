import {Button} from "./Button.tsx";
import './PlayingArea.css'

export function PlayingArea() {
    return <div className={'playing-area' +
        ' is-flex is-flex-direction-column is-flex-wrap-wrap is-align-content-center'}>
        <Card text={"hello"}/>

        <span className={'mx-auto'}>
            <Button>Next Card</Button>
        </span>
        {/*<Button>Next card</Button>*/}
    </div>
}

interface CardProps {
    text: string;
    classes?: string[];
}

function Card(props: CardProps) {
    const {text, classes = []} = props;
    // return <span className={'card'}>
    //     <div className={'card-content'}>
    //         <div className={'content'}>
    //             {text}
    //         </div>
    //     </div>
    // </span>

    return <div className={`card has-text-weight-bold ${classes.join(' ')}`}>
        <div className="card-content">
            <div className="content">
                {text}
            </div>
        </div>
    </div>
}

