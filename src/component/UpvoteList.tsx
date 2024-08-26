import Upvote from "./Upvote";
import { useAppState } from "../context/appContext";

interface UpvoteListProps {
  upvoteList: { numberOfUpvote: number, upvoteState: boolean };
  index: number;
}

function UpvoteList({ upvoteList, index }: UpvoteListProps): JSX.Element {
  const { dispatch } = useAppState();
  const { numberOfUpvote, upvoteState } = upvoteList;


  const hnadleUpvoteClick = () => {
    dispatch({ type: 'toggleSelectionStateOfList', payload: index });
  }

  return (
    <div>
      {Array(numberOfUpvote)
        .fill()
        .map(() => {
          return <Upvote isSelected={upvoteState} onClick={hnadleUpvoteClick} />;
        })}

      <button onClick={() => dispatch({ type: 'addUpvoteToList', payload: index})}>Add Upvote</button>
    </div>
  )
}

export default UpvoteList;