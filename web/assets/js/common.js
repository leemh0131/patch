$(document).ready(function(){
	$('#header').length && gnbMenu(); //pc GNB 메뉴
	$('.user_slide').length && userSlide();
	$('.main_user_slide').length && mainUserSlide();
	$('.loc_tab').length && mapTab();
	$('.menu_slide').length && menuSlide();
	//$('.ctrl_trg').length && csList();
	$("#header").load("/include/header.html");
	$("#footer").load("/include/footer.html");
	$("#sub").load("/include/sub.html");
	$("#sub_menu").load("/include/sub_menu.html");
	$("#m_gnb_wrap").load("/include/m_gnb_wrap.html");
	$("#site_srch_wrap").load("/include/site_srch_wrap.html");

	$('#list').on('click', '.ctrl_trg', function(e) {
		e.preventDefault();
		var $parentLi = $(this).parent();

		if ($parentLi.hasClass('on')) {
			$parentLi.removeClass('on');
			$(this).siblings().stop().slideUp();
		} else {
			$('.cs_wrap ul li').removeClass('on');
			$parentLi.addClass('on');
			$('.ans_wrap').stop().slideUp();
			$(this).siblings().stop().slideDown();
		}
	});

});

function dimShow(){ /* 딤드 show */
	$('body').addClass('dim');
}
function dimHide(){ /* 딤드 hide */
	$('body').removeClass('dim');
}
function gnbMenu() { //GNB 메뉴
	var head_btn = $('.m_util_menu')
	$('.btn_close').on('click', function(){ //MO GNB 닫기 / 검색 닫기
		head_btn.removeClass('active')
		$('.m_gnb_wrap').removeClass('active')
		$('body').removeClass('gnb_active')
		$('.site_srch_wrap').removeClass('active')
		dimHide()
	});
	$('.btn_search').on('click', function(){ //MO 검색 열기
		head_btn.addClass('active')
		$('.site_srch_wrap').addClass('active')
		$('body').addClass('gnb_active')
		dimShow()
	});
	$('.btn_site_menu').on('click', function(){ //MO GNB 열기
		head_btn.addClass('active')
		$('.m_gnb_wrap').addClass('active')
		$('body').addClass('gnb_active')
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var searchArea = $('.site_srch_wrap');
		if(searchArea.has(e.target).length === 0 && $('body').hasClass('dim') && $('#header').has(e.target).length === 0){
			head_btn.removeClass('active')
			$('.site_srch_wrap').removeClass('active')
			$('body').removeClass('gnb_active')
			dimHide()
		}
	});
}

function userSlide() {
	var ww = $(window).outerWidth();
	var userSlide = undefined;

	function userSwiper() {
		if(ww < 1025 && userSlide == undefined) {
			userSlide = new Swiper('.user_slide', {
				slidesPerView : 'auto',
				spaceBetween : 32,
				loop:true,
				loopAdditionalSlides : 1,
				speed:1500,
				observer: true, // display:none 오류
				observeParents: true,
			});
		}else if(ww >= 1024 && userSlide != undefined){
			userSlide.destroy();
			userSlide = undefined;
		}
	}

	userSwiper();

	$(window).on('resize', function () {
		ww = $(window).outerWidth();
		userSwiper();
	});
}

function mainUserSlide() {
	var ww = $(window).outerWidth();
	var userSlide = undefined;

	function userSwiper() {
		if(ww < 1025 && userSlide == undefined) {
			userSlide = new Swiper('.main_user_slide', {
				slidesPerView : 'auto',
				spaceBetween : 32,
				loop:true,
				loopAdditionalSlides : 1,
				speed:1500,
				observer: true, // display:none 오류
				observeParents: true,
			});
		}else if(ww >= 1024 && userSlide != undefined){
			userSlide.destroy();
			userSlide = undefined;
		}
	}

	userSwiper();

	$(window).on('resize', function () {
		ww = $(window).outerWidth();
		userSwiper();
	});
}

function mapTab(){ //지도 탭
	$('.loc_tab ul li button').on('click', function(e){
		e.preventDefault();
		$('.loc_tab li').removeClass('on')
		$(this).parent().addClass('on')
	})

	$('.more_tab').on('click', function(e){
		e.preventDefault();
		$('.loc_tab ul').toggleClass('active')
	})
}

$(window).on('load', function () {
	$('.sub_menu').length && muCenter($('.menu_slide .on'), 200, 'auto'); // 페이지 로드시 활성화 탭 가운데 이동
});
$(window).on('resize', function () {
	$('.sub_menu').length && muCenter($('.menu_slide .on'), 200, 'auto'); // 페이지 로드시 활성화 탭 가운데 이동
});

function menuSlide() { //메뉴 슬라이드
	var menuSlide = new Swiper('.menu_slide', {
		slidesPerView : 'auto',
		spaceBetween : 32,
		enteredSlides: true,
	});
}

