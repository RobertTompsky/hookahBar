export const TIME: string[] = Array.from({ length: 24 }, (_, index) => {
    const hour = index < 10 ? `0${index}` : `${index}`;
    return `${hour}:00`;
  });