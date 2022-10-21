import Page, { PrivateType } from 'components/Page';
import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from 'redux/sagas/companies/actions';
import { getCompanies } from 'redux/stores/companies';

const Companies = () => {
	const dispatch = useDispatch();
	const companies = useSelector(getCompanies);

	const handleFetchCompanies = useCallback(() => {
		dispatch(fetchCompanies());
	}, []);

	return (
		<Page privateType={PrivateType.PRIVATE} title="Companies">
			<Button onClick={handleFetchCompanies}>Fetch Companies</Button>

			<p>{companies && companies.join(`, `)}</p>
		</Page>
	);
};

export default Companies;
