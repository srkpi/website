<?php
//Не должно быть никакого вывода, чтобы работал fpfd (echo, var_dump...)
//!!!! Важно Кодировка !!!
// На данный момент кодировку cp1251 точно поддерживают шрифты:
// SetFont('Times','',12);	

error_reporting(E_ALL); 
ini_set('display_errors', 1);

define('FPDF_FONTPATH','fpdf/font/'); // Подключение шрифта
require('fpdf/fpdf.php');             // подключение библиотеки

$pdf = new FPDF('L','mm','A5');
$pdf->SetFont('Times','',14);

$pdf->AddPage();

$text01="Головному бухгалтеру";
$text02="КПІ ім. Ігоря Сікорського";
$text03="Людмилі СУББОТІНІЙ";
$text04="студента/аспіранта";
$text05="(факультет, група)";
$text06="(ПІБ повністю)";
$text07="моб. тел.";
$wT04=$pdf->GetStringWidth($text04)+2;
$wT07=$pdf->GetStringWidth($text07)+2;
$wPIB=$pdf->GetStringWidth('Прізвище')+2;
		
IF ($wPIB <80){
	$wHeader=80;}
ELSE $wHeader=$wPIB;

$pdf->Cell(190-$wHeader,6,"",'',0,'C'); $pdf->Cell($wHeader,6,$text01,'',0,'L'); $pdf->Ln();
$pdf->Cell(190-$wHeader,6,"",'',0,'C'); $pdf->Cell($wHeader,6,$text02,'',0,'L'); $pdf->Ln();
$pdf->Cell(190-$wHeader,6,"",'',0,'C'); $pdf->Cell($wHeader,6,$text03,'',0,'L'); $pdf->Ln();
$pdf->Cell(190-$wHeader,6,"",'',0,'C'); $pdf->Cell($wT04,6,$text04,'',0,'L'); $pdf->Cell($wHeader-$wT04,6,'ф-т'.", ".'група','B',0,'C'); $pdf->Ln();
		
$pdf->SetFont('Times','',7); //подстрочный текст
$pdf->Cell(190-$wHeader,3,"",'',0,'C'); $pdf->Cell($wT04,3,"",'',0,'L'); $pdf->Cell($wHeader-$wT04,3,$text05,'',0,'C'); $pdf->Ln();
$pdf->SetFont('Times','',14);
				
$pdf->Cell(190-$wHeader,6,"",'',0,'C'); $pdf->Cell($wHeader,6,'Булавко','B',0,'C'); $pdf->Ln();
		
$pdf->SetFont('Times','',7); //подстрочный текст
$pdf->Cell(190-$wHeader,3,"",'',0,'C'); $pdf->Cell($wHeader,3,$text06,'',0,'C'); $pdf->Ln();
$pdf->SetFont('Times','',14);
		
$pdf->Cell(190-$wHeader,6,"",'',0,'C'); $pdf->Cell($wT07,6,$text07,'',0,'L'); $pdf->Cell($wHeader-$wT07,6,'Фоне','B',0,'C');$pdf->Ln(); $pdf->Ln();

$pdf->Cell(190,6,"ЗАЯВА",'',0,'C');  $pdf->Ln();$pdf->Ln();

$text11="Прошу перерахувати доходи до ";
$wT11=$pdf->GetStringWidth($text11);
$pdf->Cell(10); $pdf->Cell($wT11,8,$text11,'',0,'L'); $pdf->Cell(180-$wT11,6,'Bank','B',0,'C'); $pdf->Ln();$pdf->Ln(2);
		 
$text12="на рахунок №  ";
$wT12=$pdf->GetStringWidth($text12);
$pdf->Cell($wT12,6,$text12,'',0,'L'); $pdf->Cell(190-$wT12,6,'Account','B',0,'C'); $pdf->Ln();
		 
		 
$text13="Ідентифікаційний номер ";
$wT13=$pdf->GetStringWidth($text13);
$pdf->Cell($wT13,6,$text13,'',0,'L'); $pdf->Cell(190-$wT13,6,'IPN','B',0,'C'); $pdf->Ln();
		 
$pdf->Ln(); $pdf->Ln(); $pdf->Ln();
		 
$date="Дата";
$wDate=$pdf->GetStringWidth($date);
		 
$pdf->Cell($wDate,6,$date,'B',0,'L'); $pdf->Cell(190-3*$wDate); $pdf->Cell(1.5*$wDate,6,"",'B',0,'L'); $pdf->Ln();
		 
$pdf->SetFont('Times','',7); //подстрочный текст
$pdf->Cell($wDate,3,"(дата)",'',0,'C'); $pdf->Cell(190-3*$wDate); $pdf->Cell(1.5*$wDate,3	,"(підпис)",'',0,'C'); $pdf->Ln();
$pdf->SetFont('Times','',14);

$pdf->Output('I' ,'application.pdf');
?>