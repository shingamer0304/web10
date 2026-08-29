document.addEventListener('DOMContentLoaded', () => {

  // 1. Interactive Crosshair Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // 2. Terminal Easter Egg Command Line
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';

        // แสดงคำสั่งที่พิมพ์ลงหน้าจอ
        const cmdLine = document.createElement('div');
        cmdLine.textContent = `SHIN@SYS:~$ ${cmd}`;
        cmdLine.style.color = '#ffffff';
        termOutput.appendChild(cmdLine);

        // ประมวลผลคำสั่ง
        let responseText = '';
        switch (cmd) {
          case 'help':
            responseText = '> COMMANDS: status, clear, ping, secret, color';
            break;
          case 'status':
            responseText = '> ALL SYSTEMS NOMINAL. OPERATING AT 100% CAPACITY.';
            break;
          case 'ping':
            responseText = `> PONG! LATENCY: ${Math.floor(Math.random() * 15 + 5)}ms`;
            break;
          case 'secret':
            responseText = '> ACCESS GRANTED: "The best way to predict the future is to code it."';
            break;
          case 'color':
            document.documentElement.style.setProperty('--main-accent', '#ff0055');
            responseText = '> ACCENT COLOR OVERRIDDEN TO CRIMSON RED.';
            break;
          case 'clear':
            termOutput.innerHTML = '';
            return;
          default:
            responseText = `> UNKNOWN COMMAND: '${cmd}'. TYPE 'help' FOR AVAILABLE COMMANDS.`;
        }

        const resLine = document.createElement('div');
        resLine.textContent = responseText;
        termOutput.appendChild(resLine);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }
});
