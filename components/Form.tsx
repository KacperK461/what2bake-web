import { FormHTMLAttributes, InputHTMLAttributes, useContext } from 'react';
import { createContext } from 'react';
import Error from '@/components/Error';

const FormContext = createContext<{ error: any }>({ error: {} });

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input = (inputAttributes: InputProps) => {
  const { error } = useContext(FormContext);

  return (
    <>
      <input
        className='my-3 w-full rounded-[10px] bg-white px-5 py-3 text-lg font-bold placeholder-gray-100 shadow-lg outline-none dark:bg-dark-100'
        {...inputAttributes}
      />
      <Error>{error?.fieldErrors?.[inputAttributes.name]?.[0]}</Error>
    </>
  );
};

const GeneralError = () => {
  const { error } = useContext(FormContext);
  return <Error>{typeof error === 'string' && error}</Error>;
};

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  error?: any;
}

const Form = ({ children, error, ...formAttributes }: FormProps) => {
  return (
    <form {...formAttributes} className='flex flex-col items-center'>
      <FormContext.Provider value={{ error }}>{children}</FormContext.Provider>
    </form>
  );
};

Form.Input = Input;
Form.GeneralError = GeneralError;

export default Form;
