import Page, { PrivateType } from 'components/Page';
import useRequest from 'hooks/useRequest';
import Link from 'next/link';
import { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'redux/sagas/user/actions';
import Requests from 'redux/stores/requests/Requests';
import { getUser } from 'redux/stores/user';
import { RequestStatus } from 'utils/const';
import routes from 'utils/routes';

const User = () => {
	const dispacth = useDispatch();
	const userRequest = useRequest(Requests.getUser);
	const user = useSelector(getUser);

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
					{user.candidate && (
						<Link href={routes.candidates.index}>
							<Col>
								<p>{user.candidate.position}</p>
								<p>{user.candidate.experience}</p>
							</Col>
						</Link>
					)}
					{user.company && (
						<Link href={routes.companies.index}>
							<Col>
								<p>{user.company.position}</p>
								<p>{user.company.minExperience}</p>
							</Col>
						</Link>
					)}
				</Row>
			) : (
				<Spinner variant="info" animation="border" />
			)}
		</Page>
	);
};

export default User;
