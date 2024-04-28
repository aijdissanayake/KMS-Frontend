import React, { useState, useEffect } from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { projectColumnsData } from './components/variables/columnsData';
import ProjectTable from "./components/ProjectTable";
import {AddIcon} from "@chakra-ui/icons";
import ProjectModal from "./components/ProjectModal";

export default function Project() {
    const [projects, setProject] = useState([]);
    const [currentProject, setCurrentProject] = useState();
    const [currentAction, setCurrentAction] = useState('create');
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        fetch('https://kms-backend.azurewebsites.net/api/project')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProject(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [setProject]);

    return (
        <div style={{ marginTop: 80 }}>
            <IconButton
                onClick={onOpen}
                aria-label='Add to friends' icon={<AddIcon />}
                style={{ marginBottom: 20, marginRight: 20, float: 'right', padding: 30 }}
            />
            <ProjectTable columnsData={projectColumnsData} tableData={projects} setCurrent={setCurrentProject} setCurrentAction={setCurrentAction}/>
            <ProjectModal action={currentAction} isOpen={isOpen} onClose={onClose} setClientData={setProject} currentRecord={currentProject} />
        </div>
    );
}
