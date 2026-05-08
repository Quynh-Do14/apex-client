import React from 'react';
import styles from "@/assets/styles/components/input.module.css"

type Props = {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
};

const InputSearchCommon = (props: Props) => {
    const {
        placeholder,
        value,
        onChange,
        disabled,
    } = props;

    return (
        <div className={styles.inputCommon}>
            <div className={styles.inputWrapper}>
                <input
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    type="text"
                    className={styles.textInput}
                />
                <div className={styles.inputBorder}></div>
            </div>
        </div>
    );
};

export default InputSearchCommon;
