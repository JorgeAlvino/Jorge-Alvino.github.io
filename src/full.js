$(document).ready(function(){
	var estado = true;

	$('#btn-toggle').on('click',function(){


		if (estado == false) {
			$("	#btn-toggle").attr("class","icon-down-open-big");
			$('.lista ').css({

				"height":"100%"

			});
			estado=true;
		}else{
			$(" #btn-toggle").attr("class","icon-up-open-big");
			$('.lista ').css({

				"height": "0%"
			});
			estado=false;
		}
	});
});
