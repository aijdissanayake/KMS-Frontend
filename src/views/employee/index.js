import React, { useEffect } from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { employeeColumnsData } from './components/variables/columnsData';
import employeeData  from './components/variables/tableDataColumns.json';
import EmployeeTable from "./components/EmployeeTable";
import {AddIcon} from "@chakra-ui/icons";
import EmployeeModal from "./components/EmployeeModal";

export default function Employee() {
    // const [employee, setEmployee] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        fetch('https://kms-backend.azurewebsites.net/api/employee')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // setEmployee(data);
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
            <EmployeeTable columnsData={employeeColumnsData} tableData={employeeData} />
            <EmployeeModal action={'create'} isOpen={isOpen} onClose={onClose} />
        </div>
    );
}
