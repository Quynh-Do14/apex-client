import React from 'react';
import styles from "@/assets/styles/components/input.module.css"

type Props = {
    listDataOfItem: Array<any>,
    onChange: any
    value: string,
    valueName?: string;
    labelName?: string;
    label: string;
}

const SelectSearchProvince = (props: Props) => {
    const {
        listDataOfItem,
        onChange,
        value,
        valueName = 'id',
        labelName = 'name',
        label
    } = props;

    return (
        <div className={styles.inputCommon}>
            <div className={styles.inputWrapper}>
                <select
                    onChange={onChange}
                    className={styles.textInput}
                    value={value}
                >  <option value="">-- Chọn {label.toLowerCase()} --</option>
                    {
                        listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                            return (
                                <option key={index}
                                    value={`${item[valueName]}-${item[labelName]}`}
                                    title={item[labelName]}
                                >
                                    {item[labelName]}
                                </option>
                            )
                        })
                    }
                </select>
                <div className={styles.inputBorder}></div>
            </div>
        </div>
    );
};

export default SelectSearchProvince;
