export function mountHeroWaveGrid(canvas: HTMLCanvasElement): () => void {
  let cancelled = false;
  let cleanup = () => {};

  void import('./hero-wave-grid-runtime')
    .then(({ initializeHeroWaveGrid }) => {
      if (cancelled) return;
      cleanup = initializeHeroWaveGrid(canvas);
    })
    .catch((error: unknown) => {
      console.error('Unable to load the interactive hero background.', error);
    });

  return () => {
    cancelled = true;
    cleanup();
  };
}
