$(document).ready(function(){
	initPlayer();
	getSongs();


});

var audio=document.getElementById('song');
var music;

function initPlayer(){
	$('#shuffle').click(function(){
		$('.lista').empty();
		genList(music);

	});
}
function getSongs(){
	$.getJSON("src/song.json", function(mjson){
		music=mjson;
		genList(music);

	});
}
function playsong(id){

		var long=music.songs;



		if (id>=long.length) {
			audio.pause();

		}else{
			$('#ImagenMusic').attr('src',music.songs[id].image);
      $('#banner').attr('src',music.songs[id].image);
      $('div.control-1 span.vol-level').css({
				 "animation": "rotar "+20+"s"
      });

	$('#song').attr('src',music.songs[id].song);
	$('.Nombre').text(music.songs[id].name);
	$('.Autor').text(music.songs[id].artits);
	$('.Album').text(music.songs[id].album);
	$('.AlbumA').text(music.songs[id].album);



	audio.play();
	scheduleSong(id);
  prevmusic(id);

		}
}

function genList(music){
	$.each(music.songs,function(i,song){
		$('.lista').append('<table class="song" data-id="'+i+'" data-name="'+song.name+'">'+
			'<td width="2%" style="text-align: left; " ><i class="icon-chart-bar-1" ></i> </td>'+
			'<td width="20%" style="text-align: left;" ><span class="MusicaNombre">'+song.name+'</span> </td>'+
			'<td width="5%" style="text-align: center;"><i class="icon-play-outline status"></i></td>'+
			'<td width="30%" style="text-align: center;"><span class="MusicaArtista">'+song.artits+'</span></td>'+
			'<td width="30%" style="text-align: left;"><span class="MusicaAlbum">'+song.album+'</span></td>'+
			'<td width="10%" style="text-align: left;"><span class="duracion">'+song.duracion+'</span></td></table>')
	});

	$('.lista table ').click(function(){
		var selectedsong=$(this).attr('data-id');
		playsong(selectedsong);

	});

}



	function scheduleSong(id){
		audio.onended=function(){
			playsong(parseInt(id)+1);
		}
	}


