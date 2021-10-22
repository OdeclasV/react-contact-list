import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes, { objectOf } from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);

	console.log(props.match);

	const contactToEdit = store.contacts.find(contact => contact.id === props.match.params.id);

	const [updatedContact, setUpdatedContact] = React.useState({
		full_name: contactToEdit.full_name,
		email: contactToEdit.email,
		phone: contactToEdit.phone,
		address: contactToEdit.address,
		id: contactToEdit.id
	});

	const handleChange = e => {
		setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit {updatedContact.full_name}</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							onChange={handleChange}
							value={updatedContact.full_name}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							onChange={handleChange}
							value={updatedContact.email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							onChange={handleChange}
							value={updatedContact.phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							onChange={handleChange}
							value={updatedContact.address}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							actions.editContact(updatedContact);
							props.history.push("/");
						}}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object
};
