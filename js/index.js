var Name = document.getElementById('bookMarkName');
var url = document.getElementById('bookMarkUrl');
var alert = document.querySelectorAll(".alert");

function clear() {
    Name.value = null;
    url.value = null;
}

var arr = [];
if (localStorage.getItem('bookmarksList') != null) {
    arr = JSON.parse(localStorage.getItem('bookmarksList'));
    displayBookMark(arr);
}


function addBookMark() {
    if(validateName()&&validateUrl()){
        var bookMark = {
            name: Name.value,
            Url: url.value,
        }
        arr.push(bookMark);
        localStorage.setItem("bookmarksList", JSON.stringify(arr));
        Name.classList.remove("is-valid")
        url.classList.remove("is-valid")
        displayBookMark(arr);
        clear();
    }
}

function displayBookMark(arr1) {
    var cartona = ``;
    for (var i = 0; i < arr1.length;i++ ) {
        cartona +=
        `
        <tr>
            <td class="p-2">${i+1}</td>
            <td class="p-2">${arr1[i].name}</td>
            <td class="p-2"><button class="btn btn-visit" onclick="visit(${i})">
                <i class="fa-solid fa-eye pe-2"></i>Visit</button>
            </td>
            <td class="p-2"><button class="btn btn-delete pe-2" onclick="deleteBookMark(${i})">
                <i class="fa-solid fa-trash-can pe-1"></i>Delete</button>
            </td>
        </tr>`
    }
    tableContent.innerHTML = cartona;
}

function deleteBookMark(index) {
    arr.splice(index, 1);
    localStorage.setItem('bookmarksList', JSON.stringify(arr));
    displayBookMark(arr);
}

function visit(index) {
    var Index = index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(arr[Index].Url)) {
        open(arr[Index].Url);
    }
    else {
        open(`https://${arr[Index].Url}`);
    }
}

function validateUrl(){
    var regex = /https?:\/\/(www\.)?[a-z0-9\-]+\.(com|org|net|gov|edu|io|co|co\.uk)(\/\S*)?/i;
    if(regex.test(url.value)){
        url.classList.add("is-valid");
        url.classList.remove("is-invalid");
        alert[1].classList.add("d-none");
        return true;
    }
    else{
        url.classList.remove("is-valid");
        url.classList.add("is-invalid");
        alert[1].classList.remove("d-none");
        return false;
    }
}

function validateName(){
    var regex = /^[a-z0-9-_][a-z0-9-_ ]{2,10}[a-z0-9-_]$/;
    if(regex.test(Name.value)){
        Name.classList.add("is-valid");
        Name.classList.remove("is-invalid");
        alert[0].classList.add("d-none");
        return true;
    }
    else{
        Name.classList.remove("is-valid");
        Name.classList.add("is-invalid");
        alert[0].classList.remove("d-none");
        return false;
    }
}