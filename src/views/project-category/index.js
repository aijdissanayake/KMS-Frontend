import React, { useState, useEffect } from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { projectCategoryColumnsData } from './components/variables/columnsData';
import ProjectCategoryTable from "./components/ProjectCategoryTable";
import {AddIcon} from "@chakra-ui/icons";
import ProjectCategoryModal from "./components/ProjectCategoryModal";

export default function ProjectCategory() {
    const [ projectCategory, setProjectCategory] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentProjectCat, setCurrentProjectCat] = useState();
    const [currentAction, setCurrentAction] = useState('create');

    useEffect(() => {
        fetch('https://kms-backend.azurewebsites.net/api/project-category')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProjectCategory(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [setProjectCategory]);

    return (
        <div style={{ marginTop: 80 }}>
            <IconButton
                onClick={onOpen}
                aria-label='Add to friends' icon={<AddIcon />}
                style={{ marginBottom: 20, marginRight: 20, float: 'right', padding: 30 }}
            />
            <ProjectCategoryTable columnsData={projectCategoryColumnsData} tableData={projectCategory} setCurrent={setCurrentProjectCat} setCurrentAction={setCurrentAction} />
            <ProjectCategoryModal action={currentAction} isOpen={isOpen} onClose={onClose} setProjectData={setProjectCategory} currentRecord={currentProjectCat}/>
        </div>
    );
}
