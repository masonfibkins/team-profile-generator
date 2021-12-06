const { TestWatcher } = require('@jest/core');
const Employee = require('../lib/Employee');
 
test('create employee object', () => {
    const employee = new Employee('Mason', 102, 'mason@gmail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

test('gets employee name', () => {
    const employee = new Employee('Mason', 102, 'mason@gmail.com');

    expect(employee.getName()).toEqual(expect.any(String));
});