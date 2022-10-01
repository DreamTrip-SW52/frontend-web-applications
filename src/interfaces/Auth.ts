export interface IAuthLoginErrors {
	email: {
		error: boolean;
		message: string;
	};
	password: {
		error: boolean;
		message: string;
	};
}

export interface IAuthRegisterErrors {
	email: {
		error: boolean;
		message: string;
	};
	password: {
		error: boolean;
		message: string;
	};
	confirmPassword: {
		error: boolean;
		message: string;
	};
}
