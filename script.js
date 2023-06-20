let run = document.getElementById("run");

class BF {
  constructor(program) {
    this.program = program;
    this.valid_commands = ["+", "-", "<", ">", ".", ",", "[", "]"];
    this.arr = [0];
    this.ci = 0;
    this.user_input = [];
    this.loop_table = {};
    this.loop_stack = [];
    this.createLoopTable();
  }

  createLoopTable() {
    for (let ip = 0; ip < this.program.length; ip++) {
      let cmd = this.program[ip];
      if (cmd === "[") {
        this.loop_stack.push(ip);
      } else if (cmd === "]") {
        let loop_begin = this.loop_stack.pop();
        this.loop_table[loop_begin] = ip;
        this.loop_table[ip] = loop_begin;
      }
    }
  }

  execute() {
    let ip = 0;
    let output = "";
    while (ip < this.program.length) {
      let cmd = this.program[ip];

      if (this.valid_commands.includes(cmd)) {
        if (cmd === "+") {
          this.arr[this.ci]++;
          if (this.arr[this.ci] === 256) {
            this.arr[this.ci] = 0;
          }
        } else if (cmd === "-") {
          this.arr[this.ci]--;
          if (this.arr[this.ci] === -1) {
            this.arr[this.ci] = 255;
          }
        } else if (cmd === "<") {
          this.ci--;
        } else if (cmd === ">") {
          this.ci++;
          if (this.ci === this.arr.length) {
            this.arr.push(0);
          }
        } else if (cmd === ".") {
          output += String.fromCharCode(this.arr[this.ci]);
        } else if (cmd === ",") {
          return 0;
        } else if (cmd === "[") {
          if (this.arr[this.ci] === 0) {
            ip = this.loop_table[ip];
          }
        } else if (cmd === "]") {
          if (this.arr[this.ci] !== 0) {
            ip = this.loop_table[ip];
          }
        }
      }

      ip++;
    }

    return output;
  }
}

function runCode() {
  let program = document.getElementById("editor").value;
  let bfInstance = new BF(program);
  let output = bfInstance.execute();
  document.getElementById("terminal").value = output;
}

run.addEventListener("click", runCode);
