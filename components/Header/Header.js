import { useCallback } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getUser } from 'redux/stores/user';
import { logout } from 'redux/sagas/user/actions';
import Link from 'next/link';
import routes from 'utils/routes';

const Header = () => {
	const dispath = useDispatch();
	const token = useSelector(getAccessToken);
	const user = useSelector(getUser);

	const handleLogout = useCallback(() => {
		dispath(logout());
	}, []);

	return (
		<Navbar>
			<Container>
				{token && <Navbar.Text>User id: {user.id}</Navbar.Text>}
				<Nav fill>
					<Nav.Item>
						<Link href={routes.home}>Home</Link>
					</Nav.Item>

					{!token && (
						<Nav.Item>
							<Link href={routes.auth.index}>Auth</Link>
						</Nav.Item>
					)}

					{token && (
						<>
							<Nav.Item>
								<Button onClick={handleLogout}>Logout</Button>
							</Nav.Item>
							<Nav.Item>
								<Link href={routes.user.index}>User</Link>
							</Nav.Item>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
