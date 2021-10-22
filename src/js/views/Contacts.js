import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = props => {
	const [state, setState] = useState({
		showModal: false,
		id: null
	});
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map((contact, index) => {
							//console.log(contact);
							return (
								<ContactCard
									onDelete={() => setState({ showModal: true, id: contact.id })}
									key={index}
									contact={contact}
								/>
							); //contact card sets id to delete
						})}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} id={state.id} />
		</div> //modal is the one that deletes the contact
	);
};

//toggle modal
// similar to dropdown menu in past project
// user clicks outside, make it invisible
