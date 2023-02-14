import Page, { PrivateType } from 'components/Page';
import useRequest from 'hooks/useRequest';
import { useCallback, useEffect, useRef } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCandidates, fetchCandidates, getCandidatesInfoOnLoad, setNextCandidate } from 'redux/sagas/candidates/actions';
import {
	getCandidates,
	getCurrentCandidate,
	getCurrentCandidateInfo,
	getIfBackStepAllowed,
	getIfCandidatesInitialized,
	getIfNextStepAllowed,
	setPrevCandidate,
} from 'redux/stores/candidates';
import Requests from 'redux/stores/requests/Requests';
import { RequestStatus } from 'utils/const';

const Candidates = () => {
	const dispatch = useDispatch();
	const isInfoLoaded = useRef(false);

	const candidates = useSelector(getCandidates);
	const currentCandidate = useSelector(getCurrentCandidate);
	const currentCandidateInfo = useSelector(getCurrentCandidateInfo);
	const isStoreInitialized = useSelector(getIfCandidatesInitialized);
	const isNextStepAllowed = useSelector(getIfNextStepAllowed);
	const isBackStepAllowed = useSelector(getIfBackStepAllowed);

	const getInfoOnLoadRequest = useRequest(Requests.getCandidatesInfoOnLoad);

	useEffect(() => {
		if (isStoreInitialized && !candidates.length) {
			dispatch(addCandidates());
		}
	}, [isStoreInitialized, candidates]);

	useEffect(() => {
		if (!isInfoLoaded.current && isStoreInitialized && candidates.length) {
			dispatch(getCandidatesInfoOnLoad());
			isInfoLoaded.current = true;
		}
	}, [isStoreInitialized, candidates]);

	const handleFetchCandidates = useCallback(() => {
		dispatch(fetchCandidates());
	}, []);

	const handleNextCandidateButtonClick = useCallback(() => {
		dispatch(setNextCandidate());
	}, []);

	const handlePrevCandidateButtonClick = useCallback(() => {
		dispatch(setPrevCandidate());
	}, []);

	if (!isStoreInitialized) {
		return null;
	}

	return (
		<Page privateType={PrivateType.PRIVATE} title="Candidates">
			<Button onClick={handleFetchCandidates}>Fetch Candidates</Button>
			{getInfoOnLoadRequest.status === RequestStatus.SUCCESS ? (
				<Row>
					<Col>{isBackStepAllowed && <Button onClick={handlePrevCandidateButtonClick}>&#60;-</Button>}</Col>

					<Col>{currentCandidateInfo && <p>{currentCandidateInfo.id}</p>}</Col>

					<Col>
						<Button onClick={handleNextCandidateButtonClick} disabled={!isNextStepAllowed}>
							{isNextStepAllowed ? `->` : <Spinner variant="info" animation="border" />}
						</Button>
					</Col>
				</Row>
			) : (
				<Spinner variant="info" animation="border" />
			)}

			<p>{currentCandidate && currentCandidate.id}</p>

			<p>{candidates && candidates.join(`, `)}</p>
		</Page>
	);
};

export default Candidates;
