import { useReducer, useRef } from "react";
import { DEFAULT_TOAST_DURATION_MS } from "./constants";

const ADD = "add";
const RESET = "reset";

const initialState = {
  toast: null,
};

const toastReducer = (state, action) => {
  const { type, toast } = action;
  switch (type) {
    case ADD:
      return { toast };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const useToast = () => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const timeout = useRef(null);
  const { toast } = state;

  const showToast = ({
    type,
    message,
    actionMessage,
    onActionPress,
    toastDuration = DEFAULT_TOAST_DURATION_MS,
  } = {}) => {
    // ensure that the toast is reset and the new toast will be up the full duration a toast should
    // be shown for. Clear timeout to ensure an old timer doesn't remove the new toast.
    timeout?.current && clearTimeout(timeout.current);
    // we want to reset before adding a new toast so the animation happens
    dispatch({ type: RESET });

    dispatch({
      type: ADD,
      toast: { type, message, actionMessage, onActionPress, toastDuration },
    });

    // Resetting removes the toast from the DOM. Do this after the animation completes
    // so that it doesn't pop up in the next modal.
    timeout.current = setTimeout(() => {
      dispatch({ type: RESET });
    }, toastDuration);
  };

  const resetToast = () => {
    dispatch({ type: RESET });
  };

  return {
    toast,
    showToast,
    resetToast,
  };
};

export default useToast;
