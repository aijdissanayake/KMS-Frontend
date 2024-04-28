import React from 'react';
import {
    Button, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import './styles.css';

export default function IndustryModal(props) {

    const createIndustry = (payload, industryId) => {
        console.log('payload');
        console.log(payload);
        if (props.action === 'create') {
            fetch('https://kms-backend.azurewebsites.net/api/industry', {
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
            const url = `https://kms-backend.azurewebsites.net/api/industry/${industryId}`;

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
                        <ModalHeader>UPDATE INDUSTRY</ModalHeader> :
                        <ModalHeader>CREATE NEW INDUSTRY</ModalHeader>
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
                                }
                                console.log(values);
                                const id = props.action === 'edit' ? values.row.id : null;
                                createIndustry(body, id)
                                actions.setSubmitting(false)
                            }, 1000)
                        }}
                    >
                        {(props) => (
                            <Form style={{ paddingRight: 10, paddingLeft: 10 }}>
                                <Field name='Name'>
                                    {({ field, form }) => (
                                        // eslint-disable-next-line no-sequences
                                        field.value = field.value === undefined ? (props.values.row ? props.values.row.Name : '') : field.value,
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel>Industry Name</FormLabel>
                                            <Input {...field} placeholder='Industry Name' />
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
