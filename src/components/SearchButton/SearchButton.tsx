import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"

import styles from './SearchButton.module.css';

interface SearchButtonProps {
    onChange: (value: string) => void,
    onClear: () => void,
    value: string
}

export const SearchButton = (props: SearchButtonProps) => {
    const { value, onChange, onClear } = props;

    return (
        <div className={styles.input__search__container}>
            <Input
                data-testid={'search-input'}
                className={styles.input__search}
                size={'large'}
                value={value}
                onChange={(evt) => onChange(evt.currentTarget.value)}
                placeholder="Search posts"
                prefix={<SearchOutlined className={styles.input__search__icon} />}
                suffix={value && <CloseCircleFilled className={styles.input__search__closeIcon} onClick={() => onClear()} />}
            />
        </div>
    )
}
