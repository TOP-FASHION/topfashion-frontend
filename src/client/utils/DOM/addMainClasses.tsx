import htmlClass from '../htmlClass';

// @ts-ignore
export default function addMainClasses(core: any) {
  const deviceType = core.item('settings').item('be').item('deviceType');
  const deviceTypeName =
    deviceType === 0
      ? 'desktop'
      : deviceType === 1
      ? 'mobile'
      : deviceType === 2
      ? 'tablet'
      : '';
  core.item('$deviceType', deviceTypeName);
  if (deviceTypeName) {
    htmlClass.add(document.body, deviceTypeName);
  }

  const locationCountry = core.item('settings').item('country');
  if (locationCountry) {
    htmlClass.remove(document.body, /^lc-/);
    htmlClass.add(document.body, `lc-${locationCountry.toLowerCase()}`);
  }

  const registrationCountry = core.item('loggedIn')
    ? core.item('profile').item('details').item('country')
    : '';
  if (registrationCountry) {
    htmlClass.remove(document.body, /^rc-/);
    htmlClass.add(document.body, `rc-${registrationCountry.toLowerCase()}`);
  }

  if (core.item('ukRules').item('general')) {
    htmlClass.add(document.body, 'uk-general');
  } else {
    htmlClass.remove(document.body, 'uk-general');
  }

  if (core.item('ukRules').item('minors')) {
    htmlClass.add(document.body, 'uk-minors');
  } else {
    htmlClass.remove(document.body, 'uk-minors');
  }

  if (
    core.item('deposit') &&
    (core.item('deposit').item('allowedPayAndPlay') ||
      core.item('deposit').item('hasPayAndPlayOnly'))
  ) {
    htmlClass.add(document.body, 'pay-and-play');
  } else {
    htmlClass.remove(document.body, 'pay-and-play');
  }
  return null;
}
