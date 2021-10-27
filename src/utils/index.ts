export const getUUID = (): string => {
    const timestamp = new Date().valueOf();
    const number = Math.random() * 100000;
    return timestamp.toString() + "_" + Math.floor(number);
};
