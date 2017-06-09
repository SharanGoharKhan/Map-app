import { MapAppPage } from './app.po';

describe('map-app App', () => {
  let page: MapAppPage;

  beforeEach(() => {
    page = new MapAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
