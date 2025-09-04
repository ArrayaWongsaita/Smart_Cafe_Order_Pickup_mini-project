import { CheckHealthUseCase } from './check-health.usecase';

describe('CheckHealthUseCase', () => {
  let useCase: CheckHealthUseCase;

  beforeEach(() => {
    useCase = new CheckHealthUseCase();
  });

  it('should return a successful health check response', () => {
    const result = useCase.execute();
    expect(result).toBeDefined();
    expect(result.status).toBe('ok');
    expect(result.message).toBe('Health check passed');
    expect(result.version).toBe('1.0.0');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('timestamp should be close to "now"', () => {
    const before = Date.now();
    const { timestamp } = useCase.execute();
    const after = Date.now();
    expect(timestamp.getTime()).toBeGreaterThanOrEqual(before);
    expect(timestamp.getTime()).toBeLessThanOrEqual(after);
  });
});
