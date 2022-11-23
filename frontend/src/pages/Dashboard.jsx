import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import GratitudeForm from '../components/GratitudeForm'
import GratitudeItem from '../components/GratitudeItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
// import { getGratitude, reset } from '../features/gratitude/gratitudeSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )
  // const { gratitude, isLoading, isError, message } = useSelector(
  //   (state) => state.gratitude
  // )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())
    // dispatch(getGratitude())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>TO HOPE</p>
      </section>

      <GoalForm />
      
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>

      <GratitudeForm />

      {/* <section className='content2'>
        {gratitude.length > 0 ? (
          <div className='gratitude'>
            {gratitude.map((gratitude) => (
              <GratitudeItem key={gratitude._id} gratitude={gratitude} />
            ))}
          </div>
        ) : (
          <h3>You have not written any gratitude statements, yet.</h3>
        )}
      </section> */}
    </>
  )
}

export default Dashboard
