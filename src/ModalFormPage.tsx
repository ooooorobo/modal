import {FormContextProvider} from "./context/FormProvider";
import {SubscriptionForm} from "./components/SubscriptionForm";
import type {SubscriptionFormValue} from "./schema/subscriptionFormSchema";

const ModalFormPage = () => {
  const handleOpenForm = (open: () => Promise<SubscriptionFormValue | null>) => {
    open().then(v => console.log(v))
  }

  return <div style={{height: '200vh'}}>
    <FormContextProvider<SubscriptionFormValue>
      formElement={
        ({onSubmit}) => <>
          {/* TODO: children을 밖에서 받아올 수 있게 */}
          <h2>뭔가 신청하기</h2>
          <div style={{height: '150vh'}}>아주 긴 무언가</div>
          <SubscriptionForm onSubmit={onSubmit}/>
        </>
      }
      triggerElement={
        ({open}) => (
          <button onClick={() => handleOpenForm(open)} style={{marginTop: '100vh'}}>
            신청하기
          </button>
        )
      }
    />
  </div>;
};

export default ModalFormPage;
