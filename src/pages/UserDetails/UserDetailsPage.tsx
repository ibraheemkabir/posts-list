import { useContext, useEffect, useState } from "react";
import { Spin } from "antd";

import Page from "../../layouts/Page/Page";
import { UserContext } from "../../contexts/UserContext";
import { getSingleUserById } from "../../http/users";

export interface UserDetails {
    name: string;
    email: string;
    phone: string;
    website: string;
    id: number
};

export default function UserDetailsPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const { activeUser } = useContext(UserContext)

    // get Users api call to fetch users
    async function getUsersApi () {
        setIsLoading(true)
        const userDetails = await getSingleUserById(activeUser)
        
        setUserDetails(userDetails);
        setIsLoading(false)
    }

    useEffect(() => {
        getUsersApi()
    } , [activeUser]);
    

    return <Page title="User Details">
        {
            isLoading ? <Spin/> : 
            userDetails ?
                <div>
                    <p><b>Name:</b> {userDetails.name}</p>
                    <p><b>Email:</b> {userDetails.email}</p>
                    <p><b>Phone:</b> {userDetails.phone}</p>
                    <p><b>Website:</b> {userDetails.website}</p>
                </div>
            : <div>No User detail available.</div>
        }
    </Page>;
}
