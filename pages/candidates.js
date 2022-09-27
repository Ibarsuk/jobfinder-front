import Page, { PrivateType } from 'components/Page';
import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidates } from 'redux/sagas/candidates/actions';
import { getCandidates, getCurrentCandidate } from 'redux/stores/candidates';
import styles from '../styles/Home.module.css';

const Candidates = () => {
	const dispatch = useDispatch();
	const currentCandidate = useSelector(getCurrentCandidate);
	const candidates = useSelector(getCandidates);

	const handleFetchCandidates = useCallback(() => {
		dispatch(fetchCandidates());
	}, []);

	return (
		<Page privateType={PrivateType.PRIVATE} title="Соискатели">
			<Button onClick={handleFetchCandidates}>Fetch Candidates</Button>

			<p>{currentCandidate && currentCandidate.id}</p>

			<p>{candidates && candidates.join(`, `)}</p>
		</Page>
	);
};

export default Candidates;