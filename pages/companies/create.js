import Page, { PrivateType } from 'components/Page';

import { Alert, Button, Container, Form, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { RequestStatus } from 'utils/const';
import { useCallback, useEffect, useState } from 'react';
import Requests from 'redux/stores/requests/Requests';
import useRequest from 'hooks/useRequest';
import Image from 'next/image';
import { createCompany } from 'redux/sagas/companies/actions';

const schema = yup.object().shape({
	minExperience: yup.number().integer().min(0).max(100).required(),
	position: yup.string().max(100).required(),
	city: yup.string().max(100),
	website: yup.string().url(),
	text: yup.string().max(2000),
});

const formInitialData = {
	minExperience: `1`,
	position: `Position`,
	city: `Omsk`,
	website: `https://github.com/Ibarsuk`,
	text: `Text`,
	photo: ``,
};

const CandidateCreation = () => {
	const dispath = useDispatch();
	const [photoPreview, setPhotoPreview] = useState(null);

	const companyCreationRequest = useRequest(Requests.createCompany);

	const formik = useFormik({
		initialValues: formInitialData,
		validationSchema: schema,
		validateOnChange: false,
		onSubmit: values => {
			dispath(createCompany(values));
		},
	});

	useEffect(() => {
		if (formik.values.photo) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setPhotoPreview(reader.result);
			};

			reader.readAsDataURL(formik.values.photo);
		}
	}, [formik.values.photo]);

	const handlePhotoFieldChange = useCallback(event => {
		formik.setFieldValue(`photo`, event.currentTarget.files[0]);
	}, []);

	useEffect(() => {
		if (companyCreationRequest.status !== RequestStatus.LOADING) {
			formik.setSubmitting(false);
		}
	}, [companyCreationRequest]);

	return (
		<Page title="Company form" privateType={PrivateType.PRIVATE}>
			<Container fluid="md">
				<Col md={6}>
					<h1>Company creation form</h1>

					{companyCreationRequest.status === RequestStatus.FAILED && (
						<Alert variant="danger" className="mt-3">
							{companyCreationRequest.error}
						</Alert>
					)}

					<Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
						<fieldset disabled={formik.isValidating || formik.isSubmitting}>
							<Form.Group>
								<Form.Label>Minimum experience in years</Form.Label>
								<Form.Control
									type="number"
									name="minExperience"
									value={formik.values.minExperience}
									onChange={formik.handleChange}
									isInvalid={formik.errors.minExperience}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.minExperience}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Position</Form.Label>
								<Form.Control
									type="text"
									name="position"
									value={formik.values.position}
									onChange={formik.handleChange}
									isInvalid={formik.errors.position}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.position}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>City</Form.Label>
								<Form.Control
									type="text"
									name="city"
									value={formik.values.city}
									onChange={formik.handleChange}
									isInvalid={formik.errors.city}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Company website</Form.Label>
								<Form.Control
									type="text"
									name="website"
									value={formik.values.website}
									onChange={formik.handleChange}
									isInvalid={formik.errors.website}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.website}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Text about company</Form.Label>
								<Form.Control
									type="text"
									name="text"
									value={formik.values.text}
									onChange={formik.handleChange}
									isInvalid={formik.errors.text}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.text}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Photo</Form.Label>
								<Form.Control
									type="file"
									name="photo"
									onChange={handlePhotoFieldChange}
									isInvalid={formik.errors.photo}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.photo}</Form.Control.Feedback>
							</Form.Group>
						</fieldset>
						{photoPreview && <Image src={photoPreview} alt="Chosen photo" width="200" height="200" />}
						<Button type="submit" className="mt-3">
							Submit
						</Button>
					</Form>
				</Col>
			</Container>
		</Page>
	);
};

export default CandidateCreation;
