import {type ReactNode, type Ref, useCallback, useRef, useState} from "react";
import {Modal} from "../components/Modal";

type FormProviderProps<FormValue> = {
  formElement: (props: { onSubmit: (data: FormValue) => void }) => ReactNode,
  triggerElement: (props: { open: () => Promise<FormValue | null>, ref: Ref<HTMLButtonElement | null> }) => ReactNode
}

export const FormContextProvider = <FormValue extends object>
({
   formElement,
   triggerElement
 }: FormProviderProps<FormValue>) => {
  const [open, setOpen] = useState(false)

  const resolveModalResponse = useRef<(value: FormValue | null) => void | null>(null)
  const triggerElementRef = useRef<HTMLButtonElement>(null)

  const handleClose = useCallback((value: FormValue | null) => {
    resolveModalResponse.current?.(value);
    setOpen(false);
    triggerElementRef.current?.focus();
  }, [])

  const handleOpen = useCallback((): Promise<FormValue | null> => {
    setOpen(true);
    return new Promise(resolve =>
      resolveModalResponse.current = resolve
    )
  }, [])

  return <>
    {triggerElement({open: handleOpen, ref: triggerElementRef})}
    {open && <Modal onClose={handleClose}>
      {formElement({onSubmit: handleClose})}
    </Modal>}
  </>
}
