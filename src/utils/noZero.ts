const noZero = (val: string | number) => val.toString().replace(/^[0]/g, "");

export default noZero;