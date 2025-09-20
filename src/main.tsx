import "modern-normalize";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import ModalFormPage from "./ModalFormPage";
import {FormContextProvider} from "./context/FormContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormContextProvider>
      <ModalFormPage/>
    </FormContextProvider>
  </StrictMode>
);
