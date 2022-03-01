export default function numberWithCommas(value: string | number) {
    value = value?.toString();
    value = value?.replace(/[^0-9]/g, '');
    var thousandsGroupRegex = value?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return thousandsGroupRegex
}