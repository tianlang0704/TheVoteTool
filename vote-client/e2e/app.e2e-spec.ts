import { VotePage } from './app.po';

describe('vote App', function() {
  let page: VotePage;

  beforeEach(() => {
    page = new VotePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
