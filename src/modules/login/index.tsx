import { useState, useContext } from 'react';
import type {FormEvent} from 'react';
import { Container, LoginBox, Title, Form, InputGroup, Label, Input, Button, ErrorMessage } from './styles';
import { AuthContext } from '../../contexts/AuthContext';

export function Login() {
  const [ email, SetEmail ] = useState('');
  const [ password, SetPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ isLoading ] = useState(false);
  const { login } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
    } catch {
      setError('Credenciais inválidas ou erro no servidor.');
    }
  }

  return (
    <Container>
      <LoginBox>
        <Title>SenacPass</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => SetEmail(e.target.value)} 
              placeholder="Digite seu e-mail" 
              required 
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <Input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => SetPassword(e.target.value)} 
              placeholder="Digite sua senha" 
              required 
            />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
      </LoginBox>
    </Container>
  );
}
