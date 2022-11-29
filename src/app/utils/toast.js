import {toast, Zoom} from "react-toastify";

const displaySuccessMessage = (message) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    transition: Zoom,
    icon: () => <img alt="success" src="/img/success.svg"/>
  });
}

const displayWarningMessage = (message) => {
  toast.warning(message, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    transition: Zoom,
    icon: () => <img alt="success" src="/img/warning.svg"/>
  });
}

const displayErrorMessage = (error) => {
  toast.error(error, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    transition: Zoom,
    icon: () => <img alt="success" src="/img/error.svg"/>
  });
}

export const Toast = {
  displaySuccessMessage,
  displayWarningMessage,
  displayErrorMessage
}
