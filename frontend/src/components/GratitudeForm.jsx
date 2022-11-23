import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGratitude } from '../features/gratitude/gratitudeSlice'

function GratitudeForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGratitude({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Gratitude</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Gratitude
          </button>
        </div>
      </form>
    </section>
  )
}

export default GratitudeForm
