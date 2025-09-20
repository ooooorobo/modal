import {createContext, type ReactNode, useCallback, useContext, useMemo, useRef, useState} from "react";
import {Modal} from "../components/Modal";

type FormContextValue<FormValue = object> = {
  openFormModal: () => Promise<FormValue | null>
}

type FormProviderProps<FormValue> = {
  children: ReactNode,
  formElement: (props: { onSubmit: (data: FormValue) => void }) => ReactNode
}

const FormContext = createContext<FormContextValue | null>(null)

export const FormContextProvider = <FormValue extends object>
({
   children,
   formElement
 }: FormProviderProps<FormValue>) => {
  const [open, setOpen] = useState(false)
  const resolveModalResponse = useRef<(value: FormValue | null) => void | null>(null)
  const previousActiveElementRef = useRef<HTMLElement>(null)

  const handleClose = useCallback((value: FormValue | null) => {
    resolveModalResponse.current?.(value);
    setOpen(false);
    previousActiveElementRef.current?.focus?.();
  }, [])

  const value = useMemo(() => ({
    openFormModal: (): Promise<FormValue | null> => {
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
      {formElement({onSubmit: handleClose})}
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