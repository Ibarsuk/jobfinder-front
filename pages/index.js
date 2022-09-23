import Page from 'components/Page';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidate, fetchCandidates } from 'redux/sagas/candidates/actions';
import { getCandidates, getCurrentCandidate } from 'redux/stores/candidates';
import { addToken } from 'redux/stores/user';
import styles from '../styles/Home.module.css';

export default function Home() {
	const dispatch = useDispatch();
	const currentCandidate = useSelector(getCurrentCandidate);
	const candidates = useSelector(getCandidates);

	return (
		<Page>
			<button onClick={() => dispatch(fetchCandidate(0))}>Fetch candidate 0</button>
			<button onClick={() => dispatch(fetchCandidates())}>Fetch candidates</button>

			<p className={styles.description}>
				Get started by editing <code className={styles.code}>pages/index.js</code>
			</p>

			<p>{currentCandidate && currentCandidate.id}</p>

			<p>{candidates && candidates.map(candidate => candidate.id).join(`, `)}</p>

			<button onClick={() => dispatch(addToken('12345'))}>+++</button>
			<Link href={'/check'}>----</Link>
		</Page>
	);
}
