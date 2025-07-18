let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('.calc-btn');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if(e.target.innerHTML == '='){
            string = calculate(string);
            input.value = string;
        } else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        } else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0, string.length - 1);
            input.value = string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
        
    })
})

function calculate(exp){
    let nums = [];
    let opr = [];
    let num = "";

    for(i=0; i<exp.length; i++){
        let char = exp[i];

        if(!isNaN(char) || char === '.'){
            num += char;
        } else {
            nums.push(parseFloat(num));
            num = "";
            opr.push(char);
        }
    }
    if(num !== ""){
        nums.push(parseFloat(num));
    }

    //for handling operations
    for(let i=0; i<opr.length; i++){
        if(opr[i] === '*' || opr[i] === '/' || opr[i] === '%'){
            let res;
            switch(opr[i]){
                case '*': res = nums[i] * nums[i+1];
                break;
                case '/': res = nums[i] / nums[i+1];
                break;
                case '%': res = nums[i] % nums[i+1];
                break;
            }

            nums.splice(i, 2, res);
            opr.splice(i, 1);
            i--;
        }
    }

    let res = nums[0];
    for(let i=0; i<opr.length; i++){
        switch (opr[i]) {
            case '+':
                res += nums[i + 1];
                break;
            case '-':
                res -= nums[i + 1];
                break;
        }
    }
    return res;
}

const toggleBtn = document.getElementById('themeToggle');

// Apply saved theme (if using localStorage)
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.textContent = '☀️';
} else {
    toggleBtn.textContent = '🌙';
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Switch icon
    if (document.body.classList.contains('light-mode')) {
        toggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});

document.addEventListener("keydown", (e) => {
    const validKeys = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "+", "-", "*", "/", "%", ".", "Enter", "Backspace", "Delete"
    ];

    if (!validKeys.includes(e.key)) {
        e.preventDefault();
        return;
    }

    if (e.key === "Enter") {
        string = calculate(string);
        input.value = string;
    } else if (e.key === "Backspace") {
        string = string.slice(0, -1);
        input.value = string;
    } else if (e.key === "Delete") {
        string = "";
        input.value = string;
    } else {
        string += e.key;
        input.value = string;
    }
});
