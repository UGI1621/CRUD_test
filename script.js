// 전역 변수 생성
let input = document.getElementById("input");
let input_name = document.getElementById("name");
let input_birth = document.getElementById("birth");
let input_sex = document.getElementById("sex");
let list = document.getElementById("list");
let msg = document.getElementById("msg");
let search_input = document.getElementById("search_input");
let result = document.getElementById("result");
let search = document.getElementById("search")



// 새로고침 생략
input.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("upload clicked");
    acceptData();
});

search.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("search clicked");
    searchList();
});


// 회원 list
let cname
let cbirth
let csex

let search_list =[
    ["Tomas","981002","M"],
    ["Mike","991002","M"],
    ["Makers","971002","M"],
    ["Aile","961002","F"]
]


// 빈칸 방지
let acceptData = () =>{
    //경고 문구 생성
    if(input_birth.value == "" || input_name.value == "" || input_sex.value == ""){
        msg.innerHTML = "You Can't Upload with blank"
    }else{
    //경고 문구 초기화
        msg.innerHTML = ""
        cname = input_name.value;
        cbirth = input_birth.value;
        csex = input_sex.value;
        
        // 회원 list 에 push
        search_list.push([cname,cbirth,csex]);

        // push한 회원 정보 표시
        console.log(search_list)

        //Customer List upload
        createList();
    }
}


// Customer List 생성
let createList = () =>{
    list.innerHTML +=
    `
    <tr>
    <td class="name">${cname}</td>
    <td class="birth">${cbirth}</td>
    <td class="sex">${csex}</td>
    </tr>
    `

    // input value 초기화
    input_name.value = "";
    input_birth.value = "";
    input_sex.value = "";

}


// 데이터 삭제
let del = (e) =>{
    // search table tr 삭제
    e.parentElement.parentElement.remove();

    for(var i = 0; i < search_list.length; i ++){
            //이름과 검색어가 같을때    
        if(search_list[i][0] == search_input.value){
            
            // 회원 list 에서 해당 이름 있는 배열 삭제
            search_list.splice(i,1);
            
            // 삭제된 tr 의 td 표시
            console.log(list.getElementsByClassName("name")[i])
            
            //우측 customer List table tr 삭제
            list.getElementsByClassName("name")[i].parentElement.remove();
            
            i--

            //해당 method 실행 표시
            console.log("list item is del")
            break;
            }
    }
// 남아있는 회원 list 표시
console.log(search_list)
}



let edit = (e) =>{

    // 회원 정보 input value 로 이동
    input_name.value = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    input_birth.value = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
    input_sex.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();

    for(var i = 0; i < search_list.length; i ++){
        if(search_list[i][0] == search_input.value){
            search_list.splice(i,1);
            
            console.log(list.getElementsByClassName("name")[i])
            
            list.getElementsByClassName("name")[i].parentElement.remove();
            
            i--

            console.log("list item is del")
            break;
            }
}
}




let searchList = (e) =>{
    //search 결과 리셋
    reset();

    for(var i = 0; i <search_list.length ; i++){
        if(search_list[i][0] == search_input.value){
            // 검색 결과부분 생성
            result.innerHTML +=
                `
                <tr>
                <td id="name">${search_list[i][0]}</td>
                <td id="birth">${search_list[i][1]}</td>
                <td id="sex">${search_list[i][2]}</td>
                <td><button id="edit" onclick="edit(this);">Edit</button></td>
                <td><button id="del" onclick="del(this);">Del</button></td>
                </tr>
                `
        }
        //검색어 표시
    console.log(search_input.value)
    }
}


// search result 부분 리셋
let reset = (e) =>{
    result.innerHTML =
    `<tr>
    <th>NAME</th>
    <th>BIRTH</th>
    <th>SEX</th>
    <th colspan="2">Edit/Del</th>
    </tr>
    `
}

// 회원 list 표시
console.log(search_list)