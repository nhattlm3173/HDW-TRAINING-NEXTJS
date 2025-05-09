import React from 'react';
import { decrement, increment } from '@/redux/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function Docs() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      docs
      <div>
        <div>
          <button
            aria-label="Increment value"
            className="m-3 h-10 cursor-pointer rounded-md bg-blue-300 px-2 py-1 transition-all hover:scale-110 active:scale-95"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            className="m-3 h-10 cursor-pointer rounded-md bg-amber-300 px-2 py-1 transition-all hover:scale-110 active:scale-95"
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
