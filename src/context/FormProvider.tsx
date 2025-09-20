import {type ReactNode, useCallback, useRef, useState} from "react";
import {Modal} from "../components/Modal";

type FormProviderProps<FormValue> = {
  formElement: (props: { onSubmit: (data: FormValue) => void }) => ReactNode,
  triggerElement: (props: { open: () => Promise<FormValue | null> }) => ReactNode
}

export const FormContextProvider = <FormValue extends object>
({
   formElement,
   triggerElement
 }: FormProviderProps<FormValue>) => {
  const [open, setOpen] = useState(false)

  const resolveModalResponse = useRef<(value: FormValue | null) => void | null>(null)
  const previousActiveElementRef = useRef<HTMLElement>(null)

  const handleClose = useCallback((value: FormValue | null) => {
    resolveModalResponse.current?.(value);
    setOpen(false);
    previousActiveElementRef.current?.focus?.();
  }, [])

  const handleOpen = useCallback((): Promise<FormValue | null> => {
    previousActiveElementRef.current = document.activeElement as HTMLElement;
    setOpen(true);
    return new Promise(resolve =>
      resolveModalResponse.current = resolve
    )
  }, [])

  return <>
    {triggerElement({open: handleOpen})}
    {open && <Modal onClose={handleClose}>
      {formElement({onSubmit: handleClose})}
    </Modal>}
  </>
}
