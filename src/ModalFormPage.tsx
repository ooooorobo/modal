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
          <h2>뭔가 신청하기</h2>
          <SubscriptionForm onSubmit={onSubmit}/>
          <div style={{height: '150vh'}}>아주 긴 무언가</div>
        </>
      }
      triggerElement={
        ({open, ref}) => (
          <button
            ref={ref}
            onClick={() => handleOpenForm(open)}
            style={{marginTop: '30vh', marginBottom: '200vh'}}
          >
            신청하기
          </button>
        )
      }
    />
  </div>;
};

export default ModalFormPage;
