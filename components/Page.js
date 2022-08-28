import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import routes from 'utils/routes';
import LocalStorage from 'utils/localStorage';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/stores/user';
import { PrivateType } from 'utils/const';

const Page = ({
	title = 'Название',
	ogTitle = title,
	description = 'Описание',
	ogDescription = description,
	keywords,
	url = '',
	children,
	component,
	className,
	style,
	privateType = PrivateType.PUBLIC,
}) => {
	const router = useRouter();
	const authToken = useSelector(getToken);
	useEffect(() => {
		switch (privateType) {
			case PrivateType.PRIVATE:
				if (!authToken && !LocalStorage.read('token')) router.push(routes.auth.index);
				break;
			case PrivateType.PRIVATE_AUTH:
				if (authToken) router.push(routes.home);
				break;
			default:
				break;
		}
	}, [privateType, authToken, router]);

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charset="utf-8"></meta>
				<meta name="keywords" content={keywords || 'ключевые слова'} />
				<meta name="description" content={description} />
				<meta name="format-detection" content="telephone=no" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />

				<meta property="og:title" content={ogTitle} />
				<meta property="og:description" content={ogDescription} />
				<meta property="og:image" content="" />
				<meta property="og:url" content={url} />
				<meta property="og:type" content="website" />

				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

				{/* <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />

				<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}

				<meta name="theme-color" content="#ffffff" />
			</Head>
			{
				// header
			}
			<main className={className} style={style}>
				{component ? React.createElement(component, [], children) : children}
			</main>
			{
				// footer
			}
		</>
	);
};

export default Page;
