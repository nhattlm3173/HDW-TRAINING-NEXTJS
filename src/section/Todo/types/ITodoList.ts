import { Dispatch, SetStateAction } from 'react';

export interface TodoValue {
  id: string;
  message: string;
  isFinish: boolean;
}

export interface TodoFormValues {
  message: string;
}
