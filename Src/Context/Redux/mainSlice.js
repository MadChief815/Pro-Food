import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';

// Auth Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Profile Slice
export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profilePicture: null,
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    clearProfilePicture: (state) => {
      state.profilePicture = null;
    },
  },
});

// User Data Slice
export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userLogged: false,
    userName: null,
    userEmail: null,
    userPassword: null,
    gender: null,
    phone: null,
    dateofbirth: null,
    address: null,
    city: null,
    houseNo: null
  },
  reducers: {
    setUserLogged: (state, action) => {
      state.userLogged = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserPassword: (state, action) => {
      state.userPassword = action.payload;
    },
    setUserGender: (state, action) => {
      state.gender = action.payload;
    },
    setUserPhone: (state, action) => {
      state.phone = action.payload;
    },
    setUserDateofBirth: (state, action) => {
      state.dateofbirth = action.payload;
    },
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setUserCity: (state, action) => {
      state.city = action.payload;
    },
    setUserHouseNo: (state, action) => {
      state.houseNo = action.payload;
    },
  },
});

// Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  userData: userDataSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'profile', 'userData'], // Persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore persistence actions
      },
    }),
});

export const persistor = persistStore(store);

// Export Actions
export const { setUser, logout } = authSlice.actions;
export const { setProfilePicture, clearProfilePicture } = profileSlice.actions;
export const {
  setUserLogged,
  setUserName,
  setUserEmail,
  setUserPassword,
  setUserGender,
  setUserPhone,
  setUserAddress,
  setUserCity,
  setUserDateofBirth,
  setUserHouseNo,
} = userDataSlice.actions;

// Selectors for userData slice
export const selectUserData = (state) => state.userData;
export const selectUserName = (state) => state.userData.userName;
export const selectUserEmail = (state) => state.userData.userEmail;
export const selectUserPassword = (state) => state.userData.userPassword;
export const selectUserLogged = (state) => state.userData.userLogged;
