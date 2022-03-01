export const validDateSelected = (date: number) => {
    let today = new Date();
    today.setFullYear(today.getFullYear() - date);
    return today;
  };

  export function calcAge(dateString: string) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
  }