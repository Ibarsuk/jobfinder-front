import Page, { PrivateType } from 'components/Page';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidate, fetchCandidates } from 'redux/sagas/candidates/actions';
import { getCandidates, getCurrentCandidate } from 'redux/stores/candidates';
import styles from '../styles/Home.module.css';

const Candidates = () => {
	const dispatch = useDispatch();
	const currentCandidate = useSelector(getCurrentCandidate);
	const candidates = useSelector(getCandidates);

	return (
		<Page privateType={PrivateType.PRIVATE} title="Соискатели">
			<button onClick={() => dispatch(fetchCandidate(0))}>Fetch candidate 0</button>
			<button onClick={() => dispatch(fetchCandidates())}>Fetch candidates</button>

			<p>{currentCandidate && currentCandidate.id}</p>

			<p>{candidates && candidates.map(candidate => candidate.id).join(`, `)}</p>

			<Link href={'/check'}>----</Link>
		</Page>
	);
};

export default Candidates;
