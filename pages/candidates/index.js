import Page, { PrivateType } from 'components/Page';
import { useCallback, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCandidates, fetchCandidates, getCandidatesInfo } from 'redux/sagas/candidates/actions';
import {
	getCandidates,
	getCurrentCandidate,
	getCurrentCandidateInfo,
	getCurrentRequestCandidate,
	getIfCandidatesInitialized,
	getRunningRequestsNumber,
} from 'redux/stores/candidates';

const Candidates = () => {
	const dispatch = useDispatch();

	const candidates = useSelector(getCandidates);
	const currentCandidate = useSelector(getCurrentCandidate);
	const currentRequestCandidate = useSelector(getCurrentRequestCandidate);
	const currentCandidateInfo = useSelector(getCurrentCandidateInfo);
	const isStoreInitialized = useSelector(getIfCandidatesInitialized);
	const runningRequestsNumber = useSelector(getRunningRequestsNumber);

	const handleFetchCandidates = useCallback(() => {
		dispatch(fetchCandidates());
	}, []);

	useEffect(() => {
		if (isStoreInitialized && !candidates.length) {
			dispatch(addCandidates());
		}
	}, [isStoreInitialized, candidates]);

	useEffect(() => {
		if (isStoreInitialized && candidates.length) {
			dispatch(getCandidatesInfo());
		}
	}, []);

	if (!isStoreInitialized) {
		return null;
	}

	return (
		<Page privateType={PrivateType.PRIVATE} title="Candidates">
			<Button onClick={handleFetchCandidates}>Fetch Candidates</Button>

			<Row>
				<Col>
					<Button>&larr;</Button>
				</Col>

				<Col>{currentCandidateInfo && <p>{currentCandidateInfo.id}</p>}</Col>

				<Col>
					<Button>&rarr;</Button>
				</Col>
			</Row>
			<p>{currentCandidate && currentCandidate.id}</p>

			<p>{candidates && candidates.join(`, `)}</p>
		</Page>
	);
};

export default Candidates;
