interface IBaseRepository<T> {
  find(item: T): T;
}

export { IBaseRepository };
