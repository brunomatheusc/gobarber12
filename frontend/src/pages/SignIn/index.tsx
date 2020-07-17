import React, { FC, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';
import Input from './../../components/Input/index';
import Button from './../../components/Button/index';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErros';
import useAuth from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { user, signIn } = useAuth();
	const { addToast } = useToast	();

	const handleSubmit = useCallback(async (data: SignInFormData) => {
		try {
			formRef.current?.setErrors({});
			
			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
				password: Yup.string().required('Senha obrigatória')
			});

			await schema.validate(data, { abortEarly: false });

			await signIn({ email: data.email, password: data.password });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const errors = getValidationErrors(error);
				formRef.current?.setErrors(errors);				
			}

			// addToast();
		}
	}, [signIn, addToast]);

	return (
		<>
			<Container>
				<Content>
					<img src={ logo } alt="Logo GoBarber"/>

					<Form ref={ formRef } onSubmit={ handleSubmit }>
						<h1>Faça seu logon</h1>
						<Input name="email" icon={ FiMail} placeholder="E-mail" type="text"/>
						<Input name="password" icon={ FiLock} placeholder="Senha" type="password"/>

						<Button type="submit">Entrar</Button>

						<Link to="/forgot">Esqueci minha senha</Link>
					</Form>

					<Link to="/sign-up">
						<FiLogIn />
						Criar conta
					</Link>
				</Content>

				<Background />
			</Container>
		</>
	);
};

export default SignIn;