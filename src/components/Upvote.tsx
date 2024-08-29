import ArrowUp from "@components/icons/ArrowUp";

interface UpvoteProps {
  onClick: () => void;
  isSelected: boolean;
}

function Upvote({ onClick, isSelected }: UpvoteProps): JSX.Element {

  function handleButtonClick(): void {
    console.log('upvote button clicked');
    onClick();
  }

  const backgroundColor = isSelected ? 'bg-lightgray' : 'bg-almost-white';
  const fillColor = isSelected ? 'fill-cobalt-blue' : 'fill-darkgray';

  return (
    <div data-testid="upvote-button">
      <button
        onClick={handleButtonClick}
        className={`m-2 rounded ${backgroundColor}`}
        aria-label='upvote-button'
      >
        <ArrowUp fillColorClass={fillColor} />
      </button>
    </div>
  )
}

export default Upvote;
