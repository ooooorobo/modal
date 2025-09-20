import {useState} from "react";
import {Modal} from "./Modal";

const ModalFormPage = () => {
  const [open, setOpen] = useState(false)
  
  return <div>
    <button onClick={() => setOpen(true)}>
      신청하기
    </button>
    {open && <Modal>hi</Modal>}
  </div>;
};

export default ModalFormPage;
