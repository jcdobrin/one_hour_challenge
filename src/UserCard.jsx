import Input from './Input'
import PropTypes from "prop-types";

const UserType = {
	login:PropTypes.shape({
		uuid: PropTypes.string.isRequired,
	}),
	picture: PropTypes.shape({
		thumbnail: PropTypes.string.isRequired,
	}),
	userusername: PropTypes.shape({
		title: PropTypes.string.isRequired,
		first: PropTypes.string.isRequired,
		last: PropTypes.string.isRequired,
	}),
	location: PropTypes.shape({
		street: PropTypes.shape({
			number: PropTypes.number.isRequired,
			username: PropTypes.string.isRequired,
		}),
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		postcode: PropTypes.number.isRequired,
	}),
	phone:PropTypes.string,
	email:PropTypes.string,
	dob:PropTypes.shape({
		date:PropTypes.string,
		age:PropTypes.number,
	})
};


const UserCard = (user) => {
	return (
		<div className="user">
			<div className="user-image-container">
			<img className="user-image" src={user.picture.thumbnail} alt="profile pic"/>
			</div>
			<div className="content info-header">
				<div className="general-info-link" title=""><Input user={user} index="title"/> <Input user={user} index="first"/> <Input user={user} index="last"/></div>
				<div className="user-info-subtitle location"><Input user={user} index="number"/> <Input user={user} index="name"/></div>
				<div className="user-info-subtitle location"><Input user={user} index="city"/>, <Input user={user} index="state"/> <Input user={user} index="postcode"/></div>
			</div>
			<div className="sub-header">
				<div className="user-info-subtitle phone"> <Input user={user} index="phone"/></div>
				<div className="user-info-subtitle email"> <Input user={user} index="email"/></div>
				<div className="user-info-subtitle dob">{user.dob.date.substring(0,10)}</div>
			</div>
	  </div>
	);
}

UserCard.propTypes = {
	user: PropTypes.shape(UserType),
	//onClick: PropTypes.func,
}


export default UserCard