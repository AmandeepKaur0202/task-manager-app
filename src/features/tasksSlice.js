import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch tasks from API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data.map(task => ({
    id: task.id,
    title: task.name,
    assignedTo: task.email,
    status: task.id % 2 ? 'Completed' : 'Pending',
    priority: task.id % 5 ? 'High' : 'Low',
    startDate: '01Dec2024',
    endDate: task.id % 2 ? '25Jan2024' : '30Jan2024',
  }));
});

// Fetch a single task by ID
export const fetchTaskById = createAsyncThunk('tasks/fetchTaskById', async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await response.json();
  return {
    id: data.id,
    title: data.name,
    assignedTo: data.email,
    status: data.id % 2 ? 'Completed' : 'Pending',
    priority: data.id % 5 ? 'High' : 'Low',
    startDate: '01Dec2024',
    endDate: data.id % 2 ? '25Jan2024' : '30Jan2024',
  };
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return await response.json();
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], task: null, loading: false },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        // Update the task in the state
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.task = action.payload; // Store the updated task as well
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
