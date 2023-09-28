import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, updateItem, deleteItem } from './cartsAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk( 
  'carts/fetchItems',
  async (amount) => {
    const response = await fetchItems(amount);
    return response.data;
  }
);

export const addAsync = createAsyncThunk( 
  'carts/addItem',
  async (item) => {
    const {id, title, brand, price, thumbnail} = item; 
    const response = await addItem({id, title, brand, price, thumbnail, quantity:1});
    return response.data;
  }
);

export const deleteAsync = createAsyncThunk( 
  'carts/deleteItem',
  async (id) => {
    await deleteItem(id);
    return id;
  }
);

export const updateAsync = createAsyncThunk( 
  'carts/updateItem',
  async ({id, change}) => {
    const res = await updateItem(id, change);
    return res.data;
  }
);


export const cartsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id === action.payload)
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id === action.payload.id)
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const { } = cartsSlice.actions;
export default cartsSlice.reducer;
