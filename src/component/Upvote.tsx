import ArrowUp from "./icons/ArrowUp";

interface UpvoteProps {
  onClick: () => void;
  isSelected: boolean;
}

function Upvote({ onClick, isSelected }: UpvoteProps): JSX.Element {

  function handleButtonClick(): void {
    onClick();
  }

  const backgroundColor = isSelected ? 'bg-lightgray' : 'bg-almost-white';
  const fillColor = isSelected ? 'fill-cobalt-blue' : 'fill-darkgray';

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className={`m-2 rounded ${backgroundColor}`}
      >
        <ArrowUp fillColorClass={fillColor} />
      </button>
    </div>
  )
}

export default Upvote;
