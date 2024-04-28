import React from 'react';
import {
    Button, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Textarea,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import './styles.css';

export default function ProjectCategoryModal(props) {

    const submitProjectCategory = (payload, projectCatId) => {
        console.log('payload');
        console.log(payload);
        if (props.action === 'create') {
            fetch('https://kms-backend.azurewebsites.net/api/project-category', {
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
                    props.onClose();
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            const url = `https://kms-backend.azurewebsites.net/api/project-category/${projectCatId}`;

            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    props.onClose();
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
                        <ModalHeader>UPDATE PROJECT CATEGORY</ModalHeader> :
                        <ModalHeader>CREATE NEW PROJECT CATEGORY</ModalHeader>
                }
                <ModalCloseButton />
                <ModalBody>
                    {
                    <Formik
                        initialValues={props}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                const body = {
                                    Name: values.Name !== undefined ? values.Name : values.row.Name,
                                    Description: values.Description !== undefined ? values.Description : values.row.Description
                                }
                                submitProjectCategory(body, values.row.id)
                                actions.setSubmitting(false)
                            }, 1000)
                        }}
                    >
                        {(props) => (
                            <Form style={{ paddingRight: 10, paddingLeft: 10 }}>
                                <Field name='Name'>
                                    {({ field, form }) => (
                                        field.value = field.value === undefined ? (props.values.row ? props.values.row.Name : '') : field.value,
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel>Project Category Name</FormLabel>
                                            <Input {...field} placeholder='Project Category Name' />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='Description'>
                                    {({ field, form }) => (
                                        field.value = field.value === undefined ? (props.values.row ? props.values.row.Description : '') : field.value,
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea {...field} />
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
}
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
