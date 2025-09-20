import {useFormModal} from "./context/FormContext";

const ModalFormPage = () => {
  const {openFormModal} = useFormModal()
  
  const handleOpenForm = () => {
    openFormModal().then(v => console.log(v))
  }
  
  return <div style={{height: '200vh'}}>
    <button onClick={handleOpenForm} style={{marginTop: '100vh'}}>
      신청하기
    </button>
  </div>;
};

export default ModalFormPage;
