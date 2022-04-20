import { Dispatch } from 'redux';
declare type Thunk = (dispatch: Dispatch<any>, getState: any) => void;
export default function catchAsync(fn: Thunk, onEnd?: Function): (dispatch: any, getState: any) => Promise<void>;
export {};
