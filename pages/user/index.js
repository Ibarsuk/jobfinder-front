import Page, { PrivateType } from 'components/Page';
import useRequest from 'hooks/useRequest';
import Link from 'next/link';
import { useCallback, useEffect, useMemo } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCandidateActive } from 'redux/sagas/candidates/actions';
import { setCompanyActive } from 'redux/sagas/companies/actions';
import { fetchUser } from 'redux/sagas/user/actions';
import Requests from 'redux/stores/requests/Requests';
import { getUser } from 'redux/stores/user';
import { RequestStatus } from 'utils/const';
import routes from 'utils/routes';

const User = () => {
	const dispacth = useDispatch();

	const userRequest = useRequest(Requests.getUser);
	const setCandidateActiveRequest = useRequest(Requests.setCandidateFormActive);
	const setCompanyActiveRequest = useRequest(Requests.setCompanyFormActive);

	const user = useSelector(getUser);

	const setCandidateActiveRequestRunning = useMemo(
		() => setCandidateActiveRequest.status === RequestStatus.LOADING,
		[setCandidateActiveRequest]
	);
	const setCompanyActiveRequestRunning = useMemo(
		() => setCompanyActiveRequest.status === RequestStatus.LOADING,
		[setCompanyActiveRequest]
	);

	const candidatesLinkDisabled = useMemo(
		() => user.candidate && (!user.candidate.active || setCandidateActiveRequestRunning),
		[user]
	);
	const companiesLinkDisabled = useMemo(() => user.company && (!user.company.active || setCompanyActiveRequestRunning), [user]);

	const onCandidateSetActiveButtonClick = useCallback(() => dispacth(setCandidateActive(!user.candidate.active)), [user]);
	const onCompanySetActiveButtonClick = useCallback(() => dispacth(setCompanyActive(!user.company.active)), [user]);

	useEffect(() => {
		dispacth(fetchUser());
	}, []);

	return (
		<Page privateType={PrivateType.PRIVATE} title={user.firstName ? `${user.firstName} ${user.lastName}` : `User page`}>
			<h1>
				{user.firstName} {user.lastName}
			</h1>

			{userRequest.status === RequestStatus.SUCCESS ? (
				<Row>
					{user.candidate ? (
						<Col>
							<Link
								href={candidatesLinkDisabled ? `` : routes.candidates.index}
								aria-disabled={candidatesLinkDisabled}
								tabIndex={candidatesLinkDisabled ? -1 : undefined}
							>
								<div>
									<p>{user.candidate.position}</p>
									<p>{user.candidate.experience}</p>
								</div>
							</Link>
							<Button onClick={onCandidateSetActiveButtonClick} disabled={setCandidateActiveRequestRunning}>
								{setCandidateActiveRequestRunning ? (
									<Spinner variant="info" animation="border" />
								) : (
									`Make ${user.candidate.active ? `inactive` : `active`}`
								)}
							</Button>
						</Col>
					) : (
						<Col>
							<Link href={routes.candidates.create}>Create candidate form</Link>
						</Col>
					)}
					{user.company ? (
						<Col>
							<Link
								href={companiesLinkDisabled ? `` : routes.companies.index}
								aria-disabled={companiesLinkDisabled}
								tabIndex={companiesLinkDisabled ? -1 : undefined}
							>
								<>
									<p>{user.company.position}</p>
									<p>{user.company.minExperience}</p>
								</>
							</Link>
							<Button onClick={onCompanySetActiveButtonClick} disabled={setCompanyActiveRequestRunning}>
								{setCompanyActiveRequestRunning ? (
									<Spinner variant="info" animation="border" />
								) : (
									`Make ${user.company.active ? `inactive` : `active`}`
								)}
							</Button>
						</Col>
					) : (
						<Col>
							<Link href={routes.companies.create}>Create company form</Link>
						</Col>
					)}
				</Row>
			) : (
				<Spinner variant="info" animation="border" />
			)}
		</Page>
	);
};

export default User;