$(document).on("ready",function()
  {


    //funciones
    function segundosMinutos(duracion){
    var segundos = duracion,
        minutos = Math.floor(segundos / 60),
        seg = Math.round(segundos % 60);

        if (minutos < 10) {
          minutos = "0" + minutos;
        }

        if (seg < 10) {
          seg = "0" + seg;
        }

        if (seg == 60) {
          minutos = parseInt(minutos) + 1;
          minutos = "0" + minutos;
          seg = "00";
        }

        duracionTotal = minutos + ":" + seg;

        return duracionTotal;
  }

	function segundos(duracion){
	var segundos = duracion,
			minutos = Math.floor(segundos / 60),
			seg = Math.round(segundos % 60);

			if (minutos < 10) {
				minutos = "0" + minutos;
			}

			if (seg < 10) {
				seg = "0" + seg;
			}

			if (seg == 60) {
				minutos = parseInt(minutos) + 1;
				minutos = "0" + minutos;
				seg = "00";
			}

			duracionTotal = parseInt((minutos * 60) + seg);

			return duracionTotal;
}



        function moveVolumeX(e){
    var pos = $(".container .control-2 .eq eq-1").offset(),
    posX = e.pagey - pos.left;


    if (posX >= 0 && posX <= $(".container .control-2 .eq eq-1").outerWidth()) {
      //Esta parte actualiza la barra de reproduccion
      var volumenMaximo = 100;
      var barraActual=posx;
      var longitudBarra=parseInt($(".container .control-2 .eq eq-1").css("margin-top").split("px")[0]);
      var volume = (barraActual * volumenMaximo) /  longitudBarra;



      $("audio").get(0).volume=volume/100;


      $(".container .control-2 .eq eq-1").css("margin-top",posX + "px");


    }
  }








  function moveVolumey(e){
    var pos = $(".Reproduciendo .Reproductor .volumen .volume-body .reproduction").offset(),
    posX = e.pageX - pos.left;


    if (posX >= 0 && posX <= $(".Reproduciendo .Reproductor .volumen .volume-body .reproduction").outerWidth()) {
      //Esta parte actualiza la barra de reproduccion
      var volumenMaximo = 100;
      var barraActual=posX;
      var longitudBarra=parseInt($(".Reproduciendo .Reproductor .volumen .volume-body .reproduction").css("width").split("px")[0]);
      var volume = (barraActual * volumenMaximo) /  longitudBarra;

      if(volume >=0 && volume <=5){
        $(".volumen .icon-container i").attr("class","icon-volume-off-1");
      }
      else if(volume > 5 && volume < 33) {
        $(".volumen .icon-container i").attr("class","icon-volume-low");
      }
      else if(volume >=33 && volume < 65){
        $(".volumen .icon-container i").attr("class","icon-volume-middle");
      }
      else{
        $(".volumen .icon-container i").attr("class"," icon-volume-high");
      }

      $("audio").get(0).volume=volume/100;


      $(".Reproduciendo .Reproductor .volumen .volume-body .reproduction .reproducted").css("width",posX + "px");
      $(".Reproduciendo .Reproductor .volumen .volume-body .reproduction .circle").css("left",posX + "px");

    }
  }









      function song (action){

        if(action == "play"){
          if ($("audio").get(0).readyState == 4) {
            $("audio").get(0).play();
          }
        }
        else if (action == "pause") {
          $("audio").get(0).pause();
        }
        else {
          $("audio").get(0).load();
        }


      }



//----------------------------------------------------------------------
      function changeTime(duracion, actual, width){

        var width=(actual * width)/duracion;
        $("#Reproductor .rep-body .reproductor .reproduction .reproducted").css("width",width+"px");
        $("#Reproductor .rep-body .reproductor .reproduction .circle").css("left",width+"px");
        $("#Reproductor .Reproductor .rep-body .reproductor .played").text(segundosMinutos(actual));
      }

      function changeTime2(duracion, actual, width){

        var width=(actual * width)/duracion;
        $(".Reproduciendo .Reproductor .rep-body .reproductor .reproduction .reproducted").css("width",width+"px");
        $(".Reproduciendo .Reproductor .rep-body .reproductor .reproduction .circle").css("left",width+"px");
        $(".Reproduciendo .Reproductor .rep-body .reproductor .played").text(segundosMinutos(actual));
      }

      function setIcon(type){
        var idSong=$("audio").attr("data-id");
        $("#"+idSong).children(".status").attr("class","status icon-"+type+"-1");

      }





function prevNextSong(type){
        var repActual=music.songs.id;
        if(type =="prev"){
           playsong(parseInt(repActual)+1);

        }

      }






    //Eventos del audio

    $("audio").on("play",function(){

      $(".container .control-3 .play-pause .button .icon-play-outline").hide();
      $(".container .control-3 .play-pause .button .icon-pause-outline").show();
      setIcon("play");

    });



    $("audio").on("pause",function(){
      $(".container .control-3 .play-pause .button .icon-play-outline").show();
      $(".container .control-3 .play-pause .button .icon-pause-outline").hide();
      setIcon("pause");
    });




    $("audio").on("loadeddata",function(){

      if($("audio").get(0).paused){
      $(".container .control-3 .play-pause .button .icon-play-outline").show();
      $(".container .control-3 .play-pause .button .icon-pause-outline").hide();
      setIcon("pause");
      }


      $("#Reproductor .Reproductor .rep-body .reproductor .duration").text(segundosMinutos($("audio").get(0).duration));
      $("#Reproductor .rep-body .reproductor .reproduction .reproducted").css("width","0");
        $("#Reproductor .rep-body .reproductor .reproduction .circle").css("left","0");



    });

    $("audio").on("timeupdate",function(){
      var duracion=$("audio").get(0).duration,
      actual= $("audio").get(0).currentTime,
      width= $("#Reproductor .rep-body .reproductor .reproduction").width();
      changeTime(duracion, actual, width);

    });

    $("audio").on("timeupdate",function(){
      var duracion=$("audio").get(0).duration,
      actual= $("audio").get(0).currentTime,
      width= $(".Reproduciendo .Reproductor .rep-body .reproductor .reproduction").width();
      changeTime2(duracion, actual, width);

    });







    //Eventos del DOM

    $("#Reproductor .rep-body .reproductor").on("mousedown",function(e){
      e.preventDefault();
      moveSliderX(e);
      $("html").on("mousemove",function(e){
        moveSliderX(e);
      }).on("mouseup",function(){
        $(this).off("mousemove");

      });
    });

    $(".Reproduciendo .Reproductor .rep-body .reproductor").on("mousedown",function(e){
      e.preventDefault();
      moveSlidery(e);
      $("html").on("mousemove",function(e){
        moveSlidery(e);
      }).on("mouseup",function(){
        $(this).off("mousemove");

      });
    });

    $(".container .control-2 .eq eq-1").on("mousedown",function(e){
      e.preventDefault();
      moveVolumeX(e);
      $("html").on("mousemove",function(e){
        moveVolumeX(e);
      }).on("mouseup",function(){
        $(this).off("mousemove");

      });
    });

    $(".Reproduciendo .Reproductor .volumen .volume-body").on("mousedown",function(e){
      e.preventDefault();
      moveVolumey(e);
      $("html").on("mousemove",function(e){
        moveVolumey(e);
      }).on("mouseup",function(){
        $(this).off("mousemove");

      });
    });

    $(".icon-play-outline").on("click",function(){
      song("play");

    });

    $(".icon-pause-outline").on("click",function(){
      song("pause");
    });
    $(".icon-stop-outline").on("click",function(){
      song("stop");
    });

    $(".icon-rewind-outline").on("click",function(){

      function prevmusic(id){
    audio.onprev=function(){
      playsong(parseInt(id)+1);
    }
  }

    });
    $(".icon-fast-fw-outline").on("click",function(){

      prevNextSong("next");

    });


    $(".song").on("click",function(){
      changeSong(this);
    });


  });






