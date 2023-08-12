import { configureStore } from '@reduxjs/toolkit'
import { salaSlice } from './slices/sala/salaSlice'

export const store = configureStore({
  reducer: {
    sala:salaSlice.reducer
  },
})