(() => {
  const root = document.documentElement;

  const syncViewportHeight = () => {
    const height = Math.max(
      root.clientHeight || 0,
      window.innerHeight || 0,
      window.visualViewport?.height || 0
    );

    if (height > 0) {
      root.style.setProperty('--app-height', `${height}px`);
    }
  };

  syncViewportHeight();

  window.addEventListener('resize', syncViewportHeight, { passive: true });
  window.addEventListener('orientationchange', syncViewportHeight);

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', syncViewportHeight, { passive: true });
  }
})();
