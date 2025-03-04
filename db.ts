// тип объекта данных пользователя
type UserData = {
    name: string;
    age: number;
  }
  
  // протипизируем users - массив объектов типа UserData
  export const users: UserData[] = [
    { name: 'Мария', age: 22 },
    { name: 'Виктор', age: 30 },
    { name: 'Анастасия', age: 48 },
    { name: 'Алексей', age: 51 }
  ]; 