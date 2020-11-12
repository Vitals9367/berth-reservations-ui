import { footerSelectors } from './selectors/footer';
import { frontPageSelectors } from './selectors/frontPage';
import { navbarSelectors } from './selectors/navbar';
import { navigateToFrontPage } from './utils/navigation';
import { envUrl } from './utils/settings';
import { switchToEnglish, switchToFinnish, switchToSwedish } from './utils/switchLanguage';
import {
  isBerthsPage,
  isFrontPage,
  isUnmarkedWinterStoragePage,
  isWinterStoragePage,
} from './utils/page';

fixture('Front page').page(envUrl());

test('Navigation', async (t) => {
  const { mainLink, berths, winterStorage, unmarkedWinterStorage } = navbarSelectors;

  // Main link
  await t.click(mainLink);
  await isFrontPage();

  // Berths
  await t.click(berths);
  await isBerthsPage();

  // Winter storage
  await t.click(winterStorage);
  await isWinterStoragePage();

  // Unmarked winter storage
  await t.click(unmarkedWinterStorage);
  await isUnmarkedWinterStoragePage();
});

test('Switching language', async (t) => {
  const { languageSelect } = navbarSelectors;
  const { title } = frontPageSelectors;

  // Switch to Swedish
  await t.expect(languageSelect.Swedish.visible).notOk();
  await switchToSwedish(t);
  await t.expect(title.innerText).eql('Båtplatser');

  // Switch to English
  await t.expect(languageSelect.English.visible).notOk();
  await switchToEnglish(t);
  await t.expect(title.innerText).eql('Boat berths');

  // Switch to Finnish
  await t.expect(languageSelect.Finnish.visible).notOk();
  await switchToFinnish(t);
  await t.expect(title.innerText).eql('Venepaikat');
});

test('Front page links', async (t) => {
  const { berths, winterStorage, unmarkedWinterStorage } = frontPageSelectors;

  // Berths
  await t.click(berths);
  await isBerthsPage();
  await navigateToFrontPage();

  // Winter storage
  await t.click(winterStorage);
  await isWinterStoragePage();
  await navigateToFrontPage();

  // Unmarked winter storage
  await t.click(unmarkedWinterStorage);
  await isUnmarkedWinterStoragePage();
  await navigateToFrontPage();
});

test('Footer', async (t) => {
  const {
    serviceLink,
    browseBerths,
    boatingInformation,
    recent,
    privacyPolicy,
    accessibilityPolicy,
    sendFeedback,
    contact,
  } = footerSelectors;

  // 'Venepaikat' Link
  await t.expect(serviceLink.visible).ok();

  // Link list
  await t
    .expect(browseBerths.visible)
    .ok()
    .expect(boatingInformation.visible)
    .ok()
    .expect(recent.visible)
    .ok()
    .expect(privacyPolicy.visible)
    .ok()
    .expect(accessibilityPolicy.visible)
    .ok();

  // Bottom links
  await t.expect(sendFeedback.visible).ok().expect(contact.visible).ok();
});
