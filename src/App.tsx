import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import PostsPage from './pages/Posts/PostsPage';
import UserDetailsPage from "./pages/UserDetails/UserDetailsPage";
import { UserContext } from './contexts/UserContext';
import "./App.css";

export const DEFAULT_USER_ID = 1;

function App() {
  const [activeUser, setActiveUser] = useState(DEFAULT_USER_ID);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Helvetica Neue',
          colorPrimary: 'black',
        },
      }}
    >
      <UserContext.Provider value={{ activeUser, setActiveUser }}>
        <BrowserRouter>
          <Routes>
              <Route path="posts" element={<PostsPage />} />
              <Route path="active-user" element={<UserDetailsPage />} />
              <Route path="*" element={<PostsPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ConfigProvider>
  );
}

export default App;
