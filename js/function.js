//썸네일 링크 요소 선택
const $thmbs = document.querySelectorAll('.thmb>a');
//이미지가 표시될 화면 선택
const $screen = document.getElementById('screen');

// 이전 버튼과 다음 버튼의 링크(a)를 선택
const $prev = document.querySelector('.prev>a')
const $next = document.querySelector('.next>a')

let newIdx = 0;
let oldIdx= newIdx;

//포커스를 변경하는 함수
const changeFocus = function($old, $new) {
     // 이전 썸네일의 부모 요소에서 'on' 클래스 제거
    $old.parentElement.classList.remove('on');
    
     // 새 썸네일의 부모 요소에 'on' 클래스 추가
    $new.parentElement.classList.add('on');

     // 새 썸네일의 href 속성에서 큰 이미지 URL 가져오기
    const bigSrc = $new.getAttribute('href');
    
     // 새 썸네일의 첫 번째 자식 요소에서 alt 속성 가져오기
    const bigAlt = $new.firstElementChild.getAttribute('alt');
    
     // 화면의 첫 번째 자식 요소에 큰 이미지 URL과 alt 속성 설정
    $screen.firstElementChild.setAttribute('src', bigSrc);
    $screen.firstElementChild.setAttribute('alt', bigAlt);
};

// 이전 버튼을 클릭동작을 했을 때 전결과로 이동하는 값 설정
$prev.addEventListener ('click',function(evt){
    evt.preventDefault();
    oldIdx = newIdx;
    if(oldIdx>0) newIdx--;
    else newIdx = 8;
    /*총 9개의 버튼이 있으므로 8로 설정, 인덱스가 8으로 이동*/
    
    changeFocus($thmbs[oldIdx],$thmbs[newIdx]);
})


// 다음버튼을 클릭동작을 했을 때 다음 결과로 이동하는 값 설정
$next.addEventListener ('click',function(evt){
    evt.preventDefault();
    oldIdx = newIdx;
    if(oldIdx<8) newIdx++;
    else newIdx = 0;
    /*총 9개의 버튼이 있으므로 8로 설정, 인덱스가 0으로 이동.*/
    
    changeFocus($thmbs[oldIdx],$thmbs[newIdx]);
});


// 버튼을 클릭하면 메인 배너(썸네일)도 같이 돌아가게 적용
for(let i =0; i<$thmbs.length; i++){
    $thmbs[i].addEventListener('click',function(evt){
        evt.preventDefault();

        oldIdx = newIdx; // 이전 인덱스를 저장
        newIdx = i; // 클릭한 썸네일의 인덱스를 새 인덱스로 설정

        changeFocus($thmbs[oldIdx], this); // 포커스 변경 함수 호출
    });
}