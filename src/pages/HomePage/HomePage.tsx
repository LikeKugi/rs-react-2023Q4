import { useAppSelector } from '@/store';
import {
  selectControlledFormData,
  selectLastAddedFormData,
  selectUncontrolledFormData,
} from '@/store/formDataSlice';
import Card from '@/components/Card/Card';
import Heading from '@/components/Heading/Heading';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const lastAddedData = useAppSelector(selectLastAddedFormData);
  const controlledFormData = useAppSelector(selectControlledFormData);
  const uncontrolledFormData = useAppSelector(selectUncontrolledFormData);
  return (
    <div className={styles.home}>
      <Heading text="Data from all forms" />
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
          {controlledFormData.map((item, index) => (
            <Card key={`c${index}`} data={item} />
          ))}
        </>
      )}
      {!!uncontrolledFormData.length && (
        <>
          <Heading text="Data from uncontrolled form" type="h2" />
          {uncontrolledFormData.map((item, index) => (
            <Card key={`u${index}`} data={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default HomePage;
