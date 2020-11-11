window.addEventListener('load', function(){
  // 1) 페이지 이동 관련
	var t=0;   // 윈도우 상단 위치 정보 변수
	var n=0;   // 카테고리 번호 변수
	// var categoryFlag=false;  
	var categoryList=[];     // 이동 카테고리를 넣어둘 배열
	var wrapper=document.getElementsByClassName("wrapper")[0];
	var timer;   // 카테고리 활성화 스크롤 변수
	var menuTimer;  // 메뉴 활성화 관련 스크롤 타이머 변수

// categoryList 만들기
  for(var i=0; i<wrapper.children.length; i++){
		if(wrapper.children[i].id == "header"){
			var header=wrapper.children[i];
			categoryList.push(header);
		}
		else if(wrapper.children[i].id == "business"){
			var business=wrapper.children[i];
			categoryList.push(business);
		}
		else if(wrapper.children[i].id == "portfolio"){
			var business=wrapper.children[i];
			categoryList.push(portfolio);
		}
		else if(wrapper.children[i].id == "culture"){
			var culture=wrapper.children[i];
			categoryList.push(culture);
		}
		else if(wrapper.children[i].id == "awards"){
			var awards=wrapper.children[i];
			categoryList.push(awards);
		}
		else if(wrapper.children[i].id == "contact"){
			var contact=wrapper.children[i];
			categoryList.push(contact);
		}
		else if(wrapper.children[i].id == "footer"){
			var footer=wrapper.children[i];
		}
	}
	categoryList[n].classList.add("active");       // header에 active 맨 처음에  활성화되게 하려고

  var pcNav=document.getElementById("gnb");
	var pcNavLi=pcNav.children[0].children;   // 헤더 메뉴 home버튼에 색 활성화 되게 하는 것
	pcNavLi[0].children[0].classList.add("on");
	var mobileNav=document.getElementById("m_gnb");
	var mobileNavLi=mobileNav.children[0].children;
  var menuZone=header.children[0];
  var topBtn=footer.children[0];
  
  window.addEventListener("scroll", scrollHandler);
	window.addEventListener("scroll", menuScrollHandler);

  function scrollHandler(){
    clearTimeout(timer);
    timer = setTimeout(function(){
      categoryList[n].classList.add('active');
      if(n == 5){
        window.removeEventListener('scroll', scrollHandler);
      }
    }, 10);
  }
  scrollHandler();


  function scrollHandler(){
		clearTimeout(timer);    // timer 제거
		timer=setTimeout(function(){
			t=window.pageYOffset;

			if(t < categoryList[1].offsetTop){
				n=0;
			}
			else if(t < categoryList[2].offsetTop){
				n=1;
			}
			else if(t < categoryList[3].offsetTop){
				n=2;
			}
			else if(t < categoryList[4].offsetTop){
				n=3;
			}
			else if(t < categoryList[5].offsetTop){
				n=4;

				if(t == (document.body.clientHeight-window.innerHeight)){  // 마지막까지 스크롤 됐을 때
					n=5;
				}
			}
			else{
				n=5;
			}

			// if(categoryFlag) return;
			// if(n == 5) categoryFlag=true;
			categoryList[n].classList.add("active");

			if(n == 5){
				window.removeEventListener("scroll", scrollHandler);      // scrollHandler 이벤트 제거
			}
		}, 10);
	}
	//scrollHandler();   41번 코드와 같은 말임 위에 적었기 때문에 안적어도 된다.


  function menuScrollHandler(){
		clearTimeout(menuTimer);
		menuTimer=setTimeout(function(){
      t = window.pageYOffset;
      
      if(t < categoryList[1].offsetTop){
				n=0;
			}
			else if(t < categoryList[2].offsetTop){
				n=1;
			}
			else if(t < categoryList[3].offsetTop){
				n=2;
			}
			else if(t < categoryList[4].offsetTop){
				n=3;
			}
			else if(t < categoryList[5].offsetTop){
				n=4;

				if(t == (document.body.clientHeight-window.innerHeight)){  // 마지막까지 스크롤 됐을 때
					n=5;
				}
			}
			else{
				n=5;
			}

      for(var i=0; i<pcNavLi.length; i++){
        if(i == n){
          pcNavLi[i].children[0].classList.add('on');
        }
        else{
          pcNavLi[i].children[0].classList.remove('on');
        }
      }

			if(t > 100){
				menuZone.classList.add("active");    // .menu_zone에 position:fixed 
				topBtn.classList.add("active");      // .top_btn에 active
			}
			else{
				menuZone.classList.remove("active");
				topBtn.classList.remove("active");
			}
		}, 10);
	}

// 2) 탭 이동 관련
  var mobile=mobileNav.parentElement
	var tab=mobile.nextElementSibling;
	var dim=tab.nextElementSibling;

	tab.addEventListener("click", function(e){
		e.preventDefault();
		document.body.classList.add("static");    // body에 overflow:hidden이 되게함,모바일 메뉴가 나타날때 세로 스크롤바가 안보이게 함
		mobile.classList.add("active");
		tab.classList.add("active");
		dim.classList.add("active");
	});
	dim.addEventListener("click", function(e){
		document.body.classList.remove("static");
		mobile.classList.remove("active");
		tab.classList.remove("active");
		dim.classList.remove("active");
  });
  

// 3) 메뉴 클릭 이동 관련
  var targetArea="";
  var offsety=0;
  var targety=0;

  for(var i=0; i<pcNavLi.length; i++){
    pcNavLi[i].addEventListener("click", function(e){
      clickMoving(e);
    });
    mobileNavLi[i].addEventListener("click", function(e){
      clickMoving(e);
    });
    function clickMoving(evt){
      evt.preventDefault();

      // mobilde에 active가 있다면 지워라
      if(mobile.classList.contains('active')){
        document.body.classList.remove("static");
        mobile.classList.remove("active");
        tab.classList.remove("active");
        dim.classList.remove("active");
      }
      
      targetArea=evt.currentTarget.children[0].getAttribute("href");  // string 데이터 만듦
      targetArea=document.querySelector(targetArea);                  // node 만듦
      // targetArea=document.getElementById(targetArea);
      offsety=window.pageYOffset;   // 현재 윈도우 위치
      targety=targetArea.offsetTop; // 목표 윈도우 위치, header.offsetTop
      moveCategory(offsety, targety);
    }
  }
  function moveCategory(current, target){ // offsety, targety
    var timer=setInterval(function(){
      if(target > current){  // 밑으로 내려갈 때
        if(Math.abs(target-current) > 8){
          current+=8;
        }
        else{
          current=target;
          moving=false;
          clearInterval(timer);
        }
      }
      else{  //  위로 올라올 때
        if(Math.abs(target-current) > 8){
          current-=8;
        }
        else{
          current=target;
          moving=false;
          clearInterval(timer);
        }
      }
      // window.scrollTo(0, current);

      window.scrollTo({
        top: current,
        behavior: "instant" // auto, instant, smooth
      });
    }, 1);
  }


  // 4) 상단 이동 관련
	topBtn.addEventListener("click", function(e){
		e.preventDefault();
		offsety=window.pageYOffset;
		targety=0;
		moveCategory(offsety, targety);
	});


  // 5) 화면 크기 조정 관련
	var w;
	var h;

	window.addEventListener("resize", resizeHandler);

	function resizeHandler(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			w=window.innerWidth;

			if(w > 720){  //media query css, 모바일 화면에서 메뉴가 있을때 사이즈 크기를 키울 때 모바일 메뉴가 사라지게 하려고
				if(mobile.classList.contains("active")){
					document.body.classList.remove("static");
					mobile.classList.remove("active");
					tab.classList.remove("active");
					dim.classList.remove("active");
				}
			}
		}, 10);
	}
	resizeHandler();

});
/*
  var amount = 88;
  var grade = '';
  
  // if : 값의 범위
  if(amount >= 90){
    grade = 'A';
  } else if(amount >= 80) {
    grade = 'B';
  } else {
    grade = 'F';
  }
  console.log(grade);     // B 출력
  

  // switch : 값을 점검
  amount = amount/10;    //8.8;
  amount = Math.floor(amount);  // math.floor : 내림 , 8
  // console.log(amount);
  switch(amount){
    case 9 : 
      grade = 'A';
      break;
    case 8 :
      grade = 'B';
      break;
    default : 
      grade = 'F';
      break;    
  }
  console.log(grade);

  for(var i = 0; i<10; i++){
    if(i==4){
    //  continue;     contiue : 넘김, 제외 / 4만 제외하고 0~9까지 출력
      break;       // break : 멈춤, 종료  /  0~3까지 출력하고 끝  
    }
    console.log(i);
  }

  function myFn(){
    return;      // 함수 종료, myFn() 종료 , console창에 출력안됨
    console.log(myFn);
  }
  */