import UpvoteList from './component/UpvoteList'
import { useAppState } from './context/appContext'


function App() {
  const { state } = useAppState();

  return (
    <div className="flex flex-col gap-4 w-96 m-4 rounded shadow bg-white px-4 py-6">
      {state.upvoteLists.map((upvoteList, index) => {
        return (
          <UpvoteList key={index} upvoteList={upvoteList} index={index} />
        )
      })}
    </div>
  )
}

export default App
