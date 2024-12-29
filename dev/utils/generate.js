import {faker} from '@faker-js/faker';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const person = () => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: Math.random() < 0.1 ? undefined : faker.person.lastName(),
  dateOfEmployment: faker.date.between({
    from: '2000-01-01T00:00:00.000Z',
    to: '2025-01-01T00:00:00.000Z',
  }),
  dateOfBirth: faker.date.birthdate({mode: 'age', min: 18, max: 64}),
  phone: faker.phone.number({style: 'national'}),
  email: faker.internet.email(),
  department: faker.helpers.shuffle([
    'Development',
    'Analytics',
    'Marketing',
    'Finance',
    'Human Resource',
  ])[0],
  position: faker.helpers.shuffle([
    'Junior',
    'Medior',
    'Senior',
    'Staff',
    'Principal',
  ])[0],
});

export function generate(...lengths) {
  const makeDataLevel = (depth = 0) => {
    const len = lengths[depth];

    return range(len).map(() => {
      return {
        ...person(),
        subRows: lengths[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
