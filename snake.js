$(function() {
	var speed=200;
	var dir=1;
	var snake={
		length:3,
		body:["3_10","2_10","1_10"]
		};/*начальное положение змейки и длина*/
	var food=""; 
		 function myinit(){ //отображение игры
			dir=1;
			snake=["3_10","2_10","1_10"];//начальное положение тела змейки
			food="";
			$('#div_main').html("");
			for (var row=0;row<20;row++){ //задание размеров игрового поля
			  for (var cell=0;cell<20;cell++){
			$('#div_main').append('<div class=mycell id=c_'+row+'_'+cell+'></div>');
			  }
			}
			  $('#c_1_10').addClass('snake');
			  $('#c_2_10').addClass('snake');
			  $('#c_3_10').addClass('snake');
			  generatefood();
		 }
		 myinit();
		 function generatefood(){
			var row1 = Math.floor(Math.random() * 19);/*возвращает наибольшее целое число, меньшее, либо равное указанному числу*/
			var cell1 = Math.floor(Math.random() * 19);
			$('#c_'+row1+'_'+cell1).addClass('eat');
			food=''+row1+'_'+cell1;
			
		 } 
		 function gameupdate(){
			  var tail=snake.pop(); // pop вынимает значение с конца массива snake
			  $('#c_'+tail).removeClass('snake');//удаление класса у полученного значения (клетки)
			  var nValue=snake[0]; // в массиве snake выбирает значение, у которого нудевой индекс,т.е "3_10"
			  var rowCell=nValue.split("_");//split позволяет превратить строку в массив, разбив ее по разделителю( в данном случае "_"),
			  // т.е. из "3_10" получим массив с двумя значениями - 3 и 10
			  var row=parseInt(rowCell[0]);//выбирает из массива rc значение с нулевым индексом, parseInt() принимает строку 
			  //и возвращает целое число, т.е. 3 будет не строкой, а целым числом
			  var cell=parseInt(rowCell[1]);//аналогично предыдушей строке, только преобразуется второй элемент
				  switch(dir){ //выбирается в какую сторону поворачивает змейка 
					case 1: row=row+1; break; // Bottom
					case 2: cell=cell-1; break; // Left
					case 3: row=row-1; break; // Top
					case 4: cell=cell+1; break;  // Right
				  }  
			  var snakeLength=""+row+"_"+cell;
				  if (snakeLength==food){
					  snake.push(tail); //добавление элемента в хвост
					  $('#c_'+tail).addClass('snake');
					  $('#c_'+food).removeClass('eat');
					  generatefood();
					var score = snake.length-3;
					document.getElementById('score').innerHTML = 'Счёт: '+(score+1);
				  }
		   snake.unshift(snakeLength); //в начало массива snake добавляется новая клетка
		   $('#c_'+snakeLength).hasClass('snake'); //Определяет наличие указанного имени класса у элемента.
				  if (cell<0 || row<0 || cell>19 || row>19 ||  $('#c_'+snakeLength).hasClass('snake') ){
					alert('Game Over! Счёт ' + (snake.length-3) + '. Нажмите Reload для обновления игры');    
					return;
				  }  
		   $('#c_'+snakeLength).addClass('snake');       
		   setTimeout(function(){gameupdate()}, speed);
		 } 
			$(document).keydown(function(e){
				if (e.keyCode == 37) { 
				   dir=2;
				}else if (e.keyCode == 38) { 
				   dir=3;
				}else if (e.keyCode == 39) { 
				   dir=4;
				}else if (e.keyCode == 40) { 
				   dir=1;
				}
			});
		function Start () {

				setTimeout(function(){gameupdate()}, speed);

		}

		$('#start').on('click', function(){
			Start();
		});
		$('#reload').on('click', function(){
			myinit();
		});
	})