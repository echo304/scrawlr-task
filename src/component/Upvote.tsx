interface UpvoteProps {
  onClick: () => void;
  isSelected: boolean;
}

function Upvote({ onClick, isSelected }: UpvoteProps): JSX.Element {

  function handleButtonClick(): void {
    onClick();
  }

  return (
    <div>
      <button onClick={handleButtonClick}
        className="bg-sky-500 hover:bg-sky-700 m-2"
      >Upvote</button>
      {isSelected ? "Selected" : "Not Selected"}
    </div>
  )
}

export default Upvote;