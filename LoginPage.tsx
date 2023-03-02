
import { Button, Table } from 'antd';
import { Steps } from 'antd';
import "../Style/Installation.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface DataSource {
  ip: string,
  hostname: string,
  status: string
}
interface Credentials {
  ip: string;
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [datasource, setDataSource] = React.useState<DataSource[]>([])
  const [value, setValue] = React.useState<string>("");
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const [credentials, setCredentials] = useState<Credentials>({
    ip: "",
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = credentials;
    const hardcodedUsername = "admin";
    const hardcodedPassword = "admin@123";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      navigate("/Services");
    } else {
      alert("Please check the login the credentials");
    }
  };
const [data, setData] = useState<any[]>([]);
 const fetchData = async () => {
  const response = await fetch('http://localhost:8000/api/flagmanip');
  const users = await response.json();
  setData(users);
 };


 

  const columns = [
    {
      title: 'ip',
      dataIndex: 'ip',
      key: 'ip',

    },
    {
      title: 'hostname',
      dataIndex: 'hostname',
      key: 'hostname',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',

      render: (text: any, record: any) => (

        <Button className="buttonoption" onClick={() => setValue(record.ip)} >

          Select
        </Button>

      ),
    },
  ];

  return (

    <div className="two-column-layout">
      <div className='left'>
        <br>
        </br>
        <br></br>
        <Button className="buttonlist" onClick={fetchData}>
   	  List Ip
  	  </Button>
      <br></br>
      <br></br>
   	  <Table dataSource={data} columns={columns}  rowKey={(record) => record.id} />


      </div>

      <div className='right'>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <form className="for" onSubmit={handleSubmit}>
          <h1>Installation</h1>

          <label>System  Ip   :

            <input className="input" type="text" value={value} placeholder="Enter the System  Ip"  pattern="((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$" onChange={onChangeValue} required />
          </label>
          <br></br>
          <label >UserName :

            <input className="input" type="text" name="username" placeholder="Enter the User Name" value={credentials.username}
              onChange={handleChange} />
          </label>
          <br></br>
          <label >Password  :

            <input className="input" type="password" name="password" placeholder="Enter the Password " required value={credentials.password}
              onChange={handleChange} />
          </label>
          <br></br>
          <button className="buttonsub">Submit</button>
        </form>
      </div>

    </div>
  );
}


export default LoginPage;