import Page, { PrivateType } from 'components/Page';

import { Alert, Button, Container, Form, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { RequestStatus } from 'utils/const';
import { auth } from 'redux/sagas/user/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Requests from 'redux/stores/requests/Requests';
import useRequest from 'hooks/useRequest';

const formInitialData = { email: `mytester237@mail.com`, password: '!!11QQwas' };

const authSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const Auth = () => {
	const dispath = useDispatch();
	const router = useRouter();
	const authRequest = useRequest(Requests.auth);

	const formik = useFormik({
		initialValues: formInitialData,
		validationSchema: authSchema,
		validateOnChange: false,
		onSubmit: values => {
			dispath(auth(values));
		},
	});

	useEffect(() => {
		if (authRequest.status !== RequestStatus.LOADING) {
			formik.setSubmitting(false);
		}
	}, [authRequest]);

	useEffect(() => {
		if (router.query.email) {
			formik.setFieldValue(`email`, router.query.email);
		}
	}, [router.query]);

	return (
		<Page title="Авторизация" privateType={PrivateType.PRIVATE_AUTH}>
			<Container fluid="md">
				<Col md={6}>
					<h1>Авторизация</h1>

					{authRequest.status === RequestStatus.FAILED && (
						<Alert variant="danger" className="mt-3">
							{authRequest.error}
						</Alert>
					)}

					<Form onSubmit={formik.handleSubmit}>
						<fieldset disabled={formik.isValidating || formik.isSubmitting}>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="text"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									isInvalid={formik.errors.email}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									isInvalid={formik.errors.password}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
							</Form.Group>
						</fieldset>
						<Button type="submit" className="mt-3">
							Submit
						</Button>
					</Form>
				</Col>
			</Container>
		</Page>
	);
};

export default Auth;
