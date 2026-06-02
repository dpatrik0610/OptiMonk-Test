# Kezdeti gondolatok
## Feladat értelmezés
Ha egy marketinges megnyitja az appot, akkor láthatja a kampányait listázva. ha rákattint egyre, akkor egyből láthatóvá válik, hogy az adott kampányon belül melyik lépés az, ahol a felhasználói / vásárlói elhagyják a folyamatot. Vizuálisan kiemelkedik az a lépés, ahol a legroszabb a konverzió arány.

Ebből kifolyólag a (logikai) fejlesztési folyamat lépései kezdetben körvonalazódnak.
- A kapott JSON adathalmazból modellek felállítása.
- Az adatok TS objektumokká alakítása, majd egy funnel, vagyis lépések sorozatának felépítése.
- A kinyert objektumokból metrikák számítása.

### Metrikák számítása egy adott kampányhoz
Milyen mérések szükségesek? A feladat leírja.
- Konverzió / Továbbhaladó látogatók aránya lépésenként.
- DropOff vagyis elhagyók aránya: Azon felhasználók aránya, akik az adott lépésből nem jutottak tovább a következő lépésre. Ez a "tovább kattintókhoz" képest inverz fv.
- A funnel legrosszabb teljesítményű lépésének meghatározása.
- (Extra) Overall Konverzió számítás Első lépéshez képest a kampány végéig.

Ahhoz, hogy megkapjuk a lépéssorozat metrikáit, arányokat állítunk föl. (ConversionRate)
Az adott arányokat úgy kapjuk meg, hogy megnézzük lépésenként a Továbbhaladók / Látogatók arányát.
Hol található a legnagyobb DropOff?
- Erre kétféle megoldásom is lenne. Az egyik a legnagyobb DropOff% megtalálásából ered. Ezt alkalmazom.
- Másik megoldás  pedig az lenne, ha végigmennénk a lépéseken, hogy hol hagyta el a legtöbb ember az oldalt / vásárlást.
Miért döntök az első megoldás mellett? Azért, mert arányosan nézi, hogy hol a legroszabb. Futtattam egy rövid python tesztet a második megoldásra és nagy kampányok esetén legtöbbször az 1. lépésnél veszíti el a legtöbb látogatót a kampány. Bár ez nyers adatoktól függhet.
_Megjegyzés: Rákérdeztem Claude AI-ra, hogy milyen opcióim vannak még. Lehet itt akár egy súlyozott érték szerint is eljárni, de kevésbé egyszerű elmagyarázni mondjuk egy marketingesnek. (score = dropOffRate × (stepViews / totalViews))._

Ezen metrikák kiszámítása után megkapjuk, hogy egy Kampányról pontosan mi mindent tudunk. Ez lesz majd a CampaignMetrics modell / típus.

## Vizuális elemek

### Felosztás
- Bal oldalt: Egyéni tapasztalat alapján szerintem egy vertikális navigációs sáv / sidebar a legalkalmasabb adatok kilistázására. Ez egy bal oldali sidebar lesz. Ha túl sok kampány elemünk lenne, akkor egy fix magasság és görgethető állapot az ideális.
Lehetséges továbbfejlesztések:
    - kampány kereső SearchBar
    - eszköztípus szerinti szűrés
    - egyéb filterek

- Jobb oldalt: Adott kampányra való navigálás (kattintás) után az adott kampány metrikáit és a fő funkciót mutatja meg.
Itt fontos, hogy minden lépés könnyen elkülöníthető legyen egymástól, az adatok könnyen értelmezhetőek legyenek.
Kell egy módszer arra, hogy láthatóan kiemeljük a legroszabb konverzióval rendelkező lépést.


## Backend elhagyása

Megjegyzés, hogy a backendes tapasztalataimból kifolyólag, a komplexebb feladatok üzleti logikáját (pl. metrikák számítását) legszívesebben API oldalon végezném, hogy a szervert terheljük és ne a klienst. Jelen esetben a feladat egyszerűségére tekintettel ezt elhagyom, mivel az adat forrása egy egyszerű json file.

## További gondolatok
- React TS múltamból eredően itt is a TypeScriptet helyezen előnyben a sima JS helyett.
- A tiszta frontend kód érdekében komponensek mentén építem föl az appot, törekszem a "Separation of Concerns" elvet betartani.
- Reszponzivitás priorizálása fontos a telefonos nézet miatt.