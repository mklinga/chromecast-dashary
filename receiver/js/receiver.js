/* global cast */
const context = cast.framework.CastReceiverContext.getInstance();

const CUSTOM_CHANNEL = 'urn:x-cast:website.suspicious.cast.info';
context.addCustomMessageListener(CUSTOM_CHANNEL, function (customEvent) {
  const next = document.createElement('p');
  next.textContent = JSON.stringify(customEvent);
  document.querySelector('#root').appendChild(next);
});

context.start();
