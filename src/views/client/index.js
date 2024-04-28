import React, { useState, useEffect } from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { clientColumnsData } from './components/variables/columnsData';
import ClientTable from "./components/ClientTable";
import { AddIcon } from "@chakra-ui/icons";
import ClientModal from "./components/ClientModal";

export default function Client() {

    const [client, setClient] = useState([]);
    const [currentClient, setCurrentClient] = useState();
    const [currentAction, setCurrentAction] = useState('create');

    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        fetch('https://kms-backend.azurewebsites.net/api/client')
            .then((response) => response.json())
            .then((data) => {
                setClient(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [setClient]);

    return (
        <div style={{ marginTop: 80 }}>
            <IconButton
                onClick={onOpen}
                aria-label='Add to friends' icon={<AddIcon />}
                style={{ marginBottom: 20, marginRight: 20, float: 'right', padding: 30 }}
            />
            <ClientTable columnsData={clientColumnsData} tableData={client} setCurrent={setCurrentClient} setCurrentAction={setCurrentAction} />
            <ClientModal action={currentAction} isOpen={isOpen} onClose={onClose} setClientData={setClient} currentRecord={currentClient} />
        </div>
    );
}
