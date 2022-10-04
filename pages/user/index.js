import Page, { PrivateType } from 'components/Page';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getUser } from 'redux/stores/user';

const User = () => {
	const user = useSelector(getUser);

	return (
		<Page privateType={PrivateType.PRIVATE} title={`${user.firstName} ${user.lastName}}`}>
			<Link href={'/check'}>----</Link>
		</Page>
	);
};

export default User;
