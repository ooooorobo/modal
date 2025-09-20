import styles from './Modal.module.css'
import {type PropsWithChildren, useEffect} from "react";
import {createPortal} from "react-dom";

type Props = PropsWithChildren<{
  onClose: (value: FormData | null) => void
}>

/*
TODO:
- 포커스 트랩
- 트랜지션
 */
export const Modal = ({onClose, children}: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(null);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
  
  return (
    createPortal(
      <div className={styles.Wrapper}>
        <div className={styles.Dim} onClick={() => onClose(null)}/>
        <div className={styles.Container} aria-modal={true} role={'dialog'}>
          {children}
        </div>
      </div>,
      document.body
    )
  );
}