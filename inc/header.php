<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-book</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div id="wrap" class="double">
        <header>
            <h1 class="logo"></h1>
                <ul class="utill">
                    <li class="list">
                        <ul>
                            <li>목차 보기</li>
                        </ul>
                    </li>
                    <li class="pair">
                        <ul>
                            <li class="one" onclick="sib_class(this); ">한장씩 보기</li>
                            <li class="two dis_none" onclick="sib_class(this);">두장씩 보기</li>
                        </ul>
                    </li>
                    <li class="zoom">
                        <ul>
                            <li>확대하기</li>
                            <li class="dis_none">축소하기</li>
                        </ul>
                    </li>
                </ul><!-- .utill -->
        </header>