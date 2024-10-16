import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '9230',
        database: 'apicrud',
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
