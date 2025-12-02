import Card from "../card/Card";
import { smallCardStyles } from "../card/Card.css";
import {
  cardContainerScrollStyles,
  cardContainerStyles,
  historyStyles,
  historyTitleStyles,
} from "./CardHistory.css";

interface CardHistoryProps {
  cardHistory: string[];
}

const CardHistory = ({ cardHistory }: CardHistoryProps) => {
  return (
    <div className={historyStyles}>
      <div className={historyTitleStyles}>previous cards</div>
      <div className={cardContainerStyles}>
        <div className={cardContainerScrollStyles}>
          {cardHistory.map((qn) => (
            <Card styleName={smallCardStyles} question={qn} key={qn} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
