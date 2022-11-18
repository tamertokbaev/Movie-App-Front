import {toast} from "react-toastify";

const displaySuccessMessage = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false
  });
}

const displayWarningMessage = (message) => {
  toast.warning(message, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false
  });
}

const displayErrorMessage = (error) => {
  toast.error(error, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false
  });
}

export const Toast = {
  displaySuccessMessage,
  displayWarningMessage,
  displayErrorMessage
}
