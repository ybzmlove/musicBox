//초기 선택자 구성
const frame = document.querySelector("section");
const articleLists = frame.querySelectorAll("article");
const audio = frame.querySelectorAll("audio");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

console.log(articleLists);
console.log(audio);

const angle = 45;
const len = articleLists.length - 1;
const photoArr = [
    "album_01.jpg",
    "album_02.jpg",
    "album_03.jpg",
    "album_04.jpg",
    "album_05.jpg",
    "album_06.jpg",
    "album_07.jpg",
    "album_08.jpg",
];

let i = 0;
for(let v of articleLists){
    console.log(v);  //article의 요소를 순차적으로 접근
    let $photo = v.querySelector(".photo");  //순차적으로 접근하는 과정에서 각 article 요소 내의 .photo클래스명을 갖고 있는 요소로 접근

    v.style.transform = `rotate(${(angle*i) + 45}deg) translate(-120%, -120%)`;
    $photo.style.backgroundImage = `url(./img/${photoArr[i]})`;
    i++;  //i = 0 ~ 7;

    let pauseBtn = v.querySelector(".pause");
    let playBtn = v.querySelector(".play");
    let replayBtn = v.querySelector(".replay");

    //play 버튼 클릭시
    playBtn.addEventListener("click", (e) => {
        let $show = e.currentTarget.closest("article").classList.contains("show");
        //classList.contains("show") ==> [jQuery] hasClass("클래스명")
        console.log($show);

        if($show){
            e.currentTarget.closest("article").querySelector(".photo").classList.add("on");
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });

    //pause 버튼 클릭시
    pauseBtn.addEventListener("click", function(e){
        let $show = e.currentTarget.closest("article").classList.contains("show");
        if($show){
            e.currentTarget.closest("article").querySelector(".photo").classList.remove("on");
            e.currentTarget.closest("article").querySelector("audio").pause();
        }
    });

    //replay 버튼 클릭시
    replayBtn.addEventListener("click", function(e){
        let $show = e.currentTarget.closest("article").classList.contains("show");
        if($show){
            e.currentTarget.closest("article").querySelector(".photo").classList.add("on");
            e.currentTarget.closest("article").querySelector("audio").load();
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });
}

let num = 0; //로딩하면서 12시 방향에 위치한 article의 인덱스 번호 #muz_01
let active = 0; //최초의 인덱스번호

//화면상의 중심(12시 방향의 article)에 들어왔을 때 show라는 클래스를 부여한다.
const addShow = (index, articleLists) => {
    for (let elm of articleLists){
        elm.classList.remove("show");
    }
    articleLists[index].classList.add("show");
}

//현재 음악이 흐르고, 원이 회전되고 있다면, 이전 버튼과 다음 버튼의 클릭을 멈추게 한다.
const initial = () => {
    for (let elm of audio){
        elm.pause();
        elm.load(); //멈추고 처음으로 돌아가게 한다.
        elm.closest("article").querySelector(".photo").classList.remove("on");
    }
}

//이전 버튼 클릭시 => 시계방향으로 이동한다.
prevBtn.addEventListener("click", () => {
    initial();

    num++;
    frame.style.transform = `rotate(${angle * num}deg) translate(-50%, -50%)`;
    //이젠에 접근되어지는 인덱스번호를 계산하여 인덱스 번호를 전달하고자 구조를 구성
    //active = 0 -> 7 -> 6 -> 5 .. => 1 -> 7 
    if (active == 0){
        active = len;
    }else{
        active--; 
    }
    addShow(active, articleLists);
});

//다음 버튼 클릭시 => 반시계방향으로 이동한다.
nextBtn.addEventListener("click", () => {
    initial();

    num--;
    frame.style.transform = `rotate(${angle * num}deg) translate(-50%, -50%)`;
    //다음에 접근되어지는 인덱스번호를 계산하여 인덱스 번호를 전달하고자 구조를 구성
    //active = 0-> 1 -> 2 -> 3 .. => 7 -> 8 (x -> 0)
    if (active == len){
        active = 0;
    }else{
        active++; 
    }
    addShow(active, articleLists);
});








