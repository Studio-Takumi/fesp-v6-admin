export const formatDate = (date: Date, format: string) => {
    let g = '';
    let ggg = '';
    let e = 0;
    if (new Date(2019, 5, 1) <= date) {
        g = 'R';
        ggg = '令和';
        e = date.getFullYear() - 2019 + 1;
    } else if (new Date(1989, 1, 8) <= date) {
        g = 'H';
        ggg = '平成';
        e = date.getFullYear() - 1989 + 1;
    } else if (new Date(1926, 12, 25) <= date) {
        g = 'S';
        ggg = '昭和';
        e = date.getFullYear() - 1926 + 1;
    }
    let aaa = '';
    let ddd = '';
    let dddd = '';
    switch (date.getDay()) {
        case 0:
            aaa = '日';
            ddd = 'Sun';
            dddd = 'Sunday';
            break;
        case 1:
            aaa = '月';
            ddd = 'Mon';
            dddd = 'Monday';
            break;
        case 2:
            aaa = '火';
            ddd = 'Tue';
            dddd = 'Tuesday';
            break;
        case 3:
            aaa = '水';
            ddd = 'Wed';
            dddd = 'Wednesday';
            break;
        case 4:
            ((aaa = '木'), (ddd = 'Thu'));
            dddd = 'Thursday';
            break;
        case 5:
            aaa = '金';
            ddd = 'Fri';
            dddd = 'Friday';
            break;
        case 6:
            aaa = '土';
            ddd = 'Sat';
            dddd = 'Saturday';
            break;
    }
    return format
        .replace('YYYY', String(date.getFullYear()))
        .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
        .replace('M', String(date.getMonth() + 1))
        .replace('DD', String(date.getDate()).padStart(2, '0'))
        .replace('D', String(date.getDate()))
        .replace('aaa', aaa)
        .replace('dddd', dddd)
        .replace('ddd', ddd)
        .replace('HH', String(date.getHours()).padStart(2, '0'))
        .replace('H', String(date.getHours()))
        .replace('mm', String(date.getMinutes()).padStart(2, '0'))
        .replace('m', String(date.getMinutes()))
        .replace('ss', String(date.getSeconds()).padStart(2, '0'))
        .replace('s', String(date.getSeconds()))
        .replace('SSS', String(date.getMilliseconds()).padStart(3, '0'))
        .replace('ggg', ggg)
        .replace('g', g)
        .replace('ee', String(e).padStart(2, '0'))
        .replace('e', String(e));
};
