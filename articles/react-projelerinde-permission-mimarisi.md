Bir web sitesi programlarken bir kullanıcının giriş yapmış dahi olsa tüm özelliklere erişmesini istemeyebiliriz. Gerekli izinlere sahip olmayan kullanıcıların bazen sayfaya hiç girememesini sağlamamız, bazen de bir butonu disabled olarak göstermemiz gerekebilir. Bu yazıda, bu durumu React kullanılan projelerde nasıl yönetebileceğimizden kendi kullandığım yöntemler ile birlikte bahsedeceğim.

Öncelikle giriş yapmış kullanıcının izinlerinin aşağıdaki gibi bir liste halinde backend tarafından geldiğini varsayalım. Ancak biz bu örneği basit tutmak adına kendimiz tanımlayacağız.

```typescript
const permissions = ['VIEW_PROFILE', 'MANAGE_PROFILE']
```

## Context

Backend’den giriş yapmış kullanıcının izinlerini istediğimizde yukarıdaki gibi bir array’in geldiğini varsayalım. Bunu uygulama içinde kullanmak için global bir şekilde kaydetmemiz gerekiyor. Ben bunun için [Context API](https://beta.reactjs.org/learn/passing-data-deeply-with-context) kullanmayı tercih ediyorum. localStorage, sessionStorage veya redux vb. araçlar da kullanılabilir.

```typescript
// src/context/PermissionContext.tsx

import { createContext } from "react"

interface IPermission {
    permissions: string[]
}

const permissions = ["VIEW_PROFILE", "MANAGE_PROFILE"]

export const PermissionContext = createContext<IPermission>({ permissions })

const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    return (
        <PermissionContext.Provider value={{ permissions }}>
            {children}
        </PermissionContext.Provider>
    )
}

export default PermissionProvider
```

Yukarıda gördüğümüz `PermissionContext.tsx` dosyasında öncelikle bir type tanımlaması yapıyoruz. Context’imiz permissions adında string değerlerden oluşan bir array tutacak. Altında ise daha önce bahsettiğimiz izin tanımlamamız var. Sonrasında ise context oluşturmak için yapmamız gereken çeşitli tanımlamalar var. Bunları detaylı şekilde anlatmayacağım. Dilerseniz [buradan](https://beta.reactjs.org/learn/passing-data-deeply-with-context) daha detaylı şekilde inceleyebilirsiniz.

Uygulamamızda `PermissionProvider` ’ın alt kırılımlarında olan tüm componentlerden value prop’unda paylaşılan değerlere `useContext` kullanarak ulaşabileceğiz. İstersek uygulamanın farklı kısımlarında farklı değerler tutan permission contextler oluşturabiliriz. Ancak ben global bir şekilde tüm uygulamadan aynı izinlere ulaşabilmek için aşağıdaki şekilde kullanacağım.

```typescript
// src/index.tsx

import { createRoot } from "react-dom/client"

import App from "./App"
import PermissionProvider from "./context/PermissionContext"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement!)

root.render(
    <PermissionProvider>
        <App />
    </PermissionProvider>
)
```

---

```typescript
const { permissions } = useContext(PermissionContext)
```

Artık yukarıdaki kod bloğunu kullanarak tüm uygulamadan kullanıcının izinlerine ulaşabiliriz ve izinleri kontrol edip buna göre işlemler yapmak istediğimiz yerlerde kullanabiliriz. Fakat direkt olarak izinleri alıp kontrol edip çeşitli işlemler yapmaktansa bunu bir standarta oturtabiliriz. Bunun en iyi yöntemi ise bana göre custom bir hook oluşturmak. [Daha önceki yazımda](https://yilmazc.com/articles/kendi-usefetch-hook-unuzu-olusturmak) da detaylı bir şekilde anlattığım gibi custom bir React hook’u yazarak aslında bir çok yerde kendimizi tekrar etmekten kaçınabiliyoruz.

## Custom Hook

```typescript
// src/hooks/usePermission.tsx

import { useCallback, useContext } from "react"
import { PermissionContext } from "../context/PermissionContext"

const usePermission = () => {
    const { permissions } = useContext(PermissionContext)

    const hasAll = useCallback(
        (requiredPermissions: string[] = []): boolean => {
            return requiredPermissions.every((p) => permissions.includes(p))
        },
        [permissions]
    )

    const hasAny = useCallback(
        (requiredPermissions: string[] = []): boolean => {
            return requiredPermissions.some((p) => permissions.includes(p))
        },
        [permissions]
    )

    return { hasAll, hasAny, permissions }
}

export default usePermission
```

Yukarıda yazdığımız custom hook ile context’den aldığımız permissions bilgisini kullanarak ihtiyacımız olabilecek kontrolleri yapacak fonksiyonları sunuyoruz. Ayrıca yine özel bir durumda kullanılabilmesi için permissions’ı da döndürüyor bu hook.

`hasAll` parametre olarak verilen array’deki tüm izinlerin context’deki izinler içerisinde olup olmadığını kontrol ederek `boolean` bir değer döndürüyor. Aynı şekilde `hasAny` ise bu kontrolü herhangi biri bulunuyor mu şeklinde yapıyor. Tabi ki bu fonksiyonlar ve hook’un genel yapısı projenin ihtiyaçlarına göre iyileştirilebilir. Kullanım ise aşağıdaki gibi olacak.

```typescript
<header>
    {hasAny(["VIEW_PROFILE", "MANAGE_PROFILE"]) && (
        <h1>Yılmaz Çakmakçı</h1>
    )}
    
    {hasAll(["MANAGE_PROFILE"]) && <button>Manage</button>}
</header>
```

---

> Okuduğunuz için teşekkür ederim, umarım faydalı olmuştur. Örnek projeye [buradan](https://codesandbox.io/s/react-permissions-9u8ojb?file=/src/App.tsx) ulaşabilirsiniz.