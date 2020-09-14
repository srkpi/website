<?php
//Не должно быть никакого вывода, чтобы работал fpfd (echo, var_dump...)
//!!!! Важно Кодировка !!!
// На данный момент кодировку cp1251 точно поддерживают шрифты:
// SetFont('Times','',12);	

error_reporting(E_ALL); 
ini_set('display_errors', 1);

define('FPDF_FONTPATH','fpdf/font/'); // Подключение шрифта
require('fpdf/fpdf.php');             // подключение библиотеки

class PDF extends FPDF
{
	function HeaderZaiava($dataHeader) // шапка 
	{	
		$this->SetFont('Times','',14);
		//$this->Cell(190,6,'',1,0,'C');$this->Ln();
		foreach($dataHeader as $row)
		{
		$text01="Головному бухгалтеру";
		$text02="КПІ ім. Ігоря Сікорського";
		$text03="Людмилі СУББОТІНІЙ";
		$text04="студента/аспіранта";
		$text05="(факультет, група)";
		$text06="(ПІБ повністю)";
		$text07="моб. тел.";
		$wT04=$this->GetStringWidth($text04)+2;
		$wT07=$this->GetStringWidth($text07)+2;
		$wPIB=$this->GetStringWidth($row['Name'])+2;
		
		IF ($wPIB <80){
			$wHeader=80;}
		ELSE $wHeader=$wPIB;

		$this->Cell(190-$wHeader,6,"",'',0,'C'); $this->Cell($wHeader,6,$text01,'',0,'L'); $this->Ln();
		$this->Cell(190-$wHeader,6,"",'',0,'C'); $this->Cell($wHeader,6,$text02,'',0,'L'); $this->Ln();
		$this->Cell(190-$wHeader,6,"",'',0,'C'); $this->Cell($wHeader,6,$text03,'',0,'L'); $this->Ln();
		$this->Cell(190-$wHeader,6,"",'',0,'C'); $this->Cell($wT04,6,$text04,'',0,'L'); $this->Cell($wHeader-$wT04,6,$row['Faculty'].", ".$row['Group'],'B',0,'C'); $this->Ln();
		
		$this->SetFont('Times','',7); //подстрочный текст
		$this->Cell(190-$wHeader,3,"",'',0,'C'); $this->Cell($wT04,3,"",'',0,'L'); $this->Cell($wHeader-$wT04,3,$text05,'',0,'C'); $this->Ln();
		$this->SetFont('Times','',14);
				
		$this->Cell(190-$wHeader,6,"",'',0,'C'); $this->Cell($wHeader,6,$row['Name'],'B',0,'C'); $this->Ln();
		
		$this->SetFont('Times','',7); //подстрочный текст
		$this->Cell(190-$wHeader,3,"",'',0,'C'); $this->Cell($wHeader,3,$text06,'',0,'C'); $this->Ln();
		$this->SetFont('Times','',14);
		
		$this->Cell(190-$wHeader,6,"",'',0,'C'); $this->Cell($wT07,6,$text07,'',0,'L'); $this->Cell($wHeader-$wT07,6,$row['MobPhone'],'B',0,'C');$this->Ln(); $this->Ln();

		}
	}
	 function Zaiava($dataHeader)
	 {
		 $this->Cell(190,6,"ЗАЯВА",'',0,'C');  $this->Ln();$this->Ln();
		 
		 foreach($dataHeader as $row)
		{
			$text11="Прошу перерахувати доходи до ";
			$wT11=$this->GetStringWidth($text11);
			$this->Cell(10); $this->Cell($wT11,8,$text11,'',0,'L'); $this->Cell(180-$wT11,6,$row['Bank'],'B',0,'C'); $this->Ln();$this->Ln(2);
			
			$text12="на рахунок №  ";
			$wT12=$this->GetStringWidth($text12);
			$this->Cell($wT12,6,$text12,'',0,'L'); $this->Cell(190-$wT12,6,$row['Account'],'B',0,'C'); $this->Ln();
			
			
			$text13="Ідентифікаційний номер ";
			$wT13=$this->GetStringWidth($text13);
			$this->Cell($wT13,6,$text13,'',0,'L'); $this->Cell(190-$wT13,6,$row['IPN'],'B',0,'C'); $this->Ln();
			
			$this->Ln(); $this->Ln(); $this->Ln();
			
			$date=$row['date'];
			$wDate=$this->GetStringWidth($date);
			
			$this->Cell($wDate,6,$date,'B',0,'L'); $this->Cell(190-3*$wDate); $this->Cell(1.5*$wDate,6,"",'B',0,'L'); $this->Ln();
			
			$this->SetFont('Times','',7); //подстрочный текст
			$this->Cell($wDate,3,"(дата)",'',0,'C'); $this->Cell(190-3*$wDate); $this->Cell(1.5*$wDate,3	,"(підпис)",'',0,'C'); $this->Ln();
			$this->SetFont('Times','',14);
			
		}
	 }		 
	
}

$pdf = new PDF('L','mm','A5');

function studentinfo(){
	$res[0]["Faculty"]="ФІОТ";
	$res[0]["Group"]="ІС-92мн";
	$res[0]["Name"]= "М'яча Дмитра Олександровича";
	$res[0]["MobPhone"]= "0671234567";
	$res[0]["Bank"]= "АТ КБ \"ПриватБанк\"";
	$res[0]["Account"]="UA343052990000026208749452253";
	$res[0]["IPN"]="1234567890";
	$res[0]["date"]="13.09.2020 р.";
	return $res;
}
$dataHeader = studentinfo();
$pdf->AddPage();
$pdf->HeaderZaiava($dataHeader);
$pdf->Zaiava($dataHeader);

$pdf->Output('I' ,'application.pdf');
?>