## Giriş

Frontend geliştirirken belki de en önemli noktalardan biri yapmış olduğumuz http istekleri. Component içerisindeki mantıksal kısmın büyük bir çoğunluğu API'a http isteğini yapmak, kullanıcıya cevap beklenirken yükleniyor anlamına gelen bir gösterge sunmak ve gelen cevabı çeşitli şekillerde kullanmaktan oluşuyor. 

Bunun için çeşitli state değişkenleri tutmamız gerekiyor. Örneğin *isLoading* ve *data* olabilir. Peki ya birden fazla endpoint'e istek atmamız gerekiyorsa? Aynı değişkenleri her istek için ayrı ayrı oluşturmamız gerekecek. Bir de hata aldığımız durumları eklersek, kod içinde gereksiz bir kalabalık ve yönetilmesi zor bir component ile karşı karşıya kalıyoruz.

Bu duruma çare olarak, benim de React yazmaya başlamamın hemen sonrasında çıkan ve kullanmaktan oldukça keyif aldığım React Hooks'u kullanacağız. React'in bize sağlamış olduğu birçok hook'un yanında kendi hooklarımızı da yazabiliyoruz. Ayrıca `useState` , `useEffect` ve diğer tüm hookları da bunların içerisinde kullanabiliyoruz.


> Aslında bu işi ve daha fazlasını bizim için yapan kütüphaneler var. Bkz: [useSWR](https://swr.vercel.app/) ve [react-query](https://react-query.tanstack.com/). Bunları kullanmama sebebim küçük ölçekli bir uygulama için fazla optimizasyon barındırmaları.

-----

Custom bir React Hook'u aslında diğer hookları kullanabildiğiniz bir JavaScript fonksiyonu ve isimlerinin *use* ile başlaması öneriliyor. Ben yazdığım custom hookları `hooks` adında bir klasör içerisinde ayrı dosyalarda tutmayı tercih ediyorum. O yüzden `useFetch` adında bir dosya oluşturacağım ve fonksiyonumu buraya yazacağım.



```javascript
// useFetch.js

import { useEffect, useState, useCallback } from 'react'

const useFetch = (fetcher, { params = {}, immediate = false } = {}) => {
    const [loading, setLoading] = useState(false)
    const [data, setValue] = useState(null)
    const [error, setError] = useState(null)

    return [loading, data, error]
}

export default useFetch
```



- **Fetcher fonksiyonu**

  useFetch, birinci parametre olarak asenkron bir fonksiyon alıyor. 

<u>**Örnek**</u>

```javascript
export const _getTodos = async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`)

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return res.data
}
```

Burada önemli olan bir konu da bu hook'un parametre olarak url mi yoksa http isteğini yapacak fonksiyon mu alacağı. Benim yaptığım projelerde tercihim bir dosyada isteklerin tamamını farklı fonksiyonlarda tutmak ve hook içerisine de fonksiyon olarak almak oluyor. Bununla birlikte Axios ile interceptor yapısı kurarak isteklerin aynı instance üzerinden yapılmasını da sağlıyorum ve bunun hakkında da ilerleyen günlerde bir yazı yazmak istiyorum.

- **Options nesnesi**
  
  Bu nesnenin içindeki `params` aslında fetcher fonksiyonumuzun parametreleri. Bu parametreleri buradan veya birazdan anlatacağım bir yerden daha verebiliriz.
  
  `immediate` ise component mount olduğu anda istek yapılıp yapılmayacağını belirleyen bir parametre.

* **Geri döndürülen değerler**

  Bazı durumlar tutup component içerisinde kullanacaklarımızı döndüreceğiz. Burada farklı yöntemler kullanabilirsiniz. Örneğin, *error* ve *loading'i* ayırmayıp tek bir durum tutabilirdik veya loading tutmayıp *data* yoksa yükleniyor varsayımı yapabilirdik.

  Array olarak döndürmemin sebebi ise component içerisinde kullanıldığında isimlendirmenin daha kolay olması.

-------

Şimdi sıra asıl işi yapacak olan `execute` fonksiyonunda.

```javascript
const execute = useCallback(
  (executeParams) => {
    setLoading(true)
    setValue(null)
    setError(null)

    return fetcher(executeParams ? executeParams : params)
      .then((response) => {
      	setValue(response)
    })
      .catch((error) => {
      	setError(error)
    })
      .finally(() => {
      	setLoading(false)
    })
  },
  [fetcher]
)

useEffect(() => {
  if (immediate) {
    execute()
  }
}, [execute, immediate])
```



- Eğer `useCallback` kullanmasaydık parametre olarak verdiğimiz fetcher fonksiyonunun referansı her renderda değişeceği için hook içinde de tekrar tanımlanmış olacaktı. Fakat şu anda sadece `fetcher` değişirse yeniden tanımlanacak. 
- ` useEffect`  içerisinde eğer component mount olduğunda çalışması istenmiyorsa engelleyecek bir kontrol ekliyoruz. 



```javascript
return [loading, data, error, execute]
```



Son olarak `execute` fonksiyonunu da döndüreceğiz. Çünkü component içerisinde istenilen zamanda kullanılması gerekiyor. Buradaki önemli nokta şu; eğer `execute` parametre alırsa diğer taraftan gelen parametreyi geçersiz kılıyor.



Hook'u component içinde şu şekilde kullanabiliriz. Her componentde tekrar tekrar durumlar tutmaktansa çok daha temiz olduğunu düşünüyorum.

 ```javascript
const [loading, todos, error] = useFetch(_getTodos, {
	immediate: true
})
 ```



-----



Okuduğunuz için teşekkür ederim. Yazdığımız hook'a ve örneklere [buradan](https://codesandbox.io/s/affectionate-satoshi-f0wes) ulaşabilirsiniz. Diğer yazılarda görüşmek üzere...