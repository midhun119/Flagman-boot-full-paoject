import { Button, Table } from 'antd';
import { Steps } from 'antd';
import "../Style/Installationtable.css";
import "../Style/Installation.css";
import { Component, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./Navbar";
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


const columns = [
    {
        title: 'Steps',
        dataIndex: 'steps',
        key: 'steps',
    },
    // {
    //     title: 'Install',

    //     key: 'install',
    //     render: (text: any, record: any) => (

    //         // <Button type="primary" onClick={() => onButtonClicked()} >

    //         //     Install
    //         // </Button>


    //     ),
    // },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',

    },


];



const InstallationStatus = () => {
    const [steps, setSteps] = useState<Installationstep[]>([])
    const { sendMessage, lastJsonMessage, readyState } = useWebSocket<SocketResponse>('ws://localhost:8000');
    useEffect(() => {
        fetchData()
    }, [])
    // useEffect(() => {
    //     console.log(lastJsonMessage);
    //     const updateData = steps.map(x => (x.id === lastJsonMessage.data.installID ? { ...x, status: lastJsonMessage.data.status } : x));
    //     setSteps(updateData);
    // }, [lastJsonMessage])
    useEffect(() => {
        if (lastJsonMessage) {
          const { type, data } = lastJsonMessage;
          switch (type) {
            case 'installAll': {
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
      }, [lastJsonMessage]);

    const fetchData = async () => {
        const response = await fetch(' http://localhost:8000/api/steps');
        const stepswithoutstatus: Pick<Installationstep, 'id' | 'steps'>[] = await response.json();

        const stepswithstatus: Installationstep[] = stepswithoutstatus.map(
            (item) => {
                return { ...item, status: 'pending' }
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
    const onclickall = () => {
        const payload = {
            "type": "installAll"
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
                    {/* <h2>{connectionStatus}</h2> */}
                    <Button  className="buttoninstall" onClick={onclickall}>Install All</Button>
                    <br>
                    </br>
                    <Table  dataSource={steps} columns={columns}  rowKey={(record) => record.id}/>;
                </form>
            </div>
        </div>

    );
}

export default InstallationStatus;
