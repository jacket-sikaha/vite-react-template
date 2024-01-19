import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

// 定义 slice state 的类型
interface CounterState {
  value: number;
}

// 使用该类型定义初始 state
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许我们在 reducers 中编写 mutating 逻辑。
      // 它实际上并没有 mutate state 因为它使用了 Immer 库，
      // 它检测到草稿 state 的变化并产生一个全新的基于这些更改的不可变 state
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
