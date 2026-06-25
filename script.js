/* ========================= */
/* 1. ĐẾM NGÀY YÊU NHAU      */
/* ========================= */
const startDate = new Date(2025, 11, 25); // tháng 11 = Tháng 12
const endDate = new Date(2026, 5, 25);   // tháng 5 = Tháng 6

const diffDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
document.getElementById("loveDays").innerHTML = `❤️ Đã bên nhau ${diffDays} ngày òi ❤️`;


/* ========================= */
/* 2. HIỆU ỨNG SPOTLIGHT     */
/* ========================= */
const spotlight = document.querySelector(".spotlight");
document.addEventListener("mousemove", (e) => {
    spotlight.style.left = e.clientX + "px";
    spotlight.style.top = e.clientY + "px";
});


/* ========================= */
/* 3. NÚT BẮT ĐẦU (ĐÃ SỬA)   */
/* ========================= */
document.getElementById("startBtn").addEventListener("click", () => {
    // Ưu tiên chuyển cảnh ngay lập tức để nút không bị kẹt
    document.getElementById("intro").style.display = "none";
    document.getElementById("gallery").classList.add("show");
    
    // Đợi 1.5s cho ảnh bay ra xong thì mới hiện nút mở thư
    setTimeout(() => {
        document.getElementById("openLetterBtn").style.display = "block";
    }, 2500);

    // Phát nhạc độc lập, nếu lỗi (do trình duyệt) cũng không làm kẹt nút
    const music = document.getElementById("bgMusic");
    music.volume = 0.5;
    let playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Chưa thể tự động phát nhạc: ", error);
        });
    }
});


/* ========================= */
/* 4. HIỆU ỨNG ẢNH 3D        */
/* ========================= */
document.querySelectorAll(".card").forEach(card => {
    const img = card.querySelector("img");

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        
        // Tính vị trí chuột từ -0.5 đến 0.5 để tìm tâm card
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Góc nghiêng tối đa (Nghiêng ra sau và xoay theo hướng chuột)
        const maxRotate = 25; 
        const rotateY = x * maxRotate;
        const rotateX = -y * maxRotate; // Dấu trừ giúp card ngả ra sau đúng hướng

        // Cập nhật vị trí luồng sáng Glare trong CSS
        card.style.setProperty('--grad-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--grad-y', `${(y + 0.5) * 100}%`);

        // Áp dụng hiệu ứng lên Card (Lùi nhẹ ra sau tựa không gian 3D)
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.05)`;
        
        // Đẩy bức ảnh thụt sâu vào trong một chút tạo chiều sâu vật lý
        if(img) {
            img.style.transform = `translateZ(20px) scale(1.1)`;
        }
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`;
        if(img) {
            img.style.transform = `translateZ(0px) scale(1)`;
        }
    });
});


/* ========================= */
/* 5. NỘI DUNG TÂM THƯ       */
/* ========================= */
const letterText = `Gửi ghan nhỏ nhó,

Thời gian trôi nhanh ghee, chớp mắt đã 6 tháng tụi mình bám nhau ròi.
Cảm ơn ghan đã đến và mang lại nhiều niềm vui, cảm giác an toàn và nhiều kỉ niệmm.
Mong rằng tụi mình sẽ còn đón thêm nhiều lần kỷ niệm nữa nhoo bé!

Yêu hânn nhìu ❤️`;

const typewriter = document.getElementById("typewriter");
let currentIndex = 0;

function startTyping() {
    typewriter.textContent = "";
    currentIndex = 0;

    const typing = setInterval(() => {
        if (currentIndex < letterText.length) {
            typewriter.textContent += letterText.charAt(currentIndex);
            currentIndex++;
        } else {
            clearInterval(typing);
        }
    }, 40);
}


/* ========================= */
/* 6. HIỆU ỨNG LỄ HỘI        */
/* ========================= */
function triggerCelebration() {
    const container = document.getElementById("effects-container");
    container.style.display = "block";

    // Tạo Đèn Lấp Lánh
    for (let i = 0; i < 15; i++) {
        const light = document.createElement("div");
        light.className = "light";
        light.style.left = Math.random() * 100 + "vw";
        light.style.top = Math.random() * 100 + "vh";
        light.style.animationDelay = Math.random() * 2 + "s";
        container.appendChild(light);
    }

    // Tạo Hoa Rơi Liên Tục
    setInterval(() => {
        const flower = document.createElement("div");
        flower.innerHTML = ["🌸", "🌹", "✨", "💖"][Math.floor(Math.random() * 4)];
        flower.className = "flower";
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.fontSize = Math.random() * 15 + 15 + "px"; 
        flower.style.animation = `fallDown ${Math.random() * 3 + 4}s linear forwards`;
        container.appendChild(flower);
        setTimeout(() => flower.remove(), 7000); 
    }, 400);

    // Tạo Bong Bóng Bay Lên Liên Tục
    setInterval(() => {
        const balloon = document.createElement("div");
        balloon.innerHTML = "🎈";
        balloon.className = "balloon";
        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.fontSize = Math.random() * 20 + 25 + "px";
        balloon.style.animation = `floatUp ${Math.random() * 4 + 5}s linear forwards`;
        container.appendChild(balloon);
        setTimeout(() => balloon.remove(), 9000);
    }, 800);

    // Tạo Pháo Bông Nổ
    function createFirework(x, y) {
        const colors = ["#ff0040", "#ffaa00", "#00ffaa", "#0088ff", "#ff00ff"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div");
            particle.className = "firework-particle";
            particle.style.background = color;
            particle.style.left = x + "px";
            particle.style.top = y + "px";
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            particle.style.setProperty('--dx', Math.cos(angle) * distance + "px");
            particle.style.setProperty('--dy', Math.sin(angle) * distance + "px");
            
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Tự động nổ pháo bông ngẫu nhiên mỗi 1.5 giây
    setInterval(() => {
        const rx = Math.random() * window.innerWidth;
        const ry = Math.random() * (window.innerHeight / 2); 
        createFirework(rx, ry);
    }, 1500);
}


/* ========================= */
/* 7. MỞ THƯ                 */
/* ========================= */
function showLetter() {
    const section = document.getElementById("letterSection");
    const envelope = document.querySelector(".envelope");

    section.classList.add("show");

    setTimeout(() => {
        envelope.classList.add("open");
        triggerCelebration(); 
        startTyping();
    }, 1200);
}

document.getElementById("openLetterBtn").addEventListener("click", () => {
    showLetter();
});
/* ========================================================== */
/* XỬ LÝ SỰ KIỆN ĐÓNG BỨC THƯ (Thêm vào cuối file)            */
/* ========================================================== */
document.getElementById("closeLetterBtn").addEventListener("click", () => {
    const section = document.getElementById("letterSection");
    const envelope = document.querySelector(".envelope");
    const container = document.getElementById("effects-container");

    // Ẩn bức thư đi
    section.classList.remove("show");
    envelope.classList.remove("open");
    
    // Tắt các hiệu ứng pháo hoa, hoa rơi để không bị lag máy khi xem ảnh
    container.style.display = "none";
    container.innerHTML = ""; // Dọn sạch các hạt thừa
});