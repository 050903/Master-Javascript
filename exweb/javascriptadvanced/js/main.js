// js/main.js

// Hàm chung để capture console.log output vào một div
function captureConsoleOutput(elementId) {
    const outputDiv = document.getElementById(elementId);
    if (!outputDiv) {
        console.error(`Output div with ID '${elementId}' not found.`);
        return;
    }
    outputDiv.innerHTML = ''; // Xóa nội dung cũ
    const originalLog = console.log;
    console.log = function(...args) {
        const p = document.createElement('p');
        p.textContent = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
        outputDiv.appendChild(p);
        originalLog.apply(console, args); // Vẫn log ra console thật
    };
    return () => { console.log = originalLog; }; // Trả về hàm để khôi phục console.log
}


// -------------------- VÍ DỤ 1.1: Kiểu dữ liệu & Biến --------------------
function runBasicVariablesExample() {
    const restoreConsole = captureConsoleOutput('basic-vars-output');

    var oldVar = "Tôi là var (scope hàm)";
    let newLet = "Tôi là let (scope khối)";
    const immutableConst = "Tôi là const (không thay đổi được)";

    let str = "Hello";         // String
    let num = 123;             // Number
    let bool = true;           // Boolean
    let n = null;              // Null
    let u = undefined;         // Undefined
    let sym = Symbol("id");    // Symbol
    let bigInt = 123n;         // BigInt

    let obj = { key: "value" }; // Object
    let arr = [1, 2, 3];        // Array (là một dạng của Object)

    console.log("oldVar:", oldVar);
    console.log("newLet:", newLet);
    console.log("immutableConst:", immutableConst);
    console.log("Kiểu của 'str':", typeof str);
    console.log("Giá trị của 'obj.key':", obj.key);
    console.log("Kiểu của 'arr':", typeof arr); // Output: object, vì Array là một dạng Object
    console.log("Array.isArray(arr):", Array.isArray(arr)); // Cách kiểm tra Array đúng

    restoreConsole(); // Khôi phục console.log
}

// -------------------- VÍ DỤ 1.2: Toán tử & Cấu trúc điều khiển --------------------
function runBasicOperatorsExample() {
    const restoreConsole = captureConsoleOutput('basic-ops-output');

    let a = 10, b = 5;
    let sum = a + b; // Toán tử số học
    let isEqual = (a === b); // Toán tử so sánh nghiêm ngặt

    console.log("a =", a, ", b =", b);
    console.log("Tổng a + b =", sum);
    console.log("a === b ?", isEqual);

    if (sum > 10 && isEqual === false) { // Toán tử logic
        console.log("Tổng lớn hơn 10 và a không bằng b. (Điều kiện IF)");
    } else if (sum === 15) {
        console.log("Tổng bằng 15. (Điều kiện ELSE IF)");
    } else {
        console.log("Điều kiện khác. (Điều kiện ELSE)");
    }

    console.log("--- Vòng lặp For ---");
    for (let i = 0; i < 3; i++) {
        console.log("Vòng lặp For:", i);
    }

    console.log("--- Vòng lặp While ---");
    let count = 0;
    while (count < 2) {
        console.log("Vòng lặp While:", count);
        count++;
    }

    restoreConsole();
}

// -------------------- VÍ DỤ 2.1: Định nghĩa Hàm --------------------
function runFunctionDefinitionExample() {
    const restoreConsole = captureConsoleOutput('function-def-output');

    function greet(name) {
        return "Xin chào, " + name + "!";
    }
    console.log(greet("Minh"));

    const sayHello = function(name) {
        return `Hello, ${name}!`;
    };
    console.log(sayHello("An"));

    const add = (a, b) => a + b;
    console.log("Tổng của 5 và 3 là:", add(5, 3));

    restoreConsole();
}

