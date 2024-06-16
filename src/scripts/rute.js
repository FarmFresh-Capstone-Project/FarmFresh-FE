import 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path === '/login.html') {
    import('../styles/style-log.css');
  } else if (path === '/registrasi.html') {
    import('../styles/style-reg.css');
  } else if (path === '/profile.html') {
    import('../styles/style-prof.css');
  } else if (path === '/cart.html') {
    import('../styles/dummy-style.css');
  } else if (path === '/checkout.html') {
    import('../styles/style-checkout.css');
  } else if (path === '/order.html') {
    import('../styles/style-ordr.css');
  } else {
    import('../styles/style.css');
  }
});
