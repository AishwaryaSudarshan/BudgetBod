const mysql = require('mysql2');
const dbModule = require('./db'); 

jest.mock('mysql2', () => {
  const originalModule = jest.requireActual('mysql2');

  return {
    __esModule: true,
    ...originalModule,
    createConnection: jest.fn(() => ({
      connect: jest.fn((cb) => {
        const error = null; 
        const response = { threadId: '123' }; 
        cb(error, response);
      }),
    })),
  };
});

describe('MySQL Connection', () => {
  it('should create a MySQL connection', () => {
    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "budgetbod_db",
    });
  });

  it('should connect to MySQL successfully', (done) => {
    dbModule.connect((err, result) => {
      expect(err).toBeNull();
      expect(result).toHaveProperty('threadId');
      done();
    });
  });

  it('should handle MySQL connection error', (done) => {
    mysql.createConnection().connect.mockImplementation(cb => {
      const error = new Error('Connection failed');
      cb(error);
    });

    dbModule.connect((err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
  });
});
