import Cookies from "js-cookie";
import {createContext} from "react";


export const api = {
	GET: (endpoint, queryParams={}) => _get(endpoint, queryParams),
	POST: (endpoint, data) => _post(endpoint, data),
	DELETE: (endpoint, id) => _delete(endpoint, id),
	PATCH: (endpoint, id, data) => _patch(endpoint, id, data)
};
export const APIContext = createContext(api);

const _get = async (endpoint, queryParams={}) => {
	const params = new URLSearchParams(queryParams).toString();
	let response = await fetch(`api/${endpoint}/?${params}`);
	_raiseForStatus(response.status, 200);
	return await response.json();
};


const _post = async (endpoint, data) => {
	let response = await _fetchDjango(
		`/api/${endpoint}/`, {
			method: 'POST',
			body: data
		});

	_raiseForStatus(response.status, 201);
	return await response.json();
};


const _delete = async (endpoint, id) => {
	const response = await _fetchDjango(
		`/api/${endpoint}/${id}/`, {
			method: 'DELETE'
		});

	_raiseForStatus(response.status, 204);
};


const _patch = async (endpoint, id, data) => {
	let response = await _fetchDjango(
		`/api/${endpoint}/${id}/`, {
			method: 'PATCH',
			body: data
		});

	_raiseForStatus(response.status, 200);
	return await response.json();
};


async function _fetchDjango(url, init) {
	return await fetch(url, {
		method: init['method'],
		headers: {
			'X-CSRFToken': Cookies.get("csrftoken"),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(init['body']),
	});
}


function _raiseForStatus(status, expected) {
	if (status !== expected) {
		const message = 'An error occurred while fetching data. Code: ' + status;
		console.error(message);
		throw new Error(message);
	}
}
