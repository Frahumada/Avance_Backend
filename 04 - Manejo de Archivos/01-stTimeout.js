console.log("Primer console.log");
setTimeout (()=> {
    console.log("Timeout dentro del mismo");
}, 3000)

console.log("Segundo console.log");



console.log("Primer console.log");
setInterval (()=> {
    console.log("Timeout dentro del mismo xSegundo");
}, 1000)

console.log("Segundo console.log");