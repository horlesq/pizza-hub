import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeolocationType, UserState } from "../../types/types";
import { getAddress } from "../../services/apiGeocoding";

const initialState: UserState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

// Creating the user slice using Redux Toolkit's createSlice function
const userSlice = createSlice({
  name: "user", // The name of the slice
  initialState,
  reducers: {
    // Reducer for updating the username in the state
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  // Handling extra reducers for async actions (fetchAddress)
  extraReducers(builder) {
    // When the fetchAddress async action is pending (loading state)
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    });

    // When the fetchAddress async action is fulfilled (successful completion)
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.status = "idle";
    });

    // When the fetchAddress async action is rejected (failed)
    builder.addCase(fetchAddress.rejected, (state) => {
      state.status = "failed";
      state.error =
        "There was a problem getting your location. Make sure to fill this field.";
    });
  },
});

// Selector function to retrieve the username from the Redux store
export const getUsername = function (state: { user: UserState }) {
  return state.user.username;
};

// Helper function to get the user's current geolocation position
function getPosition(): Promise<GeolocationType> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Creating an async thunk for fetching the user's address based on geolocation
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // Get the user's current geolocation position
    const positionObj: GeolocationType = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // Use the reverse geocoding API to get a description of the user's address from their position
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // Return the position and formatted address to update the Redux state
    return { position, address };
  },
);

// Exporting the action for updating the username and the reducer to use in the store
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
