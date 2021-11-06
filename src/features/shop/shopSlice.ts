import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchShop } from "./shopAPI";

export type ShopItem = {
  id: number;
  name: string;
};

export interface ShopState {
  items: ShopItem[];
  status: "idle" | "loading" | "failed";
}

const initialState: ShopState = {
  items: [],
  status: "idle"
};

// 第一個 type 參數會自動生成以下三 api 的生命週期類型, 可搭配 extraReducers 新增 Case
// pending： 'shop/fetchShop/pending'
// fulfilled： 'shop/fetchShop/fulfilled'
// rejected： 'shop/fetchShop/rejected'
export const fetchShopAsync = createAsyncThunk("shop/fetchShop", async () => {
  const response = await fetchShop();
  return response.data;
});

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addShop: (state, action: PayloadAction<ShopItem>) => {
      state.items.push(action.payload);
    },
    removeShop: (state, action: PayloadAction<ShopItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    }
  },
  // 處理特殊邏輯, 可針對 asyncThunk 定義的 type 來處理
  extraReducers: (builder) => {
    builder
      // fetchShopAsync peding 狀態
      .addCase(fetchShopAsync.pending, (state) => {
        state.status = "loading";
      })
      // fetchShopAsync api 成功回傳時
      .addCase(fetchShopAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload.items;
      });
  }
});

export const { addShop, removeShop } = shopSlice.actions;

export const selectShop = (state: RootState) => state.shop;

export default shopSlice.reducer;