function muCenter(target, num, type) { //탭 가운데 이동
	var slideWrap = target.closest('.swiper-wrapper')
	var targetPos = target.position();
	var box = target.closest('.sub_menu')
	var boxHalf = box.width() / 2;
	var pos;
	var listWidth = 0;

	slideWrap.find('.swiper-slide').each(function () {
		listWidth += $(this).outerWidth();
	})

	var selectTargetPos = targetPos.left + target.outerWidth() / 2;
	if (selectTargetPos <= boxHalf) { // left
		pos = 0;
	} else if ((listWidth - selectTargetPos) <= boxHalf) { //right
		pos = listWidth - box.width() + num;
	} else {
		pos = selectTargetPos - boxHalf + num;
	}

	if (type == 'auto') {
		if (listWidth > box.width()) {
			setTimeout(function () {
				slideWrap.css({
					"transform": "translate3d(" + (pos * -1) + "px, 0, 0)",
					"transition-duration": "500ms"
				})
			}, 200);
		} else {
			setTimeout(function () {
				slideWrap.css({
					"transform": "translate3d(0, 0, 0)",
					"transition-duration": "500ms"
				})
			}, 200);
		}
	} else if (type == 'manual') {
		if (listWidth > box.width()) {
			setTimeout(function () {
				slideWrap.css({
					"transform": "translate3d(" + (pos * -1) + "px, 0, 0)",
					"transition-duration": "10ms"
				})
			}, 10);
		} else {
			setTimeout(function () {
				slideWrap.css({
					"transform": "translate3d(0, 0, 0)",
					"transition-duration": "10ms"
				})
			}, 10);
		}
	}


	$(window).on('resize', function () {
		if (listWidth < box.width()) {
			setTimeout(function () {
				slideWrap.css({
					"transform": "translate3d(0, 0, 0)",
					"transition-duration": "500ms"
				})
			}, 200);
		}
	});
}

/*function csList(){ //고객센터
	$('.ctrl_trg').on('click', function(e){
		e.preventDefault();
		debugger
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on')
			$(this).siblings().stop().slideUp();
		}else{
			$('.cs_wrap ul li').removeClass('on')
			$(this).parent().addClass('on')
			$('.ans_wrap').stop().slideUp();
			$(this).siblings().stop().slideDown();
		}
	})

}*/

function postData2(url, param) {

	//헤더 정보가 필요한 경우에만 추가
	const headers = {
		"Content-Type": "application/json;charset=UTF-8",
		"x-requested-with": "XMLHttpRequest",
	};

	try {
		const response = fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(param),
		});
		return response.json(); // 서버로부터 받은 데이터를 JSON 형태로 변환
		//console.log(data); // 변환된 데이터를 출력
	} catch (error) {
		alert("네트워크 오류가 발생!!.");
		console.error("Error fetching data:", error);  // 오류 발생 시 메시지 출력	}
	}

}

//******* Fetch sync POST 요청 *******
async function postData(url, param) {

	//헤더 정보가 필요한 경우에만 추가
	const headers = {
		"Content-Type": "application/json;charset=UTF-8",
		"x-requested-with": "XMLHttpRequest",
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(param),
		});
		return await response.json(); // 서버로부터 받은 데이터를 JSON 형태로 변환
		//console.log(data); // 변환된 데이터를 출력
	} catch (error) {
		alert("네트워크 오류가 발생!!.");
		console.error("Error fetching data:", error);  // 오류 발생 시 메시지 출력	}
	}

}

var nvl = function (A, B) {
	var type;
	var temp;
	if( typeof A == 'string'){
		temp = A.trim();
		type = 'string';
	}else if (typeof A == 'number'){
		temp = A.toString();
		type = 'number';
	}else{
		temp = A;
	}
	if (!isNull(temp) && !isUndefined(temp) && !isEmpty(temp)) {

		if (type == 'number'){
			A = Number(A);
		}
		return A;
	} else {
		if (isUndefined(B)) {
			B = "";
		}
		return B;
	}
};

var isNull = function (value) {
	var _chkStr = value + "";
	if (_chkStr == "" || _chkStr == null || _chkStr == "null") {
		return true;
	}
	return false;
};

var isUndefined = function (value) {
	if (typeof (value) == "undefined" || typeof (value) == undefined || value == "undefined" || value == undefined) {
		return true;
	}
	return false;
};

var isEmpty = function (obj) {
	if(typeof obj === 'object' && obj !== null){ //객체 여부를 확인
		return Object.keys(obj).length === 0;
	}else{
		return false;
	}
};

