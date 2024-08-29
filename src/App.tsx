import UpvoteList from '@components/UpvoteList'
import { useAppState } from '@context/app-context'


function App() {
  const { state } = useAppState();

  return (
    <ul className="flex flex-col gap-4 w-96 m-4 rounded shadow bg-white px-4 py-6" role='list'>
      {state.upvoteLists.map((upvoteList, index) => {
        return (
          <UpvoteList key={index} upvoteList={upvoteList} index={index} />
        )
      })}
    </ul>
  )
}

export default App
