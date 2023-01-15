import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const ProfilePageStyled = styled.div`
	color: red;
	width: 100vw;
	text-align: center;
`;

const ProfilePage = () => {
	const params = useParams<{ id: string }>();

	return (
		<ProfilePageStyled>
			<h1>Profile - {params.id}</h1>
		</ProfilePageStyled>
	);
};

export default ProfilePage;
