export const checkOnlineStatus = async (setIsOffline: Function) => {
  try {
    const online = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (online.status >= 200 && online.status < 300) {
      setIsOffline(false);
    } else {
      setIsOffline(true);
    }
  } catch (err) {
    setIsOffline(true);
  }
};
