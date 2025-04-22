import { ToastOptions } from "react-hot-toast";

export const toastStyle: ToastOptions = {
  position: "bottom-right",
  style: {
    width: "250px",
    height: "50px",
    fontSize: "17px",
    textTransform: "capitalize",
    color: "#fff",
    background: "#123524",
  },
};

export const limitExhaustedToastStyle: ToastOptions = {
  position: "bottom-right",
  style: {
    width: "300px",
    height: "50px",
    fontSize: "17px",
    textTransform: "capitalize",
    color: "#fff",
    background: "#123524",
    textAlign: "justify",
  },
};