// -------------------- VÍ DỤ 2.2: Closure --------------------
function runClosureExample() {
    const restoreConsole = captureConsoleOutput('closure-output');

    function makeCounter() {
        let count = 0; // Biến này được "đóng gói" bởi closure
        return function() {
            count++;
            return count;
        };
    }

    const counter1 = makeCounter();
    console.log("Counter 1:", counter1()); // 1
    console.log("Counter 1:", counter1()); // 2

    const counter2 = makeCounter(); // Tạo một closure mới, count riêng biệt
    console.log("Counter 2:", counter2()); // 1 (riêng biệt với counter1)
    console.log("Counter 1:", counter1()); // 3 (counter1 vẫn tiếp tục)

    restoreConsole();
}

// -------------------- VÍ DỤ 2.3: Hàm bậc cao --------------------
function runHigherOrderFunctionsExample() {
    const restoreConsole = captureConsoleOutput('hof-output');

    const numbers = [1, 2, 3, 4, 5];
    console.log("Mảng gốc:", numbers);

    // map: tạo mảng mới bằng cách áp dụng hàm cho mỗi phần tử
    const doubled = numbers.map(num => num * 2);
    console.log("Doubled (x2 mỗi phần tử):", doubled);

    // filter: tạo mảng mới chứa các phần tử thỏa mãn điều kiện
    const evens = numbers.filter(num => num % 2 === 0);
    console.log("Evens (số chẵn):", evens);

    // reduce: áp dụng hàm tích lũy cho mỗi phần tử để giảm mảng về một giá trị duy nhất
    const sumAll = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log("Sum (tổng tất cả):", sumAll);

    restoreConsole();
}

// -------------------- VÍ DỤ 3.1: Đối tượng và Prototype --------------------
function runPrototypeExample() {
    const restoreConsole = captureConsoleOutput('prototype-output');

    const animal = {
        walk() {
            console.log("Đang đi...");
        }
    };

    const dog = {
        bark() {
            console.log("Gâu gâu!");
        }
    };

    // Gán prototype của 'dog' là 'animal'
    Object.setPrototypeOf(dog, animal);
    console.log("Dog đang đi:");
    dog.walk(); // Kế thừa từ animal
    console.log("Dog sủa:");
    dog.bark();

    console.log("Prototype của dog có phải animal không?", Object.getPrototypeOf(dog) === animal);

    restoreConsole();
}

// -------------------- VÍ DỤ 3.2: Class (ES6) --------------------
function runClassExample() {
    const restoreConsole = captureConsoleOutput('class-output');

    class Animal {
        constructor(name) {
            this.name = name;
        }
        speak() {
            console.log(`${this.name} tạo ra âm thanh.`);
        }
    }

    class Dog extends Animal {
        constructor(name, breed) {
            super(name); // Gọi constructor của lớp cha
            this.breed = breed;
        }
        // Ghi đè phương thức speak của lớp cha
        speak() {
            console.log(`${this.name} (${this.breed}) gâu gâu!`);
        }
    }

    const myAnimal = new Animal("Vật nuôi");
    myAnimal.speak();

    const myDog = new Dog("Buddy", "Golden Retriever");
    myDog.speak(); // "Buddy (Golden Retriever) gâu gâu!"

    console.log("myDog có phải là instance của Dog?", myDog instanceof Dog);
    console.log("myDog có phải là instance của Animal?", myDog instanceof Animal);

    restoreConsole();
}

// -------------------- VÍ DỤ 4.1: Callbacks --------------------
function runCallbacksExample() {
    const restoreConsole = captureConsoleOutput('callbacks-output');

    function fetchData(callback) {
        console.log("   (Đang giả lập tải dữ liệu... chờ 1 giây)");
        setTimeout(() => {
            const data = "Dữ liệu đã được tải.";
            callback(data);
        }, 1000); // Giả lập tải dữ liệu mất 1 giây
    }

    console.log("Bắt đầu tải dữ liệu...");
    fetchData(function(data) {
        console.log("Callback nhận được:", data);
    });
    console.log("Tiếp tục các tác vụ khác (không bị chặn bởi fetchData)...");

    restoreConsole();
}

