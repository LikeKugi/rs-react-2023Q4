import { JSX } from 'react';
import Heading from '@/components/Heading/Heading';
import ControlledForm from '@/components/ControlledForm/ControlledForm';

const ControlledFormPage = (): JSX.Element => {
  return (
    <div>
      <Heading text="Controlled Form" />
      <ControlledForm />
    </div>
  );
};
export default ControlledFormPage;