//__________________________________________________________________//


var rafID = null;
var analyser = null;
var c = null;
var cDraw = null;
var ctx = null;
var microphone = null;
var ctxDraw = null;

var loader;
var filename;
var fileChosen = false;
var hasSetupUserMedia = false;

//handle different prefix of the audio context
var AudioContext = AudioContext || webkitAudioContext;
//create the context.
var context = new AudioContext();

//using requestAnimationFrame instead of timeout...
if (!window.requestAnimationFrame)
	window.requestAnimationFrame = window.webkitRequestAnimationFrame;

$(function () {
		"use strict";
	    loader = new BufferLoader();
	    initBinCanvas();
});

function handleFiles(files) {
    if(files.length === 0){
        return;
    }
	fileChosen = true;
    setupAudioNodes();
	var fileReader  = new FileReader();
    fileReader.onload = function(){
         var arrayBuffer = this.result;
         console.log(arrayBuffer);
         console.log(arrayBuffer.byteLength);

		 filename = files[0].name.toString();
		filename = filename.slice(0, -4);
		console.log(filename);

		var url = files[0].urn || files[0].name;
		ID3.loadTags(url, function() {
			var tags = ID3.getAllTags(url);

//                    console.log(tags.title.toString().length);
//                    if (tags.title.length > 14) {
//                        var newTitle = tags.title.substring(0,14);
//                        newTitle += "...";
//                        $("#title").html(newTitle);
//                    }
//                    else {
//                        $("#title").html(tags.title);
//                    }
			if (tags.title.length > 14 && tags.title.length <= 17) {

				$("#title").css("font-size", "7.5vh");

			}
			if (tags.title.length > 17 && tags.title.length <= 20) {

				$("#title").css("font-size", "6.5vh");
			}

			if (tags.title.length > 20) {

				$("#title").css("font-size", "5vh");

			}

			$("#title").html(tags.title);

			onWindowResize();

			$("#title").css("visibility", "visible");

			$("#artist").html(tags.artist);
			$("#artist").css("visibility", "visible");
			$("#album").html(tags.album);
			$("#album").css("visibility", "visible");
		  }, {
			tags: ["title","artist","album","picture"],
			dataReader: ID3.FileAPIReader(files[0])
		  });

     };
     fileReader.readAsArrayBuffer(files[0]);
     var url = URL.createObjectURL(files[0]);

	var request = new XMLHttpRequest();

	request.addEventListener("progress", updateProgress);
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.addEventListener("abort", transferCanceled);

	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

 	// When loaded decode the data
	request.onload = function() {
		// decode the data
		context.decodeAudioData(request.response, function(buffer) {
		// when the audio is decoded play the sound
		sourceNode.buffer = buffer;
		sourceNode.start(0);
		$("#freq, body").addClass("animateHue");
		//on error
		}, function(e) {
			console.log(e);
		});
	};
	request.send();

	$("button, input").prop("disabled",true);
}

