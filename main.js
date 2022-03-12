'use strict'
{
    var kana = document.getElementById('kanaText');
    var word = document.getElementById('text');
    var wordCount = 0;
    var typeMiss = 0;
    var timeLimit = 60;
    var correctAnswerRate = 0;
    var startTime;
    var countDownNumber = 4;

    var wordCountLabel = document.getElementById('wordCount');
    var typeMissLabel = document.getElementById('typeMiss');
    var timeLeftLabel = document.getElementById('timeLeft');
    var correctAnswerRateLabel = document.getElementById('correctAnswerRate');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');

    var minus = document.getElementById('-');
    var q = document.getElementById('q');
    var w = document.getElementById('w');
    var e = document.getElementById('e');
    var r = document.getElementById('r');
    var t = document.getElementById('t');
    var y = document.getElementById('y');
    var u = document.getElementById('u');
    var i = document.getElementById('i');
    var o = document.getElementById('o');
    var p = document.getElementById('p');
    var a = document.getElementById('a');
    var s = document.getElementById('s');
    var d = document.getElementById('d');
    var f = document.getElementById('f');
    var g = document.getElementById('g');
    var h = document.getElementById('h');
    var j = document.getElementById('j');
    var k = document.getElementById('k');
    var l = document.getElementById('l');
    var z = document.getElementById('z');
    var x = document.getElementById('x');
    var c = document.getElementById('c');
    var v = document.getElementById('v');
    var b = document.getElementById('b');
    var n = document.getElementById('n');
    var m = document.getElementById('m');
    var comma = document.getElementById(',');
    var period = document.getElementById('.');

    var keyLists = [minus,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m,comma,period]
    //console.log(keyLists);
    //console.log(a);

    var textLists = [
        'mainitinotiisanadoryokunotumikasanega,rekisiwotukutteikundayo',
        'hetadattaradousiteumakunaroutodoryokusinainda',
        'furikaeranaide,tuneniasuwomezasiteganbarinasai',
        'ningennoneutiha,tesutonotensuudakedekimarumonojanainoyo',
        'tomodatinitasukewomotomerarete,sirankaositeirareruka',
        'waruikotobakaritudukumonjanaiyo',
        'hitonidekite,kimidakenidekinainantekotoarumonka',
        'itibanikenainohajibunnankadamedatoomoikomukotodayo',
        'mirainantetyottositahazumidedondonkawarukara',
        'sekitatetyadamedayo,sorezorejibunnope-sugaarundakara',
        'nayanderuhimani,hitotudemoyarinayo',
        'yokeinakotokangaezunizenryokuwotukusunda',
        'syougaigaattaranorikoerebaii',
        'kutisakiyorimagokoroda',
        'iijanaikaokuretemo,saigomadeganbare',
        'nikonikositerundayo,itumotanosisouni.sositara,hontonisiawaseninareru',
        'furikaettebakariinaide,maewomitesusumanakutya',
        'hontonofannara,otimenotokinikosoouensinakutya'
    ];
    var checkTexts = [];

    var kanaTextLists = [
        '毎日の小さな努力の積み重ねが、歴史を作っていくんだよ',
        'へただったらどうしてうまくなろうと努力しないんだ',
        'ふりかえらないで、つねにあすをめざしてがんばりなさい',
        '人間の値うちは、テストの点数だけできまるものじゃないのよ',
        '友だちに助けを求められて、知らん顔していられるか',
        '悪いことばかり続くもんじゃないよ',
        '人にできて、きみだけにできないなんてことあるもんか',
        'いちばんいけないのはじぶんなんかだめだと思いこむことだよ',
        '未来なんてちょっとしたはずみでどんどん変わるから',
        'せきたてちゃだめだよ、それぞれ自分のペースがあるんだから',
        'なやんでるひまに、ひとつでもやりなよ',
        'よけいなこと考えずに全力をつくすんだ',
        '障害があったらのりこえればいい',
        '口先より真心だ',
        'いいじゃないかおくれても、最後までがんばれ',
        'にこにこしてるんだよ、いつも楽しそうに。そしたら、ほんとにしあわせになれる',
        'ふりかえってばかりいないで、前を見て進まなくちゃ',
        'ほんとのファンなら、落ち目の時にこそおうえんしなくちゃ'
    ]

    

    function toggle () {
        if(start.disabled) {
            start.disabled = false;
            stop.disabled = true;
        } else {
            start.disabled = true;
            stop.disabled = false;
        }
    }
    
    function count () {
        if(timeLimit == 0) {
            text.textContent = `終了　　　　　　　　　　　　　　　　　　　　START ボタンをクリックすると開始します`;
            kanaText.textContent = '';
            clearInterval(startTime);
            start.disabled = false;
            stop.disabled = true;
            correctAnswerRate = Math.floor((wordCount / (wordCount + typeMiss)) * 100 * 10) / 10;
            correctAnswerRateLabel.textContent = correctAnswerRate;
            countDownNumber = 4;
        } else {
            timeLimit -= 1;
            timeLeftLabel.textContent = timeLimit;
        }
    }

    

    function createText() {
        var rnd = Math.floor(Math.random() * textLists.length);

        kana.textContent = kanaTextLists[rnd];
        word.textContent = '';
        checkTexts = textLists[rnd].split('').map(function(value) {
            var span = document.createElement('span');
            span.textContent = value;
            word.appendChild(span);
            return span;
        });
        for(var i = 0; i < keyLists.length; i++) {
                
            if(keyLists[i].textContent == checkTexts[0].textContent) {
                keyLists[i].classList.add('add-green');
                //console.log(keyLists[i].textContent);
            } else {
                keyLists[i].classList.remove('add-green');
            }
        }
        
    }
    

    

    document.addEventListener('keydown', keyDown);

    function keyDown(e) {
        if(timeLimit == 0) {
            text.textContent = '終了　　　　　　　　　　　　　　　　　　　　START ボタンをクリックすると開始します';
            kanaText.textContent = '';
            countDownNumber = 4;
            
        } else {
            if(e.key === checkTexts[0].textContent) {
                //console.log('正解');
                checkTexts[0].className = 'add-blue';
                checkTexts.shift();
                wordCount++;
                wordCountLabel.textContent = wordCount;
    
                if(!checkTexts.length) {
                    createText();
                }
            } else {
                typeMiss++;
                typeMissLabel.textContent = typeMiss;
            }
            for(var i = 0; i < keyLists.length; i++) {
                
                if(keyLists[i].textContent == checkTexts[0].textContent) {
                    keyLists[i].classList.add('add-green');
                    //console.log(keyLists[i].textContent);
                } else {
                    keyLists[i].classList.remove('add-green');
                }
            }
            
        }
        }
    if(timeLimit == 0) {
        toggle();
    } else {
        stop.disabled = true;
    }

    function countDown() {
        if(countDownNumber == 1) {
            clearInterval(id);
                
           start.disabled = true;
            stop.disabled = false;
                
            timeLimit = 60;
            wordCount = 0;
            wordCountLabel.textContent = 0;
            typeMiss = 0;
            typeMissLabel.textContent = 0;
            createText();
            startTime = setInterval(count,1000);
            } else {
                    start.disabled = true;
                    countDownNumber--;
                    text.textContent = countDownNumber;
                   // console.log(countDownNumber);
                
            }
    }
    var id;
    start.addEventListener('click',() => {
        id = setInterval(countDown,1000);
        correctAnswerRateLabel.textContent = 0;
             
        
    });

    stop.addEventListener('click',() => {
        toggle();
        text.textContent = '終了　　　　　START ボタンをクリックすると開始します';
        kanaText.textContent = '';
        wordCount = 0;
        wordCountLabel.textContent = 0;
        typeMiss = 0;
        typeMissLabel.textContent = 0;
        //startTime = Date.now();
        clearInterval(startTime);
        countDownNumber = 4;
    });
}