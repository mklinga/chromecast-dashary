/* global cast */

const input = document.getElementById('sms');
input.addEventListener('change', (e) => {
  console.log('GOT CHANGE', e.target.value);
  var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  if (castSession) {
    console.log('HAS castSession');
    castSession.sendMessage('urn:x-cast:website.suspicious.cast.info', {
      type: 'TEST_MESSAGE',
      value: e.target.value,
      requestId: 1
    });
  }
});

window['__onGCastApiAvailable'] = function (isAvailable) {
  console.log('CALLING CACACA', isAvailable);
  if (isAvailable) {
    var options = {};

    // options.receiverApplicationId = 'C0868879';
    options.receiverApplicationId = '17BF17FE';
    options.autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;

    window.cast.framework.CastContext.getInstance().setOptions(options);

    const msg = document.createElement('p');
    msg.textContent = 'INITIALIZING OK';
    document.getElementById('messages').appendChild(msg);
  }
};
