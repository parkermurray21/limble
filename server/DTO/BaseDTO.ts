export default abstract class BaseDTO {
    protected constructor() {}
    static newInstance() {
      throw new Error('Method not implemented. Implement in child class');
    }
  }