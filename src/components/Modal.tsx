import styles from './Modal.module.css'
import { type PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import { FocusTrap } from "focus-trap-react";
import { CSSTransition } from 'react-transition-group';

type Props = PropsWithChildren<{
  onClose: (value: null) => void
}>

export const Modal = ({ onClose, children }: Props) => {
  const [ isVisible, setIsVisible ] = useState(false); // 내부 애니메이션 상태
  const nodeRef = useRef(null);

  // 닫기 시작 (애니메이션만 시작)
  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleExited = useCallback(() => {
    onClose(null);
  }, [ onClose ])

  useEffect(() => {
    setIsVisible(true)
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ handleClose ]);

  return (
    createPortal(
      <CSSTransition
        classNames={{
          enter: styles.ModalEnter,
          enterActive: styles.ModalEnterActive,
          exit: styles.ModalExit,
          exitActive: styles.ModalExitActive,
        }}
        in={isVisible}
        timeout={200}
        nodeRef={nodeRef}
        onExited={handleExited}
      >
        <RemoveScroll>
          <FocusTrap>
            <div className={styles.Wrapper}>
              <div className={styles.Dim} onClick={handleClose}/>
              <div ref={nodeRef} className={styles.Container} aria-modal={true} role={'dialog'}>
                {children}
              </div>
            </div>
          </FocusTrap>
        </RemoveScroll>
      </CSSTransition>,
      document.body
    )
  );
}