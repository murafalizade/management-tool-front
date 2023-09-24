export default class Helper{
    public static FormatNumber(value: number | string | null): string {
        if (value == null) {
            return "0";
        }
        let number = Number(value);
        return number.toFixed(2);
    }
}