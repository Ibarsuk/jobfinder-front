import Page, { PrivateType } from 'components/Page';

import { Alert, Button, Container, Form, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { MIN_ALLOWED_AGE, RequestStatus } from 'utils/const';
import { createUser } from 'redux/sagas/user/actions';
import { useEffect } from 'react';
import { getMinAllowedBirthDate } from 'utils/util';
import Requests from 'redux/stores/requests/Requests';
import useRequest from 'hooks/useRequest';

const createUserSchema = yup.object().shape({
	firstName: yup.string().min(3).max(100).required(),
	lastName: yup.string().min(3).max(100).required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
	birthDate: yup.date().max(getMinAllowedBirthDate(), `Your minimum age must be ${MIN_ALLOWED_AGE}`).required(),
});

const formInitialData = {
	firstName: `huo`,
	lastName: `duo`,
	email: `t@g.com`,
	password: `1!Motors`,
	birthDate: `2000-01-01`,
};

const UserCreation = () => {
	const dispath = useDispatch();

	const userCreationRequest = useRequest(Requests.createUser);

	const formik = useFormik({
		initialValues: formInitialData,
		validationSchema: createUserSchema,
		validateOnChange: false,
		onSubmit: values => {
			dispath(createUser(values));
		},
	});

	useEffect(() => {
		if (userCreationRequest.status !== RequestStatus.LOADING) {
			formik.setSubmitting(false);
		}
	}, [userCreationRequest]);

	return (
		<Page title="Registration" privateType={PrivateType.PRIVATE_AUTH}>
			<Container fluid="md">
				<Col md={6}>
					<h1>User Registration</h1>

					{userCreationRequest.status === RequestStatus.FAILED && (
						<Alert variant="danger" className="mt-3">
							{userCreationRequest.error}
						</Alert>
					)}

					<Form onSubmit={formik.handleSubmit}>
						<fieldset disabled={formik.isValidating || formik.isSubmitting}>
							<Form.Group>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type="text"
									name="firstName"
									value={formik.values.firstName}
									onChange={formik.handleChange}
									isInvalid={formik.errors.firstName}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type="text"
									name="lastName"
									value={formik.values.lastName}
									onChange={formik.handleChange}
									isInvalid={formik.errors.lastName}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
							</Form.Group>

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

							<Form.Group>
								<Form.Label>Birth date</Form.Label>
								<Form.Control
									type="date"
									name="birthDate"
									value={formik.values.birthDate}
									onChange={formik.handleChange}
									isInvalid={formik.errors.birthDate}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.birthDate}</Form.Control.Feedback>
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

export default UserCreation;
