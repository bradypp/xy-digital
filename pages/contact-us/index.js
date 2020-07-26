import { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import * as Yup from 'yup';
import axios from 'axios';

import { getContactData } from 'api/prismic/contact';
import { Layout, Map } from 'components';
import { Form } from 'components/form';

export async function getStaticProps({ preview = false, previewData }) {
    const data = await getContactData(previewData);

    return {
        props: {
            preview,
            contactData: data?.allContact_uss.edges[0].node,
        },
    };
}
const ContactUs = ({ contactData }) => {
    const [submitText, setSubmitText] = useState('Send Message');
    const { title, text, address, phone, email, location_coordinates } = contactData;
    const titleText = RichText.asText(title);
    const content = RichText.asText(text);

    const validation = Yup.object().shape({
        first_name: Yup.string().trim().required('Please enter your first name'),
        last_name: Yup.string().trim().required('Please enter your last name'),
        email: Yup.string()
            .trim()
            .email('Please enter a valid email address')
            .required('Please enter your email address')
            .lowercase(),
        message: Yup.string().trim().required('Please enter your message'),
    });
    return (
        <Layout isHeaderDown>
            <Head>
                <title>Contact Us</title>
                <link rel="canonical" href="/contact-us" />
            </Head>
            <div className="container-inner grid grid-cols-2 grid-rows-2 gap-16">
                <section className="col-start-1 col-end-2 row-start-1 row-end-3">
                    <h1 className="title mb-6 font-tertiary text-4xl">{titleText}</h1>
                    <p className="font-secondary mb-6 text-grey-cool-800">{content}</p>
                    <Form
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            email: '',
                            company: '',
                            phone: '',
                            subject: '',
                            message: '',
                        }}
                        validationSchema={validation}
                        onSubmit={async (values, form) => {
                            try {
                                form.setSubmitting(true);
                                await axios.post('/api/send-email', values);
                                form.setSubmitting(false);
                                setSubmitText('Message Sent!');
                                setTimeout(() => {
                                    setSubmitText('Send Message');
                                }, 3000);
                                form.resetForm();
                            } catch (err) {
                                setSubmitText('Message Unsuccessful');
                                setTimeout(() => {
                                    setSubmitText('Send Message');
                                }, 3000);
                            }
                        }}>
                        {({ isSubmitting }) => (
                            <>
                                <Form.Element>
                                    <div className="flex items-start justify-center">
                                        <Form.Field.Input
                                            className="mr-4"
                                            label="First Name"
                                            name="first_name"
                                        />
                                        <Form.Field.Input label="Last Name" name="last_name" />
                                    </div>
                                    <Form.Field.Input label="Email" name="email" />
                                    <Form.Field.Input label="Company" name="company" />
                                    <Form.Field.Input label="Phone" name="phone" />
                                    <Form.Field.Input label="Subject" name="subject" />
                                    <Form.Field.TextArea label="Message" name="message" />
                                    <Form.Buttons
                                        isSubmitting={isSubmitting}
                                        submitText={submitText}
                                    />
                                </Form.Element>
                            </>
                        )}
                    </Form>
                </section>
                <section className="mt-8">
                    <Map address={address} location_coordinates={location_coordinates} />
                </section>
                <section>
                    <h2 className="title mb-4 font-tertiary text-2xl">Contact Details</h2>
                    <h3 className="text-md font-tertiary font-semibold tracking-tight">Address</h3>
                    <p className="font-tertiary text-sm mb-4">{address}</p>
                    <h3 className="text-md font-tertiary font-semibold tracking-tight">Email</h3>
                    <p className="font-tertiary text-sm mb-4">{email}</p>
                    <h3 className="text-md font-tertiary font-semibold tracking-tight">Phone</h3>
                    <p className="font-tertiary text-sm mb-4">{phone}</p>
                </section>
            </div>
        </Layout>
    );
};

ContactUs.propTypes = {
    contactData: PropTypes.object.isRequired,
};

export default ContactUs;
