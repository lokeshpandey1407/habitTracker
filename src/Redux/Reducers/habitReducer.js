import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";

const initialState = {
  habits: [],
  habitDays: [],
  isHabitsLoading: false,
  isLoading: false,
  currentDate: new Date().toISOString().slice(0, 10),
  activeDate: new Date().toISOString().slice(0, 10),
};

const getFutureDays = () => {
  const futureDays = [];
  for (let i = 0; i < 7; i++) {
    futureDays.push(
      new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
  }
  return futureDays;
};

export const fetchHabitsAsync = createAsyncThunk("habit/all", async (key) => {
  return localforage.getItem(key);
});

export const addHabitAsync = createAsyncThunk(
  "habit/add",
  async ({ habitObj, habitDays, activeDate }) => {
    habitDays.forEach(async (day) => {
      if (day !== activeDate) {
        const serializeHabits = await localforage.getItem(day);
        const updatedHabits = [...(serializeHabits || []), habitObj];
        localforage.setItem(day, updatedHabits);
      }
    });
    const futureDays = getFutureDays();

    // Function to add habits for future days
    futureDays.forEach(async (day) => {
      if (day !== activeDate) {
        const serializeHabits = await localforage.getItem(day);
        const updatedHabits = [...(serializeHabits || []), habitObj];
        localforage.setItem(day, updatedHabits);
      }
    });

    const serializeHabits = await localforage.getItem(activeDate);
    const updatedHabits = [...(serializeHabits || []), habitObj];
    localforage.setItem(activeDate, updatedHabits);
    return updatedHabits;
  }
);

export const updateHabitStatusAsync = createAsyncThunk(
  "habit/update",
  async ({ status, id, activeDate }) => {
    const habits = await localforage.getItem(activeDate);
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        habit.status = status;
      }
      return habit;
    });
    await localforage.setItem(activeDate, updatedHabits);
    return updatedHabits;
  }
);

export const deleteHabitAsync = createAsyncThunk(
  "habit/delete",
  async ({ id, activeDate }) => {
    const habits = await localforage.getItem(activeDate);
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    await localforage.setItem(activeDate, updatedHabits);
    return updatedHabits;
  }
);

export const deleteHabitAllAsync = createAsyncThunk(
  "habit/deleteAll",
  async ({ id, habitDays, activeDate }) => {
    let updatedHabits = [];
    habitDays.map(async (day) => {
      if (day !== activeDate) {
        const habits = await localforage.getItem(day);
        updatedHabits = habits.filter((habit) => habit.id !== id);
        await localforage.setItem(day, updatedHabits);
      }
    });
    const futureDays = getFutureDays();
    futureDays.map(async (day) => {
      if (day !== activeDate) {
        const habits = await localforage.getItem(day);
        updatedHabits = habits.filter((habit) => habit.id !== id);
        await localforage.setItem(day, updatedHabits);
      }
    });

    const habits = await localforage.getItem(activeDate);
    updatedHabits = habits.filter((habit) => habit.id !== id);
    await localforage.setItem(activeDate, updatedHabits);
    return updatedHabits;
  }
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    setActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },
    setHabitDays: (state, action) => {
      const pastDays = [];
      for (let i = 0; i < 7; i++) {
        pastDays.push(
          new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        );
      }
      state.habitDays = pastDays;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsAsync.fulfilled, (state, action) => {
        state.habits = action.payload || [];
        state.isHabitsLoading = false;
      })
      .addCase(fetchHabitsAsync.pending, (state, action) => {
        state.isHabitsLoading = true;
      })
      .addCase(addHabitAsync.fulfilled, (state, action) => {
        state.habits = action.payload;
        state.isLoading = false;
      })
      .addCase(addHabitAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateHabitStatusAsync.pending, (state, action) => {
        state.isHabitsLoading = true;
      })
      .addCase(updateHabitStatusAsync.fulfilled, (state, action) => {
        state.habits = action.payload;
        state.isHabitsLoading = false;
      })
      .addCase(deleteHabitAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteHabitAsync.fulfilled, (state, action) => {
        state.habits = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteHabitAllAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteHabitAllAsync.fulfilled, (state, action) => {
        state.habits = action.payload;
        state.isLoading = false;
      });
  },
});

export const habitReducer = habitSlice.reducer;
export const habitSelector = (state) => state.habitReducer;
export const { addHabit, setActiveDate, setHabitDays } = habitSlice.actions;
