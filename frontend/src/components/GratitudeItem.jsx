import { useDispatch } from 'react-redux'
import { deleteGratitude } from '../features/gratitude/gratitudeSlice'

function GratitudeItem({ gratitude }) {
  const dispatch = useDispatch()

  return (
    <div className='gratitude'>
      <div>{new Date(gratitude.createdAt).toLocaleString('en-US')}</div>
      <h2>{gratitude.text}</h2>
      <button onClick={() => dispatch(deleteGratitude(gratitude._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GratitudeItem