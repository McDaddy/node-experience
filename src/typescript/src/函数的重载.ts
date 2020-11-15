function toArray(value: number): number[]
function toArray(value: string): string[]
function toArray(value: number | string) {
    if (typeof value == 'string') {
        return value.split('');
    } else {
        return value.toString().split('').map(item => Number(item));
    }
}
console.log(toArray(123)); // 根据传入不同类型的数据 返回不同的结果
toArray('123');