import {
    Flex, IconButton,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue, useDisclosure,
} from "@chakra-ui/react";
import React, {useMemo, useState} from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Card from "components/card/Card";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import ProjectModal from "../ProjectModal";
export default function ColumnsTable(props) {
    const { columnsData, tableData, setCurrent, setCurrentAction } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState(null);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 5;


    const handleRowClick = (row) => {
        setSelectedRow(row.original);
        setCurrent(row.original);
        setCurrentAction('edit');
    };

    const onDelete = (row) => {
        const url = `https://kms-backend.azurewebsites.net/api/project/${row.id}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr
                                {...row.getRowProps()}
                                key={index}
                                onClick={() => handleRowClick(row)}
                                cursor="pointer"
                            >
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "ID") {
                                        data = (
                                            <Flex align='center'>
                                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "STATUS") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value === true ? "Active" : "In-Active"}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Action") {
                                        data = (
                                            <>
                                                <IconButton
                                                    aria-label="Edit"
                                                    icon={<EditIcon />}
                                                    onClick={onOpen}
                                                />
                                                <IconButton
                                                    aria-label="Delete"
                                                    icon={<DeleteIcon />}
                                                    onClick={() => { onDelete(row.original) }}
                                                />
                                            </>
                                        );
                                    } else{
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            {isOpen && selectedRow && (
                <ProjectModal action={'edit'} isOpen={isOpen} onClose={onClose} row={selectedRow} />
            )}
        </Card>
    );
}
