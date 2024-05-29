const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{
		this.type = type;
		this.questions = questions;
		this.results = results;

		this.score = 0;
		this.result = 0;
		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

const results = 
[
	new Result("Вам многому нужно научиться (не зачет)", 0),
	new Result("Вы уже неплохо разбираетесь (зачет)", 2),
	new Result("Ваш уровень выше среднего (зачет)", 4),
	new Result("Вы в совершенстве знаете СИ (зачет)", 6)
];

const questions = 
[
	new Question("Как в С выглядит вывод строки? ", 
	[
		new Answer("scanf", 0),
		new Answer("printf", 1),
		new Answer("malloc", 0),
		new Answer("printff", 0)
	]),

	new Question("Когда появился язык С? ", 
	[
		new Answer("1996", 0),
		new Answer("1982", 0),
		new Answer("1972", 1),
		new Answer("1992", 0)
	]),

	new Question("Как подключить стандартную библиотеку «stdio.h»?", 
	[
		new Answer("Только так: #include <stdio.h>", 0),
		new Answer("Только так: #include «stdio.h»", 0),
		new Answer("Только так: #include stdio.h", 0),
		new Answer("Можно двумя способами: #include «stdio.h» и #include <stdio.h>", 1)
	]),

	new Question("C каким значением будет переменная «a»? int a = 2 + 1;", 
	[
		new Answer("Ошибка", 0),
		new Answer("2", 0),
		new Answer("1", 0),
		new Answer("3", 1)
	]),

	new Question(" Какого типа данных нет в языке Си?", 
	[
		new Answer("char", 0),
		new Answer("double", 0),
		new Answer("float", 0),
		new Answer("string", 1)
	]),

	new Question("Сколько существует классов лексем в языке Си? ", 
	[
		new Answer("4", 0),
		new Answer("3", 0),
		new Answer("5", 1),
		new Answer("2", 0)
	]),
    
    new Question("Что произойдет, если забыть поставить оператор break для какой-либо из меток оператора switch? ", 
	[
		new Answer("программа может выдать ошибку", 0),
		new Answer("программа выдаст ошибку", 1),
		new Answer("программа заработает, но не правильно", 0),
		new Answer("Все будет в норме", 0)
	]),
];

const quiz = new Quiz(1, questions, results);

Update();

function Update()
{
	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;

		buttonsElem.innerHTML = "";

		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Баллы: " + quiz.score;
	}
}

function Init()
{
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	let correct = quiz.Click(index);
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		btns[index].className = "button button_correct";
	}

	setTimeout(Update, 1000);
}