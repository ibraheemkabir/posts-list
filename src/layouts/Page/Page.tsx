import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/lib/layout/layout";

import AvatarButton from "../../components/AvatarButton/AvatarButton";
import { UserToggle } from "../../components/UserToggle/UserToggle";
import { UserContext } from "../../contexts/UserContext";
import { UserDetails } from "../../pages/UserDetails/UserDetailsPage";

import "./Page.css";
import { getUsers } from "../../http/users";

interface PageProps {
    title: string;
    children: JSX.Element;
}

export default function Page(props: PageProps) {
    const {title, children} = props;
    const [ users, setUsers ] = useState<UserDetails[]>()
    const { setActiveUser, activeUser } = useContext(UserContext)

    const handleGetUsers = async () => {
        const users = await getUsers()
        setUsers(users)
    }

    useEffect(() => {
        handleGetUsers()
    } , []);

    return <Layout>
        <Header className="page-header">
            <div className="page-header-item left">
                <Link to="/active-user"><AvatarButton icon={<UserOutlined data-testid={'user-avatar'} />} /></Link>
                <Link to="/posts"><AvatarButton icon={<UnorderedListOutlined/>} /></Link>
            </div>
            <h1>{title}</h1>  
            <div className="page-header-item right">
                <UserToggle 
                    options={(users || []).map((user) => { 
                        return {"label": user.name, "value": user.id} 
                    })}
                    value={activeUser}
                    onChange={(userId: number) => setActiveUser && setActiveUser(userId)}
                />
            </div>
        </Header>
        <Content className="page-content">
            {children}
        </Content>
    </Layout>
}
