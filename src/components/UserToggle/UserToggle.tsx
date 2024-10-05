import { Select } from "antd"

import styles from './UserToggle.module.css';

interface SearchButtonProps {
    onChange: (id: number) => void,
    value: number,
    options: { label: string; value: number; }[]
}

export const UserToggle = (props: SearchButtonProps) => {
    const { options, onChange, value } = props;

    return (
        <div className={styles.user_toggle__container}>
            <Select
                data-testid={'user-toggle'}
                options={options}
                onChange={onChange}
                value={value}
                popupMatchSelectWidth={false}
                popupClassName={styles.user_toggle_popup}
                rootClassName={styles.user_toggle_container}
                className={styles.user_toggle}
            />
        </div>
    )
}
