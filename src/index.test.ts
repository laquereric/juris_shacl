import { JurisShaclData } from './index';

describe('JurisShaclData', () => {
  let jurisShaclData: JurisShaclData;

  beforeEach(() => {
    jurisShaclData = new JurisShaclData();
    jurisShaclData.init();
  });

  it('should store and retrieve data', async () => {
    const prefix = 'test';
    const data = {
      '@context': {
        'name': 'http://schema.org/name'
      },
      'name': 'John Doe'
    };
    await jurisShaclData.setData(prefix, data);
    const retrievedData = jurisShaclData.get(prefix, '0.http://schema.org/name.0.@value');
    expect(retrievedData).toBe('John Doe');
  });

  it('should update data', async () => {
    const prefix = 'test';
    const initialData = {
      '@context': {
        'name': 'http://schema.org/name'
      },
      'name': 'John Doe'
    };
    await jurisShaclData.setData(prefix, initialData);
    await jurisShaclData.update(prefix, 'http://schema.org/name.0.@value', 'Jane Doe');
    const updatedData = jurisShaclData.get(prefix, '0.http://schema.org/name.0.@value');
    expect(updatedData).toBe('Jane Doe');
  });

  it('should set and get data', () => {
    const prefix = 'test';
    const path = 'a.b.c';
    const value = 'test value';
    jurisShaclData.set(prefix, path, value);
    const retrievedValue = jurisShaclData.get(prefix, path);
    expect(retrievedValue).toBe(value);
  });
});
