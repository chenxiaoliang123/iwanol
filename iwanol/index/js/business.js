function range(num,maxn,minn){ 
	return Math.min(maxn,Math.max(num,minn)); 
	}

$(function(){
	var $joIn_ban = $("#joIn_ban"),
		$jobs_Cont = $("#jobs_Cont"),
		$jobs_Fl = $jobs_Cont.find(".list_Fl"),
		
		$join_Jm = $("#join_Jm");
	
	
	/*<button class="tsbg on"></button><button class="tsbg"></button>*/
	
	$jobs_Fl.each(function(i,e){
        var $this = $(e),
			$liNum = $this.find("li").length,
			$html = "",
			$l = 0,
			$a;
		//if($liNum < 3) return false;
		$a = $liNum/2;
		$a > Math.floor($a) ? $a = Math.floor($a) + 1 : $a;
		for(;$l<$a;$l++){
			$html += $l == 0 ? "<button class=\"tsbg on\"></button>" : "<button class=\"tsbg\"></button>";
			}		
		if($liNum > 2) $this.find(".job_Nav").html($html);
    	});
	
	$joIn_ban.on("click","li",function(){
		var $this = $(this),
			$tNum = $this.prevAll().length,
			$jobsCont_Hide = $jobs_Cont.is(":hidden");
		if($this.hasClass("on")) return;
		$this.addClass("on").siblings("li").removeClass("on");
		$jobsCont_Hide && $jobs_Cont.slideDown(400),$join_Jm.addClass("open");
		$jobs_Fl.eq($tNum).fadeIn(400).siblings().fadeOut(400);
		});
	
	
	
	$join_Jm.click(function(){
		var $this = $(this),
			$hasShow = true,
			$s = 0;
		$jobs_Cont.stop().slideToggle(400);
		$join_Jm.toggleClass("open");
		
		if(!$join_Jm.hasClass("open")){
			$joIn_ban.find(".on").removeClass("on");
			return;
			}
		for(;$s < $jobs_Fl.length; $s++){
			if($jobs_Fl.eq($s).is(":visible")){
				$hasShow = true;
				$joIn_ban.find("li").eq($s).addClass("on");
				return;
				}else{
				$hasShow = false;
				}
			}
		!$hasShow && $jobs_Fl.eq(0).fadeIn(400),$joIn_ban.find("li:first").addClass("on");
		});
	
	
	$jobs_Cont.on("click","button",function(){
		var $this = $(this);
		if($this.hasClass("on")) return;		
		var $tUl = $(this).parent().prev("ul"),
			$tAl = $tUl.find("li").length,
			$tNum = $this.prevAll().length;			
			$uLeft = range(-$tNum*1000,0,(2-$tAl)*500);
		
		$this.addClass("on").siblings(".on").removeClass("on");
		$tUl.stop().animate({"left":$uLeft},400);
		
		});
	
(function get_Category(){
	var get_Url = window.location.href;
	if(get_Url.indexOf("?") == -1) return;
	var get_Cat = get_Url.split("?");
	if(get_Cat[1]){
		var GETs = get_Cat[1].split("&"),
			get_Array =new Array();
		for(i=0;i<GETs.length;i++){
			var tmp_arr = GETs[i].split("=");
			get_Array[tmp_arr[0]] = tmp_arr[1];
		}
	}
	//return get_Array;
	var $lNUm = get_Array.category;
	$lNUm > -1 && $lNUm < 5 && $joIn_ban.find("li").eq($lNUm).trigger("click");
}());	
});