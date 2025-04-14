let studentList = JSON.parse(localStorage.getItem("studentList")) || [
    {
        id: 1,
        fullname: 'Trần Minh Cường',
        stuId: 'SV001',
        email: 'cuongtm@gmail.com',
        _class: 'HN_ENG_KS24A',
    },
];

renderList = function(stuList) {
    // console.log(stuList)
    let html = "";
    stuList.forEach((stu) => {
        html += `<tr class = "">
                    <td>${stu.fullname}</td>
                    <td>${stu.stuId}</td>
                    <td>${stu.email}</td>
                    <td>${stu._class}</td>
                    <td class= "d-flex justify-content-between"><button class="btn btn-success edit-btn" data-id="${stu.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button">Sửa</button><button class="btn btn-danger del-btn" data-id="${stu.id}">Xóa</button></td>
                </tr>`
    });
    document.getElementById("table-body").innerHTML = html;
};

renderList(studentList);

let mistake = "";
addStu = function() {
    mistake = "";
    document.getElementById("nameMistake").innerHTML = "";
    document.getElementById("idMistake").innerHTML = "";
    document.getElementById("emailMistake").innerHTML = "";
    document.getElementById("classMistake").innerHTML = "";

    let $fullname = document.getElementById("fullname").value;
    let $stuId = document.getElementById("stuId").value;
    let $email = document.getElementById("email").value;
    let $class = document.getElementById("class").value;

    if ($fullname === "") {
        mistake = "Họ tên không được bỏ trống";
        document.getElementById("nameMistake").innerHTML = mistake;
        return;
    }
    if ($stuId === "") {
        mistake = "Mã số sinh viên không được bỏ trống";
        document.getElementById("idMistake").innerHTML = mistake;
        return;
    }
    if ($email === "") {
        mistake = "Invalid email";
        document.getElementById("emailMistake").innerHTML = mistake;
        return;
    }
    if ($class === "") {
        mistake = "Lớp không được bỏ trống";
        document.getElementById("classMistake").innerHTML = mistake;
        return;
    }

    studentList.push({
        id: studentList.length + 1,
        fullname: $fullname,
        stuId: $stuId,
        email: $email,
        _class: $class,
    });
    document.getElementById("fullname").value = "";    
    document.getElementById("stuId").value = "";
    document.getElementById("email").value = "";
    document.getElementById("class").value = "";

    renderList(studentList);
    localStorage.setItem("studentList", JSON.stringify(studentList));
};

document.getElementById("table-body").addEventListener("click", function(event) {
    // if(confirm("Bạn có chắc muốn xóa? ", event.target.classList.contains("del-btn"))) {
    if(event.target.classList.contains("del-btn")) {
        if(confirm("Bạn có chắc muốn xóa? ")) {
            let id = +(event.target.getAttribute("data-id"));
            studentList = studentList.filter(student => student.id !== id);
            renderList(studentList);
            localStorage.setItem("studentList", JSON.stringify(studentList));
        }
    }
});

document.getElementById("table-body").addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-btn")) {
        let id = +(event.target.getAttribute("data-id"));
        let found = studentList.find(student => student.id === id);
        if (found) {
            document.getElementById("edit-fullname").value = found.fullname;
            document.getElementById("edit-stuId").value = found.stuId;
            document.getElementById("edit-email").value = found.email;
            document.getElementById("edit-class").value = found._class;

            document.getElementById("save-change-btn").setAttribute("data-id", id);
        }
    }
});

function saveChange() {
    let editId = +document.getElementById("save-change-btn").getAttribute("data-id");
    let found = studentList.find(student => student.id === editId);
    if(found) {
        let $fullname = document.getElementById("edit-fullname").value;
        let $stuId = document.getElementById("edit-stuId").value;
        let $email = document.getElementById("edit-email").value;
        let $class = document.getElementById("edit-class").value;

        found.fullname = $fullname;
        found.stuId = $stuId;
        found.email = $email;
        found._class = $class;

        renderList(studentList);
        localStorage.setItem("studentList", JSON.stringify(studentList));
    }
}

document.getElementById("nameSearch").addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        let nameSearch = document.getElementById("nameSearch").value;
        let filterList = studentList.filter(student => student.fullname.toLowerCase().includes(nameSearch));
        renderList(filterList);
    }
});

