import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gratitudeService from './gratitudeService'

const initialState = {
  gratitude: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new gratitude
export const createGratitude = createAsyncThunk(
  'gratitude/create',
  async (gratitudeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gratitudeService.createGratitude(gratitudeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user gratitudes
export const getGratitudes = createAsyncThunk(
  'gratitude/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gratitudeService.getGratitude(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user gratitude
export const deleteGratitude = createAsyncThunk(
  'gratitude/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gratitudeService.deleteGratitude(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const gratitudeSlice = createSlice({
  name: 'gratitude',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGratitude.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGratitude.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.gratitude.push(action.payload)
      })
      .addCase(createGratitude.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // .addCase(getGratitude.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(getGratitude.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.gratitude = action.payload
      // })
      // .addCase(getGratitude.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      // })
      .addCase(deleteGratitude.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGratitude.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.gratitude = state.gratitude.filter(
          (gratitude) => gratitude._id !== action.payload.id
        )
      })
      .addCase(deleteGratitude.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = gratitudeSlice.actions
export default gratitudeSlice.reducer