function playSample() {

	fileChosen = true;
    setupAudioNodes();

	var request = new XMLHttpRequest();

	request.addEventListener("progress", updateProgress);
	request.addEventListener("load", transferComplete);
	request.addEventListener("error", transferFailed);
	request.addEventListener("abort", transferCanceled);

	request.open('GET', 'src/Infinite.mp3', true);
	request.responseType = 'arraybuffer';

 	// When loaded decode the data
	request.onload = function() {

		$("#title").html("Infinite");
		$("#album").html("Infinite");
		$("#artist").html("Valence");
		onWindowResize();
		$("#title, #artist, #album").css("visibility", "visible");

		// decode the data
		context.decodeAudioData(request.response, function(buffer) {
		// when the audio is decoded play the sound
		sourceNode.buffer = buffer;
		sourceNode.start(0);
		$("#freq, body").addClass("animateHue");
		//on error
		}, function(e) {
			console.log(e);
		});
	};
	request.send();

	$("button, input").prop("disabled",true);
}

function useMic()
{
	"use strict";
	if (!navigator.mediaDevices.getUserMedia) {
		alert("Your browser does not support microphone input!");
		console.log('Your browser does not support microphone input!');
		return;
 	}

	navigator.mediaDevices.getUserMedia({audio: true, video: false})
	.then(function(stream) {
		hasSetupUserMedia = true;
	  	//convert audio stream to mediaStreamSource (node)
		microphone = context.createMediaStreamSource(stream);
		//create analyser
		if (analyser === null) analyser = context.createAnalyser();
		//connect microphone to analyser
		microphone.connect(analyser);
		//start updating
		rafID = window.requestAnimationFrame( updateVisualization );

		$("#title").html("Mic");
		$("#album").html("Input");
		$("#artist").html("Using");
		onWindowResize();
		$("#title, #artist, #album").css("visibility", "visible");
		$("#freq, body").addClass("animateHue");
	})
	.catch(function(err) {
	  /* handle the error */
		alert("Capturing microphone data failed! (currently only supported in Chrome & Firefox)");
		console.log('capturing microphone data failed!');
		console.log(err);
	});
}

// progress on transfers from the server to the client (downloads)
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
	$("button, input").prop("disabled",true);
    var percentComplete = oEvent.loaded / oEvent.total;
	console.log("Loading music file... " + Math.floor(percentComplete * 100) + "%");
	$("#loading").html("Loading... " + Math.floor(percentComplete * 100) + "%");
  } else {
    // Unable to compute progress information since the total size is unknown
	  console.log("Unable to compute progress info.");
  }
}

function transferComplete(evt) {
  	console.log("The transfer is complete.");
	$("#loading").html("");
	//$("button, input").prop("disabled",false);
}

function transferFailed(evt) {
  	console.log("An error occurred while transferring the file.");
	$("#loading").html("Loading failed.");
	$("button, input").prop("disabled", false);
}

