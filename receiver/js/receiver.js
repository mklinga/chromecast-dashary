/* global cast, moment */
const context = cast.framework.CastReceiverContext.getInstance();
const MESSAGE_CHANNEL = 'urn:x-cast:website.suspicious.cast.info';
const $root = document.getElementById('root');

const dashboards = {
  KITTY: {
    name: 'Kitty',
    onMount: () => {
      $root.innerHTML = '<img src="http://placekitten.com/1280/720" />';
    },
    onUnmount: () => {
      $root.innerHTML = '';
    }
  },
  UNSPLASH: (() => {
    let changeInterval = null;
    return {
      name: 'Unsplash',
      onMount: () => {
        let i = Math.floor(Math.random() * 5000);
        $root.innerHTML = `
          <div>
            <img />
            <div class="unsplash-statusbar"></div>
          </div>
        `;

        $root.querySelector('img').src = `https://source.unsplash.com/random/1280x720?sig=${i}`;
        $root.querySelector('.unsplash-statusbar').textContent = moment().format('D.M. HH:mm');

        changeInterval = window.setInterval(() => {
          $root.querySelector('img').src = `https://source.unsplash.com/random/1280x720?sig=${++i}`;
          $root.querySelector('.unsplash-statusbar').textContent = moment().format('D.M. HH:mm');
        }, 15 * 60 * 1000);
      },
      onUnmount: () => {
        window.clearInterval(changeInterval);
        $root.innerHTML = '';
      }
    };
  })()
};

const state = {
  dashboard: dashboards.UNSPLASH
};

dashboards.UNSPLASH.onMount();

const isChangeDashboardMessage = event => event && event.data && event.data.type === 'CHANGE_DASHARY';

const changeDashboard = nextDashboard => {
  if (!dashboards[nextDashboard]) {
    return;
  }

  if (state.dashboard.onUnmount) {
    state.dashboard.onUnmount();
  }
  state.dashboard = dashboards[nextDashboard];

  if (state.dashboard.onMount) {
    state.dashboard.onMount();
  }
};

context.addCustomMessageListener(MESSAGE_CHANNEL, function (customEvent) {
  if (isChangeDashboardMessage(customEvent)) {
    changeDashboard(customEvent.data.value);
    return;
  }

  const next = document.createElement('p');
  next.textContent = JSON.stringify(customEvent);
  document.querySelector('#root').appendChild(next);
});

context.start();
