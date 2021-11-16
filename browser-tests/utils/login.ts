import { ssoLogin } from '../ssoLogin';
import { navbarSelectors } from '../selectors/navbar';

export const login = async (t: TestController) => {
  await t.click(navbarSelectors.loginButton);

  await t
    .click(ssoLogin.loginLink)
    .click(ssoLogin.testUser)
    .click(ssoLogin.defaultSSN)
    .click(ssoLogin.authButton)
    .click(ssoLogin.continueButton)
    .click(ssoLogin.acceptButton);

  try {
    if (await ssoLogin.permissionRequestHeading.exists) {
      await t.click(ssoLogin.allowButton);
    }
  } catch {
    // all is well, do nothing
  }
};