function commonRegWrite(dm_type){

	let company_cd = "1000";
	let dm_kind = nvl($("#ES_Q0140").val());				//피해종류
	let comp_nm = nvl($("#comp_nm").val());				//업체명
	let borw_site = nvl($("#borw_site").val()); 		//차용사이트
	let debtor_tel = nvl($("#debtor_tel").val()); 		//연락처
	let debtor_kakao = nvl($("#debtor_kakao").val()); 	//카톡
	let debtor_tele = nvl($("#debtor_tele").val()); 	//텔레
	let debtor_sns = nvl($("#debtor_sns").val()); 		//기타sns
	let compl_police = nvl($("#compl_police").val()); 	//고소한경찰서명
	let dm_contents = nvl($("#dm_contents").val()); 	//피해종류
	let pw = nvl($("#pw").val()); 	//피해종류
	let use_yn = "Y";


	//let apiUrl = "http://localhost:8080/api/web/v1/regWrite";


	let apiUrl = "http://117.52.84.88:8080/api/web/v1/regWrite";

	let depositList = [];
	$('.acc').each(function(index) {
		var inputs = $(this).find('input');
		var selects = $(this).find('select');

		var values = {};
		inputs.each(function() {
			var inputName = $(this).attr('name');
			var inputValue = $(this).val();
			values[inputName] = inputValue;
		});

		selects.each(function() {
			var selectName = $(this).attr('name');
			var selectedOption = $(this).find('option:selected');
			var selectedValue = selectedOption.val();
			var selectedText = selectedOption.text();
			values['BANK_CD'] = selectedValue;
			values['BANK_NM'] = selectedText;
		});
		values['USE_YN'] = 'Y';
		depositList.push(values);
	});

	depositList.splice(0, 1);

	let param = {
		COMPANY_CD : company_cd,
		DM_TYPE : dm_type,
		DM_KIND : dm_kind,
		COMP_NM : comp_nm,
		BORW_SITE : borw_site,
		DEBTOR_TEL : debtor_tel,
		DEBTOR_KAKAO : debtor_kakao,
		DEBTOR_TELE : debtor_tele,
		DEBTOR_SNS : debtor_sns,
		COMPL_POLICE : compl_police,
		DM_CONTENTS : dm_contents,
		USE_YN : use_yn,
		DEPOSIT : depositList,
		PW : pw,
	}

	postData(apiUrl, param)
		.then((res) => {
			// 서버로부터 받은 데이터를 사용하여 원하는 작업을 수행
			console.log('Received data:', res);
			res = res.map;
			if(res.response == 'ok'){
				alert("등록이 완료되었습니다.");
				location.href = '/view_list_01.html';
			}


		})
		.catch((err) => {
			alert("네트워크 오류가 발생!!.");
			console.error('Error sending/receiving data:', err); // 데이터 전송 또는 수신 중 오류 발생 시 메시지 출력
		});
}

function depositAdd(){

	if(nvl($('#no_deposit').val()) == '' || nvl($('#nm_depositor').val()) == '' ){
		alert("계좌번호 및 입금자명를 입력하세요.");
		return
	}

	const selectedOption = $('#ES_Q0009').find('option:selected').val();

	const newDiv = $('<div>')
		.addClass('inpt_wrap acc')
		.css('margin-top', '1px');

	const selectElement = $('<select>');
	const option = $('<option selected value="' + $('#ES_Q0009').find('option:selected').val() + '">' + $('#ES_Q0009').find('option:selected').text()  + '</option>>');
	selectElement.append(option);
	newDiv.append(selectElement);


	const accNumInput = $('<input>')
		.attr('type', 'text')
		.attr('name', 'NO_DEPOSIT')
		.attr('readonly', 'readonly')
		.addClass('acc_num')
		.val($('#no_deposit').val())
		.attr('placeholder', '계좌번호를 입력하세요.');
	newDiv.append(accNumInput);

	const depositorInput = $('<input>')
		.attr('type', 'text')
		.attr('name', 'NM_DEPOSITOR')
		.attr('readonly', 'readonly')
		.attr('placeholder', '입금자명')
		.val(nvl($('#nm_depositor').val()));
	newDiv.append(depositorInput);

	const btnWrapDiv = $('<div>')
		.addClass('btn_wrap');

	const deleteButton = $('<button>')
		.addClass('btn bg_bk')
		.append('<span>삭제</span>')
		.on('click', function() {
			depositDel(this);
		});
	btnWrapDiv.append(deleteButton);
	newDiv.append(btnWrapDiv);

	console.log(newDiv);

	$('#deposit').append(newDiv);

	$('#no_deposit').val('');
	$('#nm_depositor').val('');

}

function depositDel(element){
	const parentDiv = element.closest('.inpt_wrap.acc');
	if (parentDiv) {
		parentDiv.remove(); // 부모 요소를 삭제합니다.
	} else {
		console.error('부모 요소를 찾을 수 없습니다.');
	}
}