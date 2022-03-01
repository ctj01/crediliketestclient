const onlyNums = (val: string | number) => val.toString().replace(/[^0-9]/g, "");

export default onlyNums;