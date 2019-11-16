import { InjuriesToStringPipe } from './injuries-to-string.pipe';

describe('InjuriesToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new InjuriesToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
