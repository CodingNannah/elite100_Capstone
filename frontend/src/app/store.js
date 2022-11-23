import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import gratitudeReducer from '../features/gratitude/gratitudeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    // gratitude: gratitudeReducer,
  },
})
