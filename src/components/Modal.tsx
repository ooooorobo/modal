import styles from './Modal.module.css'
import {type PropsWithChildren, useEffect} from "react";
import {createPortal} from "react-dom";
import {RemoveScroll} from "react-remove-scroll";
import {FocusTrap} from "focus-trap-react";

type Props = PropsWithChildren<{
  onClose: (value: null) => void
}>

/*
TODO:
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
      <RemoveScroll>
        <FocusTrap>
          <div className={styles.Wrapper}>
            <div className={styles.Dim} onClick={() => onClose(null)}/>
            <div className={styles.Container} aria-modal={true} role={'dialog'}>
              {children}
            </div>
          </div>
        </FocusTrap>
      </RemoveScroll>,
      document.body
    )
  );
}