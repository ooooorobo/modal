import { FormContextProvider } from './context/FormProvider';
import { SubscriptionForm } from './components/SubscriptionForm';
import type { SubscriptionFormValue } from './schema/subscriptionFormSchema';

const ModalFormPage = () => {
  const handleOpenForm = async (open: () => Promise<SubscriptionFormValue | null>) => {
    const result = await open();
    if (!result) return;

    alert(`신청을 완료했어요!\n이름: ${result.name}\n이메일: ${result.email}`)
  }

  return <div style={{ height: '200vh' }}>
    <FormContextProvider<SubscriptionFormValue>
      formElement={
        ({ onSubmit }) => <>
          <SubscriptionForm onSubmit={onSubmit}/>
        </>
      }
      triggerElement={
        ({ open, ref }) => (
          <button
            ref={ref}
            onClick={() => handleOpenForm(open)}
            style={{ marginTop: '30vh', marginBottom: '200vh' }}
          >
            신청하기
          </button>
        )
      }
    />
  </div>;
};

export default ModalFormPage;
