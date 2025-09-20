import styles from './Modal.module.css'
import type {PropsWithChildren} from "react";

export const Modal = ({children}: PropsWithChildren) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Dim}>
        <div className={styles.Container} aria-modal={true} role={'dialog'}>
          {children}
        </div>
      </div>
    </div>
  );
}