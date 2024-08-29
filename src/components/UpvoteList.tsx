import Upvote from '@components/Upvote';
import { useAppState } from "@context/app-context";
import Plus from "@components/icons/Plus";


interface UpvoteListProps {
  upvoteList: { numberOfUpvote: number, isSelected: boolean };
  index: number;
}

function UpvoteList({ upvoteList, index }: UpvoteListProps): JSX.Element {
  const { dispatch } = useAppState();
  const { numberOfUpvote, isSelected } = upvoteList;

  const handleUpvoteClick = () => {
    dispatch({ type: 'toggleSelectionStateOfList', payload: index });
  }

  function handleAddClick() {
    dispatch({ type: 'addUpvoteToList', payload: index });
  }

  function renderUpvotes() {
    const upvotes = [];
    for (let i = 0; i < numberOfUpvote; i++) {
      upvotes.push(<Upvote isSelected={isSelected} onClick={handleUpvoteClick} key={`Upvote_${i}`} />);
    }

    return upvotes;
  }

  return (
    <li className="flex gap-2" role='listitem'>
      <div className="flex flex-wrap basis-5/6 border-solid border rounded border-slate-300 m-1">
        {renderUpvotes()}
      </div>
      <div className="basis-1/6 flex items-center">
        <button
          onClick={handleAddClick}
          className="rounded bg-almost-white"
          data-testid="add-upvote-button"
        >
          <Plus />
        </button>
      </div>
    </li>
  )


}

export default UpvoteList;