import Page, { PrivateType } from 'components/Page';

import { Alert, Button, Container, Form, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { RequestStatus } from 'utils/const';
import { useCallback, useEffect, useState } from 'react';
import Requests from 'redux/stores/requests/Requests';
import useRequest from 'hooks/useRequest';
import { createCandidate } from 'redux/sagas/candidates/actions';
import Image from 'next/image';
import { getFormData } from 'utils/util';

const authSchema = yup.object().shape({
	experience: yup.number().integer().min(0).max(100).required(),
	position: yup.string().max(100).required(),
	city: yup.string().max(100),
	portfolio: yup.string().url(),
	text: yup.string().max(2000),
});

const formInitialData = {
	experience: `1`,
	position: `Position`,
	city: `Omsk`,
	portfolio: `https://github.com/Ibarsuk`,
	text: `Text`,
	photo: null,
};

const CandidateCreation = () => {
	const dispath = useDispatch();
	const [photoPreview, setPhotoPreview] = useState(null);

	const candidateCreationRequest = useRequest(Requests.createCandidate);

	const formik = useFormik({
		initialValues: formInitialData,
		validationSchema: authSchema,
		validateOnChange: false,
		onSubmit: values => {
			dispath(createCandidate(getFormData(values)));
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
		if (candidateCreationRequest.status !== RequestStatus.LOADING) {
			formik.setSubmitting(false);
		}
	}, [candidateCreationRequest]);

	return (
		<Page title="Candidate Form" privateType={PrivateType.PRIVATE}>
			<Container fluid="md">
				<Col md={6}>
					<h1>Создание анкеты соискателя</h1>

					{candidateCreationRequest.status === RequestStatus.FAILED && (
						<Alert variant="danger" className="mt-3">
							{candidateCreationRequest.error}
						</Alert>
					)}

					<Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
						<fieldset disabled={formik.isValidating || formik.isSubmitting}>
							<Form.Group>
								<Form.Label>Опыт в годах</Form.Label>
								<Form.Control
									type="number"
									name="experience"
									value={formik.values.experience}
									onChange={formik.handleChange}
									isInvalid={formik.errors.experience}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.experience}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Позиция</Form.Label>
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
								<Form.Label>Город</Form.Label>
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
								<Form.Label>Портфолио</Form.Label>
								<Form.Control
									type="text"
									name="portfolio"
									value={formik.values.portfolio}
									onChange={formik.handleChange}
									isInvalid={formik.errors.portfolio}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.portfolio}</Form.Control.Feedback>
							</Form.Group>

							<Form.Group>
								<Form.Label>Текст о себе</Form.Label>
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
								<Form.Label>Фото</Form.Label>
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
