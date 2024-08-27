import Upvote from "./Upvote";
import { useAppState } from "../context/appContext";
import Plus from "./icons/Plus";

interface UpvoteListProps {
  upvoteList: { numberOfUpvote: number, upvoteState: boolean };
  index: number;
}

function UpvoteList({ upvoteList, index }: UpvoteListProps): JSX.Element {
  const { dispatch } = useAppState();
  const { numberOfUpvote, upvoteState } = upvoteList;

  const handleUpvoteClick = () => {
    dispatch({ type: "toggleSelectionStateOfList", payload: index });
  }

  function handleAddClick() {
    dispatch({ type: 'addUpvoteToList', payload: index });
  }

  function renderUpvotes() {
    const upvotes = [];
    for (let i = 0; i < numberOfUpvote; i++) {
      upvotes.push(<Upvote isSelected={upvoteState} onClick={handleUpvoteClick} key={`Upvote_${i}`} />);
    }

    return upvotes;
  }

  return (
    <div className="flex gap-2">
      <div className="border-solid border rounded border-slate-300 m-1 basis-5/6 flex flex-wrap">
        {renderUpvotes()}

      </div>
      <div className="basis-1/6 flex items-center">
        <button onClick={handleAddClick} className="rounded bg-almost-white">
          <Plus />
        </button>
      </div>
    </div>
  )


}

export default UpvoteList;