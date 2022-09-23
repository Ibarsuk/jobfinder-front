import Page, { PrivateType } from 'components/Page';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getUser } from 'redux/stores/user';
import styles from '../styles/Home.module.css';

const User = () => {
	const user = useSelector(getUser);

	return (
		<Page privateType={PrivateType.PRIVATE} title={`${user.firstName} ${user.lastName}}`}>
			<p className={styles.description}>
				{user.firstName} by editing <code className={styles.code}>pages/index.js</code>
			</p>

			<Link href={'/check'}>----</Link>
		</Page>
	);
};

export default User;
