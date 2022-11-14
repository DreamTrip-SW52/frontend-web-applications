import { IAuthLoginErrors, IAuthRegisterErrors, IAuthAdditionalDataRegisterErrors, IAuthAgencyRegisterErrors } from "../interfaces/Auth";

function validateEmail(email: string) {
	const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return re.test(email);
}

function validatePassword(password: string) {
	return true;
}

export function getAuthLoginErrors(
	email: string,
	password: string
): IAuthLoginErrors {
	var obj = {
		email: {
			error: false,
			message: "",
		},
		password: {
			error: false,
			message: "",
		},
	};

	if (email === "") {
		obj['email'].message = "Email is requested."
		obj['email'].error = true
	} else if (!validateEmail(email)){
		obj['email'].message = "Email is incorrect."
		obj['email'].error = true
	}

	if (password === "") {
		obj['password'].message = "Password is requested."
		obj['password'].error = true
	} else if (!validatePassword(password)){
	    obj['password'].message = "Password is incorrect."
	    obj['password'].error = true
    }

	return obj;
}

export function getAuthRegisterErrors(
	email: string,
	password: string,
	confirmPassword: string
): IAuthRegisterErrors {

	if (email === "" && password === "" && confirmPassword === "") {
		return {
			email: {
				error: email === "" ? true : false,
				message: email === "" ? "Email is required" : "",
			},
			password: {
				error: password === "" ? true : false,
				message: password === "" ? "Password is required" : "",
			},
			confirmPassword: {
				error: confirmPassword === "" ? true : false,
				message: confirmPassword === "" ? "Confirm password is required" : "",
			},
		};
	} else if (email === "") {
		return {
			email: {
				error: true,
				message: "Email is required",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (password === "") {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: true,
				message: "Password is required",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (confirmPassword === "") {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: true,
				message: "Confirm password is required",
			},
		};
	} else if (password !== confirmPassword) {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: true,
				message: "Passwords do not match",
			},
			confirmPassword: {
				error: true,
				message: "Passwords do not match",
			},
		};
	} else {
		if (!validateEmail(email)) {
			return {
				email: {
					error: true,
					message: "Invalid email",
				},
				password: {
					error: false,
					message: "",
				},
				confirmPassword: {
					error: false,
					message: "",
				},
			};
		}
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	}
}

export function getAuthAdditionalDataRegisterErrors(
	name: string,
	lastname: string,
	phone: string,
	dni: string
): IAuthAdditionalDataRegisterErrors {

	if (name === "" && lastname === "" && phone === "" && dni === "") {
		return {
			name: {
				error: name === "" ? true : false,
				message: name === "" ? "Name is required" : "",
			},
			lastname: {
				error: lastname === "" ? true : false,
				message: lastname === "" ? "Lastname is required" : "",
			},
			phone: {
				error: phone === "" ? true : false,
				message: phone === "" ? "Phone is required" : "",
			},
			dni: {
				error: dni === "" ? true : false,
				message: dni === "" ? "DNI is required" : "",
			},
		};
		
	} else if (name === "") {
		return {
			name: {
				error: true,
				message: "Name is required",
			},
			lastname: {
				error: false,
				message: "",
			},
			phone: {
				error: false,
				message: "",
			},
			dni: {
				error: false,
				message: "",
			}
		};
	} else if (lastname === "") {
		return {
			name: {
				error: false,
				message: "",
			},
			lastname: {
				error: true,
				message: "Password is required",
			},
			phone: {
				error: false,
				message: "",
			},
			dni: {
				error: false,
				message: "",
			}
		};
	} else if (phone === "") {
		return {
			name: {
				error: false,
				message: "",
			},
			lastname: {
				error: false,
				message: "",
			},
			phone: {
				error: true,
				message: "Confirm lastname is required",
			},
			dni: {
				error: false,
				message: "",
			},
		};
	} else if (dni === "") {
		return {
			name: {
				error: false,
				message: "",
			},
			lastname: {
				error: false,
				message: "",
			},
			phone: {
				error: false,
				message: "",
				
			},
			dni: {
				error: true,
				message: "Confirm dni is required",
			},
		};
	} 
	 else {
		return {
			name: {
				error: false,
				message: "",
			},
			lastname: {
				error: false,
				message: "",
			},
			phone: {
				error: false,
				message: "",
			},
			dni: {
				error: false,
				message: "",
			},
		};
    }
}

export function IAuthAgencyRegisterErrors(
	name: string,
	ruc: string,
	email: string,
	password: string,
	confirmPassword: string
): IAuthAgencyRegisterErrors {

	if (name === "" && ruc === "" && email === "" && password === "" && confirmPassword === "") {
		return {
			name: {
				error: ruc === "" ? true : false,
				message: ruc === "" ? "Name is required" : "",
			},
			ruc: {
				error: ruc === "" ? true : false,
				message: ruc === "" ? "RUC is required" : "",
			},
			email: {
				error: email === "" ? true : false,
				message: email === "" ? "Email is required" : "",
			},
			password: {
				error: password === "" ? true : false,
				message: password === "" ? "Password is required" : "",
			},
			confirmPassword: {
				error: confirmPassword === "" ? true : false,
				message: confirmPassword === "" ? "Confirm password is required" : "",
			},
		};
	} else if (name === "") {
		return {
			name: {
				error: true,
				message: "Name is required",
			},
			ruc: {
				error: true,
				message: "RUC is required",
			},
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (ruc === "") {
		return {
			name: {
				error: false,
				message: "",
			},
			ruc: {
				error: true,
				message: "RUC is required",
			},
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (email === "") {
		return {
			name: {
				error: false,
				message: "",
			},
			ruc: {
				error: false,
				message: "",
			},
			email: {
				error: true,
				message: "Email is required",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (password === "") {
		return {
			name: {
				error: false,
				message: "",
			},
			ruc: {
				error: false,
				message: "",
			},
			email: {
				error: false,
				message: "",
			},
			password: {
				error: true,
				message: "Password is required",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	} else if (confirmPassword === "") {
		return {
			name: {
				error: false,
				message: "",
			},
			ruc: {
				error: false,
				message: "",
			},
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: true,
				message: "Confirm password is required",
			},
		};
	} else if (password !== confirmPassword) {
		return {
			name: {
			error: false,
			message: "",
		},
			ruc: {
				error: false,
				message: "",
			},
			email: {
				error: false,
				message: "",
			},
			password: {
				error: true,
				message: "Passwords do not match",
			},
			confirmPassword: {
				error: true,
				message: "Passwords do not match",
			},
		};
	} else {
		if (!validateEmail(email)) {
			return {
				name: {
					error: false,
					message: "",
				},
				ruc: {
					error: false,
					message: "",
				},
				email: {
					error: true,
					message: "Invalid email",
				},
				password: {
					error: false,
					message: "",
				},
				confirmPassword: {
					error: false,
					message: "",
				},
			};
		}
		return {
			name: {
				error: false,
				message: "",
			},
			ruc: {
				error: false,
				message: "",
			},
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
			confirmPassword: {
				error: false,
				message: "",
			},
		};
	}
}