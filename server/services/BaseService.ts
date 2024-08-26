export default abstract class BaseService {
    protected constructor() {}
    static newInstance() {
      throw new Error('Method not implemented. Implement in child class');
    }
  }
  