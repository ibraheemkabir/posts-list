import { Avatar } from "antd";
import "./AvatarButton.css";

interface AvatarButtonProps {
    icon: JSX.Element;
    onClick?: () =>  void;
}

export default function AvatarButton(props: AvatarButtonProps) {
    const {onClick, icon} = props;

    return <Avatar
        shape="square"
        size={40}
        icon={icon}
        className="avatar-button"
        onClick={onClick}
    />
}