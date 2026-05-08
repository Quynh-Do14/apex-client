import React from 'react'
import styles from '@/assets/styles/components/button.module.css'
type Props = {
    onClick: () => void,
    title: string,
    width?: number
    disabled?: boolean
}
const ButtonCommon = (props: Props) => {
    const {
        onClick,
        title,
        width = false,
        disabled = false,
    } = props;
    return (
        <button
            onClick={onClick}
            className={styles.submitButton}
            disabled={disabled}
            style={{
                width: width ? width : '100%',
                whiteSpace: "nowrap"
            }}
        >
            <span className={styles.buttonText}>{title}</span>
            <div className={styles.buttonGlow}></div>
        </button>
    )
}

export default ButtonCommon