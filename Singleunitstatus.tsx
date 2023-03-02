import { Button, Table } from 'antd';
import { Steps } from 'antd';

import { Component, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import React from 'react';
import { type } from 'os';
interface Installationstep {
    id: number,
    steps: string,
    status: string

}
type SocketResponse = {
    type: string;
    data: {
        installID: number;
        status: string;
    };
};
const Singleunitstatus = () =>{
const columns = [
    {
        title: 'Steps',
        dataIndex: 'steps',
        key: 'steps',
    },
     {
        title: 'Install',

        key: 'install',
      render: (text: any, record: any) => (

  <Button  className="buttonsingle" type="primary" id={record.id} onClick={onclickunit} >

        Install
    </Button>

    ),
      },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',

    },
    


];

    const [steps, setSteps] = useState<Installationstep[]>([])
    const { sendMessage, lastJsonMessage, readyState } = useWebSocket<SocketResponse>('ws://localhost:8000');
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        console.log(lastJsonMessage);
        if (lastJsonMessage) {
            const { type, data } = lastJsonMessage;
            switch (type) {
              case 'installDep': {
                const updatedSteps = steps.map((step) => {
                  if (step.id === data.installID) {
                    step.status = data.status;
                  }
                  return step;
                });
                setSteps(updatedSteps);
                break;
              }
      
              default:
            }
          }
    }, [lastJsonMessage])
    const fetchData = async () => {
        const response = await fetch(' http://localhost:8000/api/steps');
        const stepswithoutstatus: Pick<Installationstep, 'id' | 'steps'>[] = await response.json();
        const stepswithstatus: Installationstep[] = stepswithoutstatus.map(
            (item) => {
                return { ...item,status:"" }
            }
        )
        setSteps(stepswithstatus);
    };
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    const onclickunit = (event:React.MouseEvent<HTMLButtonElement>&React.MouseEvent<HTMLAnchorElement>) => {
        console.log(event.currentTarget.id)
        const payload = {
            
            "type" : "installDep",
            "id": event.currentTarget.id
        }
        if (readyState === ReadyState.OPEN) {
            sendMessage(JSON.stringify(payload))
        }
    }
    return (
        <div>
             <Navbar />

            <div className="face">

                <form className="ones">


                    <h2> Installation Status</h2>
                     
                    
                    <Table dataSource={steps} columns={columns}  rowKey={(record) => record.id} />;
                </form>
            </div>
        </div>

    );
}
export default Singleunitstatus;