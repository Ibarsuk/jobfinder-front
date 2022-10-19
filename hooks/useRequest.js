import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest, resetRequest } from 'redux/stores/requests';
import { RequestStatus } from 'utils/const';

export default requestType => {
	const dispatch = useDispatch();
	const request = useSelector(getRequest(requestType));

	const ref = useRef();

	const reset = useCallback(() => {
		if (ref.current.status !== RequestStatus.IDLE) {
			dispatch(resetRequest(requestType));
		}
	}, []);

	useEffect(() => {
		ref.current = request;
	}, [request]);

	useEffect(() => {
		reset();
		return reset;
	}, []);

	return request;
};
