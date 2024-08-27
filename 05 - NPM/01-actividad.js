const obj = {};

for (let i = 0; i < 10000; i++) {
    const num = Math.floor(Math.random() * 20) + 1;
    if (!obj[num]) {
        obj[num] = 1
    }
    else {
        obj[num]++;
    }
}