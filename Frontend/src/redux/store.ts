import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./app-state";
import { authSlice } from "./auth-slice";
import { vacationsSlice } from "./vacations-slice";

// Store object - handling entire global state:
export const store = configureStore<AppState>({
    reducer: {
        user: authSlice.reducer,              // Connect AppState user to auth slice reducers.
        vacations: vacationsSlice.reducer     // Connect AppState vacations to vacations slice reducers.
    }
});


// User Event: User clicks "Book Villa" (DOM onClick event).
// API Call: The component calls the API service directly and awaits the server response (skipping Redux entirely for the request).
// API Response: The server processes the booking and returns success data back to the component.
// Action Creation: The component creates a plain Action object containing its type and payload with the returned server data ({ id: 1, price: 3, status: 'confirmed' }).
// Dispatch to Reducer: store.dispatch(action) delivers that Action object directly to the store (no custom async middleware needed).
// Reducer & State: store.dispatch routes the Action by type to the matching reducer in the matching slice, which updates the State with the booking confirmation.
// View Re-render: The React UI detects the state change and updates to show "Booking Confirmed!".