// -------------------- VÍ DỤ 4.2: Promises & async/await --------------------
function runPromisesAsyncAwaitExample() {
    const restoreConsole = captureConsoleOutput('async-await-output');

    function getDataPromise() {
        console.log("   (Giả lập Promise... chờ 1.5 giây)");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true; // Đặt false để kiểm tra reject
                if (success) {
                    resolve("Dữ liệu đã được tải thành công từ Promise.");
                } else {
                    reject("Tải dữ liệu thất bại (Promise bị reject).");
                }
            }, 1500);
        });
    }

    console.log("--- Sử dụng Promise (.then/.catch) ---");
    getDataPromise()
        .then(data => console.log("Promise Resolved:", data))
        .catch(error => console.log("Promise Rejected:", error));

    console.log("\n--- Sử dụng async/await ---");
    async function loadData() {
        try {
            console.log("Đang chờ dữ liệu với async/await...");
            const result = await getDataPromise(); // Chờ Promise hoàn thành
            console.log("Async/Await Resolved:", result);
        } catch (error) {
            console.log("Async/Await Rejected (lỗi):", error);
        }
    }
    loadData();

    console.log("Các tác vụ khác vẫn chạy trong khi Promise và Async/Await đang chờ...");

    restoreConsole();
}


// -------------------- VÍ DỤ 5: Thao tác DOM & Xử lý sự kiện --------------------
// Mã cho phần này đã được nhúng trực tiếp trong HTML vì nó cần tương tác trực tiếp
// với các phần tử DOM đã được định nghĩa trong HTML.
// Tôi sẽ đảm bảo mã JS này được chạy khi DOM đã sẵn sàng.
document.addEventListener('DOMContentLoaded', () => {
    const domText = document.getElementById('dom-text');
    const changeBtn = document.getElementById('change-text-btn');
    const addBtn = document.getElementById('add-item-btn');
    const dynamicList = document.getElementById('dynamic-list');

    if (changeBtn) {
        changeBtn.addEventListener('click', () => {
            domText.textContent = "Văn bản đã được thay đổi bằng JavaScript!";
            domText.style.color = "blue";
            domText.style.fontWeight = "bold";
        });
    }

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const newItem = document.createElement('li');
            newItem.textContent = `Mục mới ${dynamicList.children.length + 1}`;
            dynamicList.appendChild(newItem);
        });
    }

    // -------------------- VÍ DỤ 6: Fetch API (dynamic button creation) --------------------
    const fetchBtn = document.createElement('button');
    fetchBtn.textContent = "Tải dữ liệu từ API (JSONPlaceholder)";
    document.getElementById('fetch-section').appendChild(fetchBtn);
    const fetchOutput = document.createElement('div');
    fetchOutput.className = "output";
    document.getElementById('fetch-section').appendChild(fetchOutput);

    fetchBtn.addEventListener('click', async () => {
        fetchOutput.textContent = "Đang tải dữ liệu...";
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            if (!response.ok) { // Kiểm tra nếu phản hồi không thành công (ví dụ: 404, 500)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const todo = await response.json(); // Chuyển đổi phản hồi thành JSON
            fetchOutput.textContent = `Dữ liệu từ API: Tiêu đề - "${todo.title}", Hoàn thành - ${todo.completed ? 'Có' : 'Không'}`;
            console.log("Fetch API data:", todo);
        } catch (error) {
            fetchOutput.textContent = `Lỗi khi tải dữ liệu: ${error.message}`;
            console.error("Fetch Error:", error);
        }
    });

    // -------------------- Smooth scrolling cho thanh điều hướng --------------------
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Chú ý về Modules (được giải thích trong HTML)
// Nếu muốn thực sự demo modules, bạn cần một file JS riêng (ví dụ mathUtils.js)
// và import nó vào đây với <script type="module" src="js/main.js"></script>
// Ví dụ:
/*
// js/mathUtils.js
export function multiply(a, b) {
    return a * b;
}
export const E = 2.718;

// Trong main.js (nếu là type="module")
// import { multiply, E } from './mathUtils.js';
// console.log("Kết quả nhân từ module:", multiply(5, E));
*/