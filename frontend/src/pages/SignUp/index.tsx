import React, { FC, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';
import Input from './../../components/Input/index';
import Button from './../../components/Button/index';
import getValidationErrors from './../../utils/getValidationErros';
import api from '../../services/api';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: FC = () => {
	const formRef = useRef<FormHandles>(null);

	const handleSubmit = useCallback(async (data: SignUpFormData) => {
		try {
			formRef.current?.setErrors({});
			
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório'),
				email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
				password: Yup.string().min(6, 'Mínimo de 6 dígitos')
			});

			await schema.validate(data, { abortEarly: false });

			const response = await api.post('/users', data);

			if (response.status === 200) {
				alert("Usuário criado com sucess");
			}
		} catch (error) {
			const errors = getValidationErrors(error);
			formRef.current?.setErrors(errors);
		}
	}, []);

	return (
		<>			
			<Container>
				<Background />

				<Content>
					<img src={ logo } alt="Logo GoBarber"/>

					<Form onSubmit={ handleSubmit } ref={ formRef }>
						<h1>Faça seu cadastro</h1>
						<Input name="name" icon={ FiUser} placeholder="Nome" type="text"/>
						<Input name="email" icon={ FiMail} placeholder="E-mail" type="text"/>
						<Input name="password" icon={ FiLock} placeholder="Senha" type="password"/>

						<Button type="submit">Cadastrar</Button>
					</Form>

					<Link to="/sign-in">
						<FiLogIn />
						Voltar para logon
					</Link>
				</Content>
			</Container>
		</>
	);
};

export default SignUp;