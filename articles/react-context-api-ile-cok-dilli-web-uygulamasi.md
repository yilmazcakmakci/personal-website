Bu yazıda sizlere React’e Hooks özelliğinin de eklenmesiyle daha fazla öne çıkmaya başlayan Context API ile web uygulamalarımızı çok fazla uğraşa girmeden nasıl birden fazla dili destekler hale getirebileceğimizden bahsedeceğim.

## Spoiler

Yapacağımız demonun son hali aşağıdaki gibi olacak. Ayrıca yazıyı yalın tutmak adına stillendirme ile ilgilenmeyeceğim.

![Önizleme](https://miro.medium.com/max/500/1*mIUEnGN96B3VUANGFdJYuQ.gif "Önizleme")

> Bu yazının temel düzeyde React bilgisi olanlara hitap ettiğini düşünerek uygulama oluşturma gibi başlangıç adımlarını atlıyorum.

## React Context API Nedir?

React uygulamalarında component içindeki çeşitli durumları tutmak için **_state_** kullanırız.Bazı durumlarda state’i diğer komponentlere aktarmamız gerekebilir ve bunu **_props_** kullanarak yaparız.Eğer iç içe birçok componentimiz varsa bu yöntemle hepsine teker teker aktarım yapmamız gerekir ki bu da çok zahmetli olur.Bundan dolayı eğer uygulamamızın genelini ilgilendiren bir durum tutmak istiyorsak bunu Context API ile yaparız.

## languages.js

Öncelikle uygulamamızın birden fazla dili desteklemesini istiyorsak tüm metin alanlarını içeren her dil için farklı objectlere ihtiyacımız var.Bunun için uygulamamızın ana dizininde **_languages.js_** dosyasını oluşturuyor ve içerisine aşağıdaki gibi uygulamadaki metin alanlarını ekliyoruz.

```javascript
const tr = {
  title : 'Koronavirüs Nedir?',
  text : 'Koronavirüs (COVID-19) yeni bir virüsten kaynaklanan bulaşıcı bir hastalıktır.',
  tr : 'Türkçe',
  en : 'İngilizce',
  de : 'Almanca'
}

const en = {
  title : 'What is Coronavirus?',
  text : 'Coronavirus (COVID-19) is an infectious disease caused by a new virus.',
  tr : 'Turkish',
  en : 'English',
  de : 'German'
}

const de = {
  title : 'Was ist Coronavirus?',
  text : 'Coronavirus (COVID-19) ist eine Infektionskrankheit, die durch ein neues Virus verursacht wird.',
  tr : 'Türkisch',
  en : 'Englisch',
  de : 'Deutsch'
}

export default {
  tr,
  en,
  de
} // Tek bir object olarak dışarıya açıyoruz.
```

## Context.js

Yukarıda da bahsettiğim gibi bütün uygulamanın kullanacağı bir durum/değişken tutmak istiyorsak Context kullanıyoruz. Biraz daha açmak gerekirse temelde diğerleri gibi bir component oluşturup onu bütün uygulamayı çevreler hale getiriyoruz ve işlemlerimizi bu Context componentinde yapıyoruz.

```javascript
import React, { Component, createContext } from 'react'
import languages from './languages'

export const AppContext = createContext()
export class Context extends Component {
  
  state = {
    currentLang : 'tr' //varsayılan Türkçe
  }

  changeLang = (lang) => {
    this.setState({currentLang : lang})
  }

  render() {
    return (
      <AppContext.Provider value={{changeLang : this.changeLang, texts : languages[this.state.currentLang]}}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default Context
```

Kodu açıklamak gerekirse;

* Context componentini React’in bize sunmuş olduğu `createContext()` metodu ile oluşturmamız gerekiyor.
* Bu componentin state’inde şu anki dili tutan bir değişken tanımlıyoruz ve altında da bu değişkeni verilen değerle değiştiren bir fonksiyon yazıyoruz.
* AppContext.Provider’ın value alanına ise bütün uygulamaya açmak istediğimiz şeyleri veriyoruz.
* Bizim örneğimizde dili değiştirmek için kullanacağımız fonksiyonu ve biraz önce yazdığımız `languages.js`içerisinden `currentLang` alanında tanımlı olan dil için olan metinleri bütün uygulamadan erişilebilir hale getiriyoruz.

## App.js

Biraz önce bahsettiğimiz gibi `Context`componentimiz ile bütün uygulamayı çevreliyoruz.Artık `Text`componenti `Context`ile çevrelendiği için bir önceki aşamada sunduğumuz şeylere ulaşabileceğiz.

```javascript
import React from 'react'
import Context from './Context'
import Text from './Text'

const App = () => {
 return (
  <Context>
   <Text />
  </Context>
 )
}

export default App
```

## Text.js

```javascript
import React, { useContext } from 'react'
import { AppContext } from './Context'

export default Text = () => {

  const { texts, changeLang } = useContext(AppContext)

  return (
    <div style={{margin:'auto', maxWidth:'500px', padding:'10% 0'}}>
      <h1> {texts.title} </h1>
      <p> {texts.text} </p>
      <select onChange={(e) => changeLang(e.target.value)} >
        <option value="tr"> {texts.tr} </option>
        <option value="en"> {texts.en} </option>
        <option value="de"> {texts.de} </option>
      </select>
    </div>
  )
}
```

Kodu açıklayacak olursak;

* `useContext()` hook’unu kullanarak Context componentimizden dışarıya açtığımız object’e ulaşabiliyoruz. Parametre olarak `createContext()` ile oluşturduğumuz `AppContext'i` veriyoruz.
* Uygulamadaki metin alanlarına ise Context’den gelen metinleri giriyoruz.Örneğin, `texts.title` dediğimizde şu anda hangi dil seçili ise `languages.js`dosyamızdan o dilin object’indeki `title`alanı gösterilecek.
* Alt taraftaki select kutusunda ise seçilen dil değiştirildiğinde `changeLang()` fonksiyonu şu anki dili seçili seçeneğin `value`değeri ile değiştiriyor.

---

> Bu yazıyı okuduğunuz için teşekkür ederim.Umarım faydalı olabilmiştir.Yaptığım demonun tüm kodlarına [buradan](https://github.com/yilmazcakmakci/react-multi-lang-demo) ulaşabilirsiniz.Yeni yazılarda görüşmek üzere…