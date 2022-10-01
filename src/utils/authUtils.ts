import { IAuthLoginErrors, IAuthRegisterErrors } from "../interfaces/Auth";

function validateEmail(email: string) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

export function getAuthLoginErrors(
	email: string,
	password: string
): IAuthLoginErrors {
	if (email === "" && password === "") {
		return {
			email: {
				error: email === "" ? true : false,
				message: email === "" ? "Email is required" : "",
			},
			password: {
				error: password === "" ? true : false,
				message: password === "" ? "Password is required" : "",
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
		};
	} else {
		return {
			email: {
				error: false,
				message: "",
			},
			password: {
				error: false,
				message: "",
			},
		};
	}
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
