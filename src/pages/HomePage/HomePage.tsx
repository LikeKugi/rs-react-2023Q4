import { useAppSelector } from '@/store';
import {
  selectControlledFormData,
  selectLastAddedFormData,
  selectUncontrolledFormData,
} from '@/store/formDataSlice';
import Card from '@/components/Card/Card';
import Heading from '@/components/Heading/Heading';

const HomePage = () => {
  const lastAddedData = useAppSelector(selectLastAddedFormData);
  const controlledFormData = useAppSelector(selectControlledFormData);
  const uncontrolledFormData = useAppSelector(selectUncontrolledFormData);
  return (
    <div>
      Home page
      {lastAddedData ? (
        <>
          <Heading text="Last Added data" type="h2" />
          <Card data={lastAddedData} isNew />
        </>
      ) : (
        <Heading text="No data provided" type="h2" />
      )}
      {!!controlledFormData.length && (
        <>
          <Heading text="Data from controlled form" type="h2" />
          {controlledFormData.map((item) => (
            <Card data={item} />
          ))}
        </>
      )}
      {!!controlledFormData.length && (
        <>
          <Heading text="Data from uncontrolled form" type="h2" />
          {uncontrolledFormData.map((item) => (
            <Card data={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default HomePage;
