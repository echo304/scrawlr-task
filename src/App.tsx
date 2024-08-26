import UpvoteList from './component/UpvoteList'
import { useAppState } from './context/appContext'


function App() {
  const { state } = useAppState();

  return (
    <>
      {state.upvoteLists.map((upvoteList, index) => {
        return (
          <UpvoteList key={index} upvoteList={upvoteList} index={index} />
        )
      })}
    </>
  )
}

export default App
