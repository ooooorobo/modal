import {createContext, type PropsWithChildren, useCallback, useContext, useMemo, useRef, useState} from "react";
import {Modal} from "../components/Modal";

type FormContextValue = {
  openFormModal: () => Promise<FormData | null>
}


type FormData = {}

const FormContext = createContext<FormContextValue | null>(null)

export const FormContextProvider = ({children}: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const resolveModalResponse = useRef<(value: FormData | null) => void | null>(null)
  
  const handleClose = useCallback((value: FormData | null) => {
    resolveModalResponse.current?.(value);
    setOpen(false);
  }, [])
  
  const value = useMemo(() => ({
    openFormModal: (): Promise<FormData | null> => {
      setOpen(true);
      return new Promise(resolve =>
        resolveModalResponse.current = resolve
      )
    }
  } satisfies FormContextValue), [])
  
  return <FormContext.Provider value={value}>
    {children}
    {open && <Modal onClose={handleClose}>
      <button onClick={() => handleClose(null)}>닫기</button>
      <button onClick={() => handleClose({})}>값 제출하면서 닫기</button>
    </Modal>}
  </FormContext.Provider>
}

export const useFormModal = (): FormContextValue => {
  const value = useContext(FormContext)
  if (!value) {
    throw new Error('useFormModal must be used within a FormContextProvider')
  }
  return value
}