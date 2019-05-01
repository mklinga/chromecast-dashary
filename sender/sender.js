/* global cast, chrome */

const $dasharyKitty = document.getElementById('dashary-kitty');
const $dasharyUnsplash = document.getElementById('dashary-unsplash');

const changeDashary = nextDashary => () => {
  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  if (castSession) {
    castSession.sendMessage('urn:x-cast:website.suspicious.cast.info', {
      type: 'CHANGE_DASHARY',
      value: nextDashary
    });
  } else {
    console.warn('No cast session found 🤷');
  }
};

$dasharyKitty.addEventListener('click', changeDashary('KITTY'));
$dasharyUnsplash.addEventListener('click', changeDashary('UNSPLASH'));

window['__onGCastApiAvailable'] = function (isAvailable) {
  if (isAvailable) {
    const options = {
      receiverApplicationId: '17BF17FE',
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    };

    cast.framework.CastContext.getInstance().setOptions(options);
  }
};
