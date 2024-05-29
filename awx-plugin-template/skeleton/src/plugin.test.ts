import { awxPlugin } from './plugin';

describe('awx', () => {
  it('should export plugin', () => {
    expect(awxPlugin).toBeDefined();
  });
});
