# Набор зависимостей для проекта, в котором:
## 1. Используется БД для хранения данных
[illuminate/database](https://packagist.org/packages/illuminate/database)

Для данного проекта используется пакет базы данных *illuminate*

```php
#Импортируем Manager из пакета с псевдоименем Capsule
	use Illuminate\Database\Capsule\Manager as Capsule;
	
	#Создаём класс для более удобной работы с пакетом
	class Data{
		function __construct(){
			#Создаём новый экземпляр Capsule
			$capsule = new Capsule;
			#Создаём новое подключение к БД
			$capsule->addConnection([
				'driver' 	=> 	'mysql',
				'host' 		=> 	'localhost',
				'database' 	=> 	'world',
				'username' 	=> 	'root',
				'password' 	=> 	'******',
				'charset' 	=> 	'utf8',
				'collation' => 	'utf8_unicode_ci',
				'prefix' 	=> 	'',
			]);
			#Делаем данное соединение доступным глобально, то есть именно к данной БД можно будет поключиться из других файлов проекта
			$capsule->setAsGlobal();
		}
		#Далее посмотрим как можно обращаться к БД с помощью данного пакета
		function getResultMethodOne(){
			#Из-за того, что мы сделали параметры подключения глобальными, можем подключаться без нового экземпляра Capsule
			#В данном примере мы получаем все строки из таблицы "test" и далее выводим их  
			$results = Capsule::table("test")->get();
			foreach ($results as $result) {
        #Указываем имя столбца, из которого хотим получить значение
				echo $result->id,".",$result->name;
			}
		}
		function getResultMethodTwo(){
			#В данном примере мы выполняем запрос в БД и получаем строки с результатом
			$results = Capsule::select("select * from `test`;");
			foreach ($results as $result) {
        #Указываем имя столбца, из которого хотим получить значение
				echo $result->id,".",$result->name;
			}
		}
	}
	$a=new Data();
	$a->getResultMethodOne();
	$a->getResultMethodTwo();
```

## 2. Используется кеш в памяти для временного хранения сложных запросов к БД
[watson/rememberable](https://packagist.org/packages/watson/rememberable)

Для данного проекта используется пакет кэширования запросов *watson*

Данный пакет работает следующим образом, пользователь выполняет запрос к БД и результат запроса сохраняется в кэше на определённый срок, время хранения регулируется. При таком же запросе данные возьмутся из кэша.

Это позволит сократить время запроса и уменьшить нагрузку на сервер.

```php
#Сохраняет запрос и результат позьзователя в кэше
#Время указывается в секундах
User::()->()->remember(60 * 60)-> get();
```
## 3. Формируются XLS-отчеты на основе данных.
[phpoffice/phpspreadsheet](https://packagist.org/packages/phpoffice/phpspreadsheet)

PhpSpreadsheet - чтение, создание и запись электронных таблиц в PHP - движке электронных таблиц

```php
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

//Создаем экземпляр класса электронной таблицы
$spreadsheet = new Spreadsheet();
//Получаем текущий активный лист
$sheet = $spreadsheet->getActiveSheet();
// Записываем в ячейку A1 данные
$sheet->setCellValue('A1', 'Hello my Friend!');

$writer = new Xlsx($spreadsheet);
//Сохраняем файл в текущей папке, в которой выполняется скрипт.
//Чтобы указать другую папку для сохранения. 
//Прописываем полный путь до папки и указываем имя файла
$writer->save('hello.xlsx');
```
## 4. Формируются PDF-документы на основе данных.
[tecnickcom/tcpdf](https://packagist.org/packages/tecnickcom/tcpdf)

TCPDF - это PHP-класс для генерации PDF-документов и штрих-кодов.

```php
$pdf = new TCPDF();               
$pdf->AddPage();                   
$pdf->Write(1, 'Hello world');   
$pdf->Output('hello_world.pdf');
```

## 5. Отправляются SMS-сообщения для верификации пользователей.
[twilio/sdk](https://packagist.org/packages/twilio/sdk)

PHP-оболочка для API Twilio.

```php
use Twilio\Rest\Client;
$sid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
$token = 'your_auth_token';
$client = new Client($sid, $token);
$client->messages->create(
    '+15558675309',
    [
        'from' => '+15017250604',
        'body' => "Hey Jenny! Good luck on the bar exam!"
    ]
);
```

## 6. Отправляются E-mail-уведомления и рассылки для пользователей.
[symfony/mailer](https://packagist.org/packages/symfony/mailer)

*symfony* помогает отправлять e-mail

```php
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;
$transport = Transport::fromDsn('smtp://localhost');
$mailer = new Mailer($transport);
$email = (new Email())
    ->from('hello@example.com')
    ->to('you@example.com')
    //->cc('cc@example.com')
    //->bcc('bcc@example.com')
    //->replyTo('fabien@example.com')
    //->priority(Email::PRIORITY_HIGH)
    ->subject('Time for Symfony Mailer!')
    ->text('Sending emails is fun again!')
    ->html('<p>See Twig integration for better HTML integration!</p>');

$mailer->send($email);
```
