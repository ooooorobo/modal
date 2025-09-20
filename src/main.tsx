import "modern-normalize";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import ModalFormPage from "./ModalFormPage";
import {FormContextProvider} from "./context/FormContext";
import {SubscriptionForm} from "./components/SubscriptionForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormContextProvider
      formElement={
        ({onSubmit}) => <>
          {/* TODO: children을 밖에서 받아올 수 있게 */}
          <h2>뭔가 신청하기</h2>
          <div style={{height: '150vh'}}>아주 긴 무언가</div>
          <SubscriptionForm onSubmit={onSubmit}/>
        </>
      }>
      <ModalFormPage/>
    </FormContextProvider>
  </StrictMode>
);
