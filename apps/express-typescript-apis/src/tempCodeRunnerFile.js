Promise.all([function1(), function2()])
.then(values=> console.log(values[0], values[1]));