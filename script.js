const contentData = {
    he: {
        targetPrefix: "לכבוד: ",
        lblDate: "מתי?",
        lblTime: "שעה",
        lblAddress: "היכן?",
        lblContact: "לפרטים נוספים - נציגות הוועד",
        lawyer: {
            title: "הזמנה לכנס מינוי עורך דין",
            body: "דיירים יקרים, אנו עומדים בפני רגע מכריע. אנו מתכבדים להזמינכם לאסיפה חשובה לבחירת הייצוג המשפטי שילווה אותנו בפרויקט.",
            defaultDate: "יום ראשון, 07/12/2025",
            defaultTime: "18:30 (נא לדייק)",
            defaultAddress: "מרכז רחל, קומה 2 (רח' צפניה 10, אשקלון)",
            programTitle: "על סדר היום",
            program: "סקירת תהליך המינוי ושקיפות ההליך.\nהיכרות עם המועמדים הסופיים לייצוג.\nפאנל שאלות ותשובות פתוח.\nהצבעה ומינוי עורך הדין בפועל."
        },
        assembly: {
            title: "הזמנה לאסיפת דיירים",
            body: "שלום רב, אנו שמחים להזמינכם למפגש עדכון והתקדמות בנוגע לפרויקט ההתחדשות העירונית בבנייננו.",
            defaultDate: "19.05.2024",
            defaultTime: "18:00 בדיוק",
            defaultAddress: "רח' ההסתדרות 7, אשקלון",
            programTitle: "על סדר היום",
            program: "עדכון סטטוס תכנוני - מתחם פינוי בינוי.\nהיכרות עם המנהלת: א.ע דיירים מתחדשים.\nבחירת ומינוי נציגות דיירים מובילה.\nקביעת סמכויות והגדרת יעדים."
        }
    },
    ru: {
        targetPrefix: "Уважаемые жильцы: ",
        lblDate: "Дата",
        lblTime: "Время",
        lblAddress: "Место",
        lblContact: "Контакты комитета",
        lawyer: {
            title: "Собрание: Выбор Адвоката",
            body: "Уважаемые собственники, приглашаем вас на важное собрание для выбора юридического представителя, который защитит наши права.",
            defaultDate: "Воскресенье, 07/12/2025",
            defaultTime: "18:30",
            defaultAddress: "Центр Рахель, 2-й этаж (Ул. Цфания 10)",
            programTitle: "Повестка дня",
            program: "Обзор процесса назначения адвоката.\nЗнакомство с кандидатами.\nВопросы и ответы.\nГолосование и назначение представителя."
        },
        assembly: {
            title: "Общее собрание жильцов",
            body: "Мы рады пригласить вас на встречу, посвященную обновлению нашего дома. Ваше присутствие важно для успеха проекта.",
            defaultDate: "19.05.2024",
            defaultTime: "18:00",
            defaultAddress: "Ул. Ха-Гистадрут 7, Ашкелон",
            programTitle: "В программе",
            program: "Статус проекта реновации (Пинуй-Бинуй).\nЗнакомство с компанией 'А.Е. Renewing Tenants'.\nВыбор представителей жильцов.\nОпределение полномочий и целей."
        }
    }
};

// --- ניהול נציגים ---
let committeeMembers = JSON.parse(localStorage.getItem('committeeMembers')) || [];

function addMember() {
    const name = document.getElementById('newMemberName').value;
    const phone = document.getElementById('newMemberPhone').value;
    if(name && phone){
        committeeMembers.push({name, phone});
        saveAndRenderMembers();
        document.getElementById('newMemberName').value = '';
        document.getElementById('newMemberPhone').value = '';
    }
}

function removeMember(index){
    committeeMembers.splice(index, 1);
    saveAndRenderMembers();
}

function saveAndRenderMembers(){
    localStorage.setItem('committeeMembers', JSON.stringify(committeeMembers));
    renderMembersEditor();
    updatePreview();
}

function renderMembersEditor(){
    const list = document.getElementById('membersListContainer');
    list.innerHTML = '';
    committeeMembers.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'committee-item';
        div.innerHTML = `<span>${m.name}</span>
                             <button class="btn-remove" onclick="removeMember(${i})">✕</button>`;
        list.appendChild(div);
    });
}

