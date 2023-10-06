import React, {useState, useEffect} from "react";
import "../css/Header.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Header = ({ setAuth }) => {

  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Logout successfully');
      navigate('/login');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <header>
      <h1>{name}</h1>
      <button className="logout-button" onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;



// import React, { useState } from 'react';
// import { Badge, Menu, Dropdown, Space } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import "../css/header.css";

// const DropdownMenu = () => {
//   const navigate = useNavigate();

//   const handleMenuClick = ({ key }) => {
//     // Navigate to the next page based on the selected menu item
//     switch (key) {
//       case 'menu-item-1':
//         navigate('/EmployeeRegisteration');
//         break;
//       case 'menu-item-2':
//         navigate('/employee');
//         break;
//       case 'menu-item-3':
//         navigate('/Union');
//         break;
//       case 'menu-item-4':
//         navigate('');
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Menu onClick={handleMenuClick}>
//       <Menu.Item key="menu-item-1">New Employee Registration</Menu.Item>
//       <Menu.Item key="menu-item-2">Check Employee Status</Menu.Item>
//       <Menu.Item key="menu-item-3">Stats & Districts</Menu.Item>
//       <Menu.Item key="menu-item-4">Flight Reports</Menu.Item>
//     </Menu>
//   );
// };

// const ProfileBadge = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleBadgeClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const badgeStyle = {
//     color: 'white',
//     backgroundColor: 'rgba(0, 255, 0, 0.25)',
//     borderRadius: 20,
//     fontSize: 24,
//     padding: 8,
//   };

//   return (
//     <Dropdown visible={isDropdownOpen} onVisibleChange={setIsDropdownOpen} overlay={<DropdownMenu />}>
//       <Badge count={<UserOutlined style={badgeStyle} />} onClick={handleBadgeClick} />
//     </Dropdown>
//   );
// };

// const Header = ({ setAuth }) => {
//   const navigate = useNavigate();
//   const logout = async (e) => {
//     e.preventDefault();
//     try {
//       localStorage.removeItem('token');
//       setAuth(false);
//       toast.success('Logout successfully');
//       navigate('/login');
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className="header">
//       <h2>The Drone Destination Ltd.</h2>
//       <Space size="middle">
//         <ProfileBadge />
//         <button onClick={(e) => logout(e)} className="btn btn-primary">
//           Logout
//         </button>
//       </Space>
//     </div>
//   );
// };

// export default Header;
