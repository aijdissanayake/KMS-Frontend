import React, { useEffect, useState } from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { employeeTypeColumnsData } from './components/variables/columnsData';
import EmployeeTypeTable from "./components/EmployeeTypeTable";
import {AddIcon} from "@chakra-ui/icons";
import EmployeeTypeModal from "./components/EmployeeTypeModal";

export default function EmployeeType() {
    const [employeeType, setEmployeeType] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        fetch('https://kms-backend.azurewebsites.net/api/employee-type')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEmployeeType(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div style={{ marginTop: 80 }}>
            <IconButton
                onClick={onOpen}
                aria-label='Add to friends' icon={<AddIcon />}
                style={{ marginBottom: 20, marginRight: 20, float: 'right', padding: 30 }}
            />
            <EmployeeTypeTable columnsData={employeeTypeColumnsData} tableData={employeeType} />
            <EmployeeTypeModal action={'create'} isOpen={isOpen} onClose={onClose} />
        </div>
    );
}
