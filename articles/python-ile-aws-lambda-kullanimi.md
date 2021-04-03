Bu yazıda sizlere özellikle son zamanlarda karşımıza çıkmaya başlayan *_‘serverless’_* teknolojisinden ve AWS Lambda’nın python dili ile kullanımından bahsedeceğim.Bu yazıyı yazmaya karar vermedeki temel motivasyonum konunun kod tarafı hakkında Türkçe kaynakların sınırlı olması oldu.

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609367739/Articles/python-ile-aws-lambda-kullanimi/thumbnail.png "Aws Lambda Logo")

## Serverless Nedir?
Serverless, adından anlaşılanın aksine bir sunucunun olmaması değil, sunucu tarafında yapılması gereken işlerin servis sağlayıcısı tarafından yapılması anlamına gelmektedir.Bu sayede sadece kodumuza odaklanabiliyoruz.AWS kullanırken bunun için yapmamız gereken kullanmak istediğimiz programlama dilinde fonksiyonumuzu yazmak ve API Gateway ile deploy etmek.Böylece fonksiyonumuz bir api endpoint’i görevi görecek.

---

## Lambda Function
Konunun iyi anlaşılması için verilen kelimelerin ilk harflerini bir dizi içerisinde veren basit bir proje yapacağız.Bunun için öncelikle Aws Console’a giriş yapıyoruz ve sol üstte bulunan Services menüsünden Lambda’ya giriyoruz.Ardından Create Function butonuna tıkladığımızda karşımıza aşağıdaki ekran geliyor.Fonksiyona vermek istediğimiz adı giriyor ve kullanacağımız dili seçiyoruz.Bu örnekte Python 3.7 kullanacağız.Ardından tekrar Create Function butonuna tıklıyoruz.

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609367816/Articles/python-ile-aws-lambda-kullanimi/1.png "Aws Lambda Logo")

Lambda fonksiyonlarını direkt olarak tarayıcı üzerinde veya kendi tercih ettiğimiz bir text editöründe yazabiliriz.Kendi bilgisayarımızda yazmak ve 3. parti kütüphaneler kullanmak istiyorsak [deployment package](https://docs.aws.amazon.com/lambda/latest/dg/python-package.html) oluşturmamız gerekiyor.Bu konuya da diğer bir yazımda değinmek istiyorum.

Sağ taraftaki Handler alanında ise hangi dosyadaki hangi fonksiyonu çalıştırmak istediğimizi belirtiyoruz. `(dosya-adı.fonksiyon-adı)`

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609367830/Articles/python-ile-aws-lambda-kullanimi/2.png "Aws Lambda Logo")

Artık kodumuzu yazmaya geçebiliriz.Daha önce de belirttiğim gibi oldukça basit proje yapacağız.Aşağıdaki kod bloğunda gördüğümüz üzere `lambda_handler` fonksiyonu 2 parametre alıyor.

* `event` = İsteğimizde göndereceğimiz parametreler event içinde olacak.Yani request body diyebiliriz.
* `context` = Fonksiyonun adı,versiyonu,ayrılan bellek miktarı gibi bilgilerin bulunduğu parametre.

```python
def lambda_handler(event,context):
    return [name[0] for name in event['names']]
```

## Test
Fonksiyonu test etmek için bir test event’i oluşturmamız gerekiyor.Bunun için sağ üstten select a test event sekmesinden configure test events’e tıklayarak aşağıdaki gibi bir test event yazarak create butonu ile oluşturuyoruz.

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609367994/Articles/python-ile-aws-lambda-kullanimi/3.png "Aws Lambda Logo")

Buraya kadar her şeyi doğru yaptıysak test butonuna tıkladığımızda aşağıdaki gibi bir cevap almamız gerekiyor.

```
[
  "S",
  "Y"
]
```
---

## API Gateway
Bu aşamaya kadar python dilini kullanarak bir fonksiyon yazdık ve bunu Aws Lambda servisi üzerinde çalıştırdık.Artık yapmamız gereken bu fonksiyonu dışarıya açmak.

Bunun için Services menüsünden API Gateway’e giriyoruz ve sağ üstten _Create API’a_ tıkladıktan sonra karşımıza gelen ekrandan _REST API_ alanındaki Build butonuna tıkladığımızda karşımıza aşağıdaki ekran geliyor.

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609368024/Articles/python-ile-aws-lambda-kullanimi/4.png "Aws Lambda Logo")

Burada yeni bir REST API oluşturmak istediğimizi belirtiyor ve vermek istediğimiz adı giriyoruz._Create API_ butonuna tıkladığımızda api oluşuyor.

Bir api oluşturduktan sonra yapmamız gereken şey lambda fonksiyonumuzu dışarıya sunacak POST metodunu oluşturmak olacak.

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609368060/Articles/python-ile-aws-lambda-kullanimi/5.gif "Aws Lambda Logo")

Son adım olarak api’ı deploy edeceğiz.Bunun için Actions menüsünden _Deploy API’a_ tıklıyoruz.

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609368097/Articles/python-ile-aws-lambda-kullanimi/6.png "Aws Lambda Logo")

Gelen ekranda “test” adında yeni bir stage oluşturup Deploy butonuna tıklıyoruz.İşlem tamamlandıktan sonra *_Invoke URL_* kısmındaki url’yi sorgu yapmak için kullanabiliriz.Aşağıda gördüğümüz üzere Postman uygulamasından bu url’ye yaptığımız aynı istek aynı cevabı döndürüyor.

![Aws Lambda Logo](https://res.cloudinary.com/valkyrja/image/upload/v1609368312/Articles/python-ile-aws-lambda-kullanimi/7.png "Aws Lambda Logo")

---

> Bu yazıyı okuduğunuz için teşekkür ederim.Umarım faydalı olabilmiştir.Yeni yazılarda görüşmek üzere…