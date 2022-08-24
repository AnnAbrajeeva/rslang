import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TDispatch, TState } from "./store";

export const useTypedDispatch = () => useDispatch<TDispatch>();
export const useTypedSelector: TypedUseSelectorHook<TState> = useSelector;