// --- לוגיקה ראשית ---
function applyTemplate(){
    const lang = document.getElementById('langSelect').value;
    const eventType = document.getElementById('eventSelect').value;
    const page = document.getElementById('page');
    const data = contentData[lang][eventType];
    const labels = contentData[lang];

    // כיוון שפה
    if(lang === 'ru'){
        document.documentElement.setAttribute('dir', 'ltr');
        page.classList.add('lang-ru');
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
        page.classList.remove('lang-ru');
    }

    document.getElementById('inTitle').value = data.title;
    document.getElementById('inBody').value = data.body;
    document.getElementById('inProgramTitle').value = data.programTitle;
    document.getElementById('inProgram').value = data.program;

    document.getElementById('inDate').value = data.defaultDate;
    document.getElementById('inTime').value = data.defaultTime;
    document.getElementById('inAddress').value = data.defaultAddress;

    document.getElementById('lblDate').innerText = labels.lblDate;
    document.getElementById('lblTime').innerText = labels.lblTime;
    document.getElementById('lblAddress').innerText = labels.lblAddress;
    document.getElementById('lblContact').innerText = labels.lblContact;

    updatePreview();
}

function updatePreview(){
    document.getElementById('outTitle').innerText = document.getElementById('inTitle').value;
    document.getElementById('outBody').innerText = document.getElementById('inBody').value;
    document.getElementById('outProgramTitle').innerText = document.getElementById('inProgramTitle').value;

    document.getElementById('outDate').innerText = document.getElementById('inDate').value;
    document.getElementById('outTime').innerText = document.getElementById('inTime').value;
    document.getElementById('outAddress').innerText = document.getElementById('inAddress').value;

    const targetVal = document.getElementById('inTargetAddress').value;
    const targetBanner = document.getElementById('targetBanner');
    const lang = document.getElementById('langSelect').value;

    if(targetVal.trim() !== ""){
        targetBanner.style.display = "table";
        targetBanner.innerText = contentData[lang].targetPrefix + targetVal;
    } else {
        targetBanner.style.display = "none";
    }

    const list = document.getElementById('outProgram');
    list.innerHTML = '';
    const lines = document.getElementById('inProgram').value.split('\n');
    lines.forEach(line => {
        if(line.trim()){
            const li = document.createElement('li');
            li.innerText = line;
            list.appendChild(li);
        }
    });

    const committeeContainer = document.getElementById('outCommittee');
    committeeContainer.innerHTML = '';
    committeeMembers.forEach(m => {
        const badge = document.createElement('div');
        badge.className = 'member-badge';
        badge.innerText = `${m.name} | ${m.phone}`;
        committeeContainer.appendChild(badge);
    });
}

function updateFormat(){
    const selectedType = document.querySelector('input[name="fmt"]:checked').value;
    const page = document.getElementById('page');
    page.classList.remove('type-invite', 'type-flyer', 'type-sign');
    page.classList.add(selectedType);
}

// --- ניהול מובייל ---
const btnGenerate = document.getElementById('btnGenerate');
const btnMobileSave = document.getElementById('btnMobileSave');
const previewArea = document.getElementById('previewArea');
const printBtnDesktop = document.querySelector('.print-btn');

function isMobile() {
    return window.innerWidth < 800;
}

function setupMobileView() {
    const controls = document.querySelector('.mobile-controls');

    if (isMobile()) {
        // מצב מובייל
        previewArea.style.display = 'none';
        controls.style.display = 'block';
        printBtnDesktop.style.display = 'none'; // מסתירים כפתור דסקטופ

        if (btnGenerate) {
            btnGenerate.onclick = function() {
                updatePreview();
                previewArea.style.display = 'flex'; // מציגים תצוגה
                btnMobileSave.style.display = 'block'; // מציגים כפתור שמירה
                // גלילה למטה
                previewArea.scrollIntoView({ behavior: 'smooth' });
            };
        }

        if (btnMobileSave) {
            btnMobileSave.onclick = function() {
                window.print();
            };
        }

    } else {
        // מצב דסקטופ
        previewArea.style.display = 'flex';
        controls.style.display = 'none';
        printBtnDesktop.style.display = 'block';
    }
}

// האזנה לשינויים
document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', updatePreview);
});

window.addEventListener('resize', setupMobileView);

// אתחול
setupMobileView();
renderMembersEditor();
applyTemplate();
