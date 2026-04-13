function getRandomDelay(min = 500, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function withDelay<T extends (...args: any[]) => any>(handler: T) {
  return async (...args: Parameters<T>) => {
    await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

    return handler(...args);
  };
}