function transferCanceled(evt) {
  	console.log("The transfer has been canceled by the user.");
	$("#loading").html("Loading canceled.");
}

function initBinCanvas () {

	//add new canvas
	"use strict";
	c = document.getElementById("freq");
	c.width = window.innerWidth;
        c.height = window.innerHeight;
	//get context from canvas for drawing
	ctx = c.getContext("2d");

	ctx.canvas.width  = window.innerWidth;
  	ctx.canvas.height = window.innerHeight;

	window.addEventListener( 'resize', onWindowResize, false );

	//create gradient for the bins
	var gradient = ctx.createLinearGradient(0, c.height - 300,0,window.innerHeight - 25);
	gradient.addColorStop(1,'#00f'); //black
	gradient.addColorStop(0.75,'#f00'); //red
	gradient.addColorStop(0.25,'#f00'); //yellow
	gradient.addColorStop(0,'#ffff00'); //white


	ctx.fillStyle = "#9c0001";
}

function onWindowResize()
{
	ctx.canvas.width  = window.innerWidth;
  	ctx.canvas.height = window.innerHeight;

	var containerHeight = $("#song_info_wrapper").height();
	var topVal = $(window).height() / 2 - containerHeight / 2;
	$("#song_info_wrapper").css("top", topVal);
	console.log(topVal);

	if($(window).width() <= 500) {
		//TODO: not yet working
		$("#title").css("font-size", "40px");
	}
}

var audioBuffer;
var sourceNode;
function setupAudioNodes() {
	// setup a analyser
	analyser = context.createAnalyser();
	// create a buffer source node
	sourceNode = context.createBufferSource();
	//connect source to analyser as link
	sourceNode.connect(analyser);
	// and connect source to destination
	sourceNode.connect(context.destination);
	//start updating
	rafID = window.requestAnimationFrame(updateVisualization);
}


function reset () {
	if (typeof sourceNode !== "undefined") {
		sourceNode.stop(0);
	}
	if (typeof microphone !== "undefined") {
		microphone = null;
	}
}


function updateVisualization () {

	// get the average, bincount is fftsize / 2
	if (fileChosen || hasSetupUserMedia) {
		var array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);

		drawBars(array);
	}
       // setTextAnimation(array);


	rafID = window.requestAnimationFrame(updateVisualization);
}

function drawBars (array) {

	//just show bins with a value over the treshold
	var threshold = 0;
	// clear the current state
	ctx.clearRect(0, 0, c.width, c.height);
	//the max count of bins for the visualization
	var maxBinCount = array.length;
	//space between bins
	var space = 10;

	ctx.save();


	ctx.globalCompositeOperation='source-over';

	//console.log(maxBinCount); //--> 1024
	ctx.scale(0.5, 0.5);
	ctx.translate(window.innerWidth, window.innerHeight);
	ctx.fillStyle = "white";

	var bass = Math.floor(array[1]); //1Hz Frequenz
	var radius = 0.45 * $(window).width() <= 450 ? -(bass * 0.25 + 0.45 * $(window).width()) : -(bass * 0.25 + 450);

	var bar_length_factor = 1;
	if ($(window).width() >= 785) {
		bar_length_factor = 1.0;
	}
	else if ($(window).width() < 785) {
		bar_length_factor = 1.5;
	}
	else if ($(window).width() < 500) {
		bar_length_factor = 20.0;
	}
	console.log($(window).width());
	//go over each bin
	for ( var i = 0; i < maxBinCount; i++ ){

		var value = array[i];
		if (value >= threshold) {
			//draw bin
			//ctx.fillRect(0 + i * space, c.height - value, 2 , c.height);
                        //ctx.fillRect(i * space, c.height, 2, -value);
                        ctx.fillRect(0, radius, $(window).width() <= 450 ? 2: 3, -value / bar_length_factor);
                        ctx.rotate((180 / 128) * Math.PI/180);
		}
	}




	ctx.restore();
}
