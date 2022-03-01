import { useReducer } from "react";

const useValidate = (validate) => {
  const initialState = { value: "", isValid: null };

  const inputReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: validate(action.val) };
    }
    if (action.type === "INPUT_BLUR") {
      return { value: state.value, isValid: validate(state.value) }; // Here State includes previous state snapshot
    }

    if (action.type === "RESET") {
      return { value: "", isValid: null };
    }
  };
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const inputChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT", val: event.target.value });
  };

  const validateInputHandler = () => {
    dispatchInput({ type: "INPUT_BLUR" });
  };

  const resetInputHandler = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    inputChangeHandler,
    validateInputHandler,
    resetInputHandler,
  };
};

export default useValidate;
