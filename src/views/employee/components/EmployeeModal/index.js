import React from 'react';
import {
    Button, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import './styles.css';

export default function EmployeeModal(props) {

    const submitEmployee = (payload) => {
        console.log('payload');
        console.log(payload);
        if (props.action === 'create') {
            fetch('https://kms-backend.azurewebsites.net/api/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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
        } else {
            const url = `https://kms-backend.azurewebsites.net/api/employee?id=${payload.id}`;

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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
    }

    console.log('--props----');
    console.log(props);

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                {
                    props.action === 'edit' ?
                        <ModalHeader>UPDATE EMPLOYEE</ModalHeader> :
                        <ModalHeader>CREATE NEW EMPLOYEE</ModalHeader>
                }
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={{
                            firstName: props.row? props.row.firstName : '',
                            lastName: props.row? props.row.lastName : '',
                            gender: props.row? props.row.gender : '',
                            employeeType: props.row? props.row.employeeType : '',
                            project: props.row? props.row.project : '',
                            email: props.row? props.row.email : '',
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                submitEmployee(values)
                                actions.setSubmitting(false)
                            }, 1000)
                        }}
                    >
                        {(props) => (
                            <Form style={{ paddingRight: 10, paddingLeft: 10 }}>
                                <Field name='firstName'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                            <FormLabel>First name</FormLabel>
                                            <Input {...field} placeholder='First Name' />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='lastName'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                            <FormLabel>Last name</FormLabel>
                                            <Input {...field} placeholder='Last Name' />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='gender'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.gender && form.touched.gender}>
                                            <FormLabel>Gender</FormLabel>
                                            <Select value={props.row ? props.row.gender : ''} placeholder='Select gender'>
                                                <option value='Male'>Male</option>
                                                <option value='Female'>Female</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='employeeType'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.employeeType && form.touched.employeeType}>
                                            <FormLabel>Employee Type</FormLabel>
                                            <Select placeholder='Select employee type'>
                                                <option>Employee Type 1</option>
                                                <option>Employee Type 2</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='project'>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.project && form.touched.project}>
                                            <FormLabel>Project</FormLabel>
                                            <Select placeholder='Select a project'>
                                                <option>Project 1</option>
                                                <option>Project 2</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                    style={{
                                        marginTop: 30,
                                        float: 'right',
                                        background: '#272776',
                                        color: 'white',
                                    }}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
