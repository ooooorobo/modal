import {useFormModal} from "./context/FormContext";

const ModalFormPage = () => {
  const {openFormModal} = useFormModal()
  
  const handleOpenForm = () => {
    openFormModal().then(v => console.log(v))
  }
  
  return <div>
    <button onClick={handleOpenForm}>
      신청하기
    </button>
  </div>;
};

export default ModalFormPage;
