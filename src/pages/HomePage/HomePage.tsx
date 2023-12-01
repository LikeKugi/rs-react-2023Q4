import { selectAllCountries, useAppSelector } from '@/store';

const HomePage = () => {
  const countries = useAppSelector(selectAllCountries);
  return (
    <div>
      Home page
      {countries.map((country) => (
        <p key={country.code}>{country.name}</p>
      ))}
    </div>
  );
};

export default HomePage;
