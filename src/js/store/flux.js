const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getContacts: () => {
				// get contacts details from API
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/odeclasv")
					.then(response => {
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						console.log(data);
						setStore({ contacts: data });
					});
			},
			addContact: contact => {
				// add contacts details in API
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				})
					.then(response => {
						if (response.ok) {
							fetch("https://assets.breatheco.de/apis/fake/contact/agenda/odeclasv")
								.then(response => {
									if (!response.ok) {
										throw new Error(response.statusText);
									}
									return response.json();
								})
								.then(data => {
									setStore({ contacts: data });
								});
						}
					})
					.catch(err => console.log(err));
			},
			editContact: contact => {
				// update contacts details in API
				fetch(`https://assets.breatheco.de/apis/fake/contact/${contact.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				})
					.then(response => {
						if (response.ok) {
							fetch("https://assets.breatheco.de/apis/fake/contact/agenda/odeclasv")
								.then(response => {
									if (!response.ok) {
										throw new Error(response.statusText);
									}
									return response.json();
								})
								.then(data => {
									setStore({ contacts: data });
								});
						}
					})
					.catch(err => console.log(err));
			},
			deleteContact: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, { method: "DELETE" })
					.then(response => {
						if (response.ok) {
							fetch("https://assets.breatheco.de/apis/fake/contact/agenda/odeclasv")
								.then(response => {
									if (!response.ok) {
										throw new Error(response.statusText);
									}
									return response.json();
								})
								.then(data => {
									setStore({ contacts: data });
								});
						}
					})
					.catch(err => console.log(err));
			}
		}
	};
};

export default getState;
