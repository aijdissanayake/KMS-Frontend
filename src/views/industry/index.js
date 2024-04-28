import React, { useState, useEffect } from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { industryColumnsData } from './components/variables/columnsData';
import IndustryTable from "./components/IndustryTable";
import {AddIcon} from "@chakra-ui/icons";
import IndustryModal from "./components/IndustryModal";

export default function Industry() {

    const [industry, setIndustry] = useState([]);
    const [currentIndustry, setCurrentIndustry] = useState();
    const [, setCurrentAction] = useState('create');

    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        fetch('https://kms-backend.azurewebsites.net/api/industry')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIndustry(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [setIndustry]);

    return (
        <div style={{ marginTop: 80 }}>
            <IconButton
                onClick={onOpen}
                aria-label='Add to friends' icon={<AddIcon />}
                style={{ marginBottom: 20, marginRight: 20, float: 'right', padding: 30 }}
            />
            <IndustryTable columnsData={industryColumnsData} tableData={industry} setCurrent={setCurrentIndustry} setCurrentAction={setCurrentAction} />
            <IndustryModal action={'create'} isOpen={isOpen} onClose={onClose} setIndustry={setIndustry} currentRecord={currentIndustry}/>
        </div>
    );
}
