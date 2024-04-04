function printfunc() {
    return new Promise(resolve => {
      console.log("b");
      setTimeout(() => {
        console.log("d");
        resolve(); 
      }, 1000);
      console.log("c");
    });
  }
  
  async function asyncall() {
    console.log("a");
    await printfunc();
    console.log("e");
  }
  
  asyncall();
  