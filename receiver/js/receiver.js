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
    let timestampInterval = null;
    return {
      name: 'Unsplash',
      onMount: () => {
        let i = Math.floor(Math.random() * 5000);
        $root.innerHTML = `
          <div>
            <img />
            <div class="unsplash-timestamp"></div>
          </div>
        `;

        $root.querySelector('img').src = `https://source.unsplash.com/random/1280x720?sig=${i}`;
        $root.querySelector('.unsplash-timestamp').textContent = moment().format('HH:mm');

        changeInterval = window.setInterval(() => {
          $root.querySelector('img').src = `https://source.unsplash.com/random/1280x720?sig=${++i}`;
        }, 15 * 60 * 1000);

        timestampInterval = window.setInterval(() => {
          $root.querySelector('.unsplash-timestamp').textContent = moment().format('HH:mm');
        }, 60 * 1000);
      },
      onUnmount: () => {
        window.clearInterval(changeInterval);
        window.clearInterval(timestampInterval);
        $root.innerHTML = '';
      }
    };
  })()
};

const state = {
  dashboard: dashboards.UNSPLASH
};

dashboards.UNSPLASH.onMount();

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

const isChangeDashboardMessage = event => event && event.data && event.data.type === 'CHANGE_DASHARY';

context.addCustomMessageListener(MESSAGE_CHANNEL, function (customEvent) {
  if (isChangeDashboardMessage(customEvent)) {
    changeDashboard(customEvent.data.value);
  }
});

const options = new cast.framework.CastReceiverOptions();
options.disableIdleTimeout = true;
context.start(options);
