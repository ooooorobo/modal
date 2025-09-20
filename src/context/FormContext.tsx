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
  const previousActiveElementRef = useRef<HTMLElement>(null)
  
  const handleClose = useCallback((value: FormData | null) => {
    resolveModalResponse.current?.(value);
    setOpen(false);
    previousActiveElementRef.current?.focus?.();
  }, [])
  
  const value = useMemo(() => ({
    openFormModal: (): Promise<FormData | null> => {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      setOpen(true);
      return new Promise(resolve =>
        resolveModalResponse.current = resolve
      )
    }
  } satisfies FormContextValue), [])
  
  return <FormContext.Provider value={value}>
    {children}
    {open && <Modal onClose={handleClose}>
      {/* TODO: children을 밖에서 받아올 수 있게 */}
      <h2>뭔가 신청하기</h2>
      <form action={() => handleClose({})}>
        <label>
          이름
          <input type="text" autoFocus={true}/>
        </label>
        <label>
          이메일
          <input type="email" inputMode="email"/>
        </label>
        <button
          type={'button'}
          onClick={() => handleClose(null)}>
          취소
        </button>
        <button type={'submit'}>
          신청
        </button>
      </form>
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