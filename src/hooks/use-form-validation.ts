import { useState } from 'react';

interface ValidationRules {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	pattern?: RegExp;
}

interface FieldValidation {
	[key: string]: ValidationRules;
}

export function useFormValidation<T extends Record<string, T[keyof T]>>(
	initialValues: T,
	validationRules: FieldValidation
) {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
	const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

	const validateField = (name: keyof T, value: T[keyof T]): string => {
		const rules = validationRules[name as string];
		if (!rules) return '';

		if (rules.required && !value) {
			return 'This field is required';
		}

		if (
			rules.minLength &&
			typeof value === 'string' &&
			value.length < rules.minLength
		) {
			return `Minimum length is ${rules.minLength} characters`;
		}

		if (
			rules.maxLength &&
			typeof value === 'string' &&
			value.length > rules.maxLength
		) {
			return `Maximum length is ${rules.maxLength} characters`;
		}

		if (
			rules.min !== undefined &&
			typeof value === 'number' &&
			value < rules.min
		) {
			return `Minimum value is ${rules.min}`;
		}

		if (
			rules.max !== undefined &&
			typeof value === 'number' &&
			value > rules.max
		) {
			return `Maximum value is ${rules.max}`;
		}

		if (
			rules.pattern &&
			typeof value === 'string' &&
			!rules.pattern.test(value)
		) {
			return 'Invalid format';
		}

		return '';
	};

	const handleChange = (name: keyof T, value: T[keyof T]) => {
		setValues((prev) => ({ ...prev, [name]: value }));

		if (touched[name]) {
			const error = validateField(name, value);
			setErrors((prev) => ({ ...prev, [name]: error }));
		}
	};

	const handleBlur = (name: keyof T) => {
		setTouched((prev) => ({ ...prev, [name]: true }));
		const error = validateField(name, values[name]);
		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const validateAll = (): boolean => {
		const newErrors: Partial<Record<keyof T, string>> = {};
		let isValid = true;

		Object.keys(validationRules).forEach((key) => {
			const error = validateField(key as keyof T, values[key as keyof T]);
			if (error) {
				newErrors[key as keyof T] = error;
				isValid = false;
			}
		});

		setErrors(newErrors);
		setTouched(
			Object.keys(validationRules).reduce(
				(acc, key) => ({ ...acc, [key]: true }),
				{}
			)
		);

		return isValid;
	};

	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
		setTouched({});
	};

	return {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		validateAll,
		resetForm,
		setValues,
	};
}
