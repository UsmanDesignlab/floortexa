let pending = 0;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener(pending));
}

export function subscribeLoading(listener) {
  listeners.add(listener);
  listener(pending);
  return () => listeners.delete(listener);
}

export function beginLoading() {
  pending += 1;
  emit();
}

export function endLoading() {
  pending = Math.max(0, pending - 1);
  emit();
}

export function trackPromise(promise) {
  beginLoading();
  return Promise.resolve(promise).finally(() => {
    endLoading();
  });
}
