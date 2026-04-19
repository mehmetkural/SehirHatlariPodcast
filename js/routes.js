const ROUTES = [
  {
    id: 'bogaz',
    name: 'Boğaz Hattı',
    subtitle: 'Eminönü → Anadolu Kavağı',
    duration: 95,
    color: '#1565c0',
    emoji: '⚓',
    description: 'İstanbul Boğazı\'nın eşsiz güzelliğini keşfedin. Tarihi surlardan modern köprülere, yalılardan balıkçı köylerine uzanan bu yolculuk, İstanbul\'un ruhunu hissettiriyor.',
    mapCenter: [41.07, 29.06],
    mapZoom: 11,
    stops: [
      {
        id: 'eminonu',
        name: 'Eminönü',
        time: 0,
        lat: 41.0165,
        lng: 28.9740,
        content: [
          'Merhaba ve Şehir Hatları Boğaz yolculuğuna hoş geldiniz! Vapurumuz şimdi İstanbul\'un nabzının attığı yer olan Eminönü\'nden hareket ediyor.',
          'Sağınıza bakın: Yeni Cami, 1597 yılında Sultan III. Mehmed\'in annesi Safiye Sultan\'ın emriyle temeli atılmış; ancak pek çok kesinti yaşandıktan sonra 1663\'te Sultan IV. Mehmed döneminde tamamlanabilmiştir. Altmış altı yıllık bir inşaat hikayesi bu...',
          'Galata Köprüsü\'nün altındaki balıkçılara dikkat edin. Bu köprünün üzerinde balık tutmak, İstanbul\'da neredeyse bir gelenek halini almış. Köprünün bugünkü çelik yapısı 1994 yılına ait; ancak ilk Galata Köprüsü 1845\'te ahşaptan yapılmıştı. Eminönü, Bizans döneminde önemli bir liman bölgesiydi ve "Portus" adıyla anılırdı. Osmanlı\'nın "Altın Boynuz" dediği Haliç ile Boğaz\'ın buluştuğu bu nokta, yüzyıllardır İstanbul\'un kalbi olmaya devam ediyor.'
        ]
      },
      {
        id: 'karakoy',
        name: 'Karaköy',
        time: 10,
        lat: 41.0196,
        lng: 28.9733,
        content: [
          'Karaköy önünden geçerken sağınıza bakın: Galata Kulesi gökyüzüne uzanıyor. 1348 yılında Cenevizliler tarafından inşa edilen bu kule, yaklaşık 67 metre yüksekliğiyle yüzyıllarca İstanbul\'u denizden gelecek tehditlere karşı gözetledi.',
          'Peki ya Galata Kulesi\'nin üzücü bir hikayesi var mı? Evet! 1632 yılında Hezarfen Ahmet Çelebi, kulenin tepesinden kanatlarla atlayarak Üsküdar\'a kadar uçtuğu söylenir. Sultan IV. Murat bu başarıyı hem takdir etmiş hem de korkuya kapılmış; ardından Hezarfen\'i Cezayir\'e sürgüne göndermiştir. "Böyle adam tutmak olmaz" demiş Sultan...',
          'Karaköy, Osmanlı döneminde "Galata" olarak bilinirdi ve Cenevizli tüccarların merkezi olarak işlev görürdü. Bugün modern sanat galerileri, butik kafeler ve tarihi hanlarıyla çok katmanlı bir semt olan Karaköy, İstanbul\'un değişen yüzünü en iyi anlatan yerlerden biri.'
        ]
      },
      {
        id: 'besiktas',
        name: 'Beşiktaş',
        time: 20,
        lat: 41.0424,
        lng: 29.0043,
        content: [
          'Beşiktaş iskelesine yaklaşıyoruz. Sol tarafınızda görkemli Çırağan Sarayı\'nı göreceksiniz. 1871 yılında Sultan Abdülaziz tarafından yaptırılan bu Osmanlı sarayı, 1910\'da büyük bir yangına uğrayarak harabeye döndü.',
          'Uzun yıllar harabe halde kalan saray, 1980\'lerde restore edilerek bugünkü lüks otele dönüştürüldü. Beşiktaş\'ın ardındaki Yıldız Parkı ise 16. yüzyıldan bu yana saray bahçesi olarak kullanılıyor. Sultan II. Abdülhamid, tahttan indirilene dek 30 yılı aşkın süre bu parkın içindeki sarayda yaşadı.',
          'Beşiktaş adının kökeni hakkında ilginç bir rivayet var: Hz. Peygamber\'in İstanbul\'a gönderdiği kutsal emanetler arasında bir "taş beşik" bulunduğu ve bu iskelenin yanında korunduğu söylenir. Gerçek mi, efsane mi? İstanbul\'da çoğu zaman ikisi iç içe geçer.'
        ]
      },
      {
        id: 'ortakoy',
        name: 'Ortaköy',
        time: 27,
        lat: 41.0483,
        lng: 29.0261,
        content: [
          'Ve işte İstanbul\'un belki de en ikonik manzarası: Ortaköy! Büyük Mecidiye Camii, sanki Boğaz\'la bütünleşmiş gibi kıyıda duruyor. 1854–1855 yılları arasında Nikoğos Balyan tarafından tasarlanan bu Neobarok cami, arkasındaki Boğaz Köprüsü ile birlikte dünyanın en çok fotoğraflanan sahnelerinden birini oluşturuyor.',
          'Biraz sağınıza bakın: Boğaz Köprüsü, bugün resmi adıyla 15 Temmuz Şehitler Köprüsü. 1973 yılında açılan bu asma köprü, 1074 metre uzunluğuyla Avrupa ile Asya\'yı birleştiriyor. İlk açıldığında dünyanın dördüncü büyük asma köprüsüydü.',
          'Ortaköy tarihsel olarak İstanbul\'un en kozmopolit semtlerinden biriydi. Rum, Ermeni, Yahudi ve Müslüman toplulukların yan yana yaşadığı bu mahallede bugün hâlâ çeşitli ibadethaneler görülebilir. Aynı sokak üzerinde cami, kilise ve sinagog... İstanbul\'un çoğulcu mirasının en güzel örneği.'
        ]
      },
      {
        id: 'arnavutkoy',
        name: 'Arnavutköy',
        time: 35,
        lat: 41.0584,
        lng: 29.0457,
        content: [
          'Arnavutköy\'den geçiyoruz. Bu zarif iskele, Boğaz kıyısının belki de en iyi korunmuş geleneksel mimarisine sahip. Sahil boyunca dizilen ahşap yalılar ve bağ evleri, sanki zamanın durduğu bir tabloya benzemiyor mu?',
          'Arnavutköy\'ün adı "Arnavutların köyü" anlamına geliyor ve 15. yüzyılda İstanbul\'un fethinin ardından buraya yerleştirilen Arnavut göçmenlerden geliyor. Ancak zamanla bölge büyük bir Rum topluluğunun yurduna dönüştü; eski kiliseler ve Rum okulu binaları bunun izlerini taşıyor.',
          'Kıyıdan geçen vapurdan dikkatle bakarsanız, bazı yalıların içinden gündelik İstanbul hayatının izlerini görebilirsiniz: çamaşırlar, balkon saksıları, bir pencereden sarkan balık avı ipi... Bu yalıların bazıları 19. yüzyıldan kalma ve mütevazı görünümlerinin arkasında büyük tarihler saklıyor.'
        ]
      },
      {
        id: 'bebek',
        name: 'Bebek',
        time: 42,
        lat: 41.0760,
        lng: 29.0536,
        content: [
          'Bebek Koyu\'na hoş geldiniz! Boğaz\'ın en güzel koylarından biri olan Bebek, hem doğal güzelliği hem de canlı sosyal yaşamıyla tanınıyor. Kıyıdaki Bebek Parkı, sabah sporu yapanlardan akşam oturmalarına kadar her saatten İstanbulluya açık.',
          'Tepelerde görmeye çalışın: Boğaziçi Üniversitesi\'nin kampüsü bu semtte yer alıyor. 1863 yılında Robert College adıyla kurulan ve Osmanlı\'nın ilk modern üniversitesi olan bu okul, pek çok önemli Türk aydınını yetiştirdi. Kampüsün içindeki Albert Long Hall, 1871\'den bu yana ayakta olan tarihi bir yapı.',
          'Bebek, 19. yüzyılda Osmanlı saray çevresi ve yabancı diplomatların gözdesi olmuştu. Kıyıdaki köşkler ve yalılar o dönemin anısını yaşatıyor. Bebek\'in küçük ama güzel iskelesi, bugün de Boğaz vapurlarının durakları arasında en romantik olanlardan biri olma özelliğini koruyor.'
        ]
      },
      {
        id: 'rumelihisari',
        name: 'Rumeli Hisarı',
        time: 48,
        lat: 41.0870,
        lng: 29.0549,
        content: [
          'Şimdi Boğaz\'ın en etkileyici tarihi noktasına geliyoruz. Sağınızda Rumeli Hisarı, karşı kıyıda ise Anadolu Hisarı yükseliyor. Bu iki kale, Boğaz\'ın en dar noktasında — sadece 660 metre — karşılıklı konumlanmış.',
          'Rumeli Hisarı, Fatih Sultan Mehmet tarafından 1452 yılında yalnızca 4 ayda inşa ettirildi. Bu müthiş bir inşaat rekoru! İstanbul\'un fethinden sadece bir yıl önce tamamlanan bu kale, Bizans\'a Karadeniz\'den gelen yardımları kesmek için yapıldı.',
          'Karşı kıyıdaki Anadolu Hisarı ise çok daha eski: 1394\'te Yıldırım Beyazıt tarafından yaptırılmış. İki hisarın bir arada kullanılması, Fatih\'in İstanbul\'u fethetmeden önce ne kadar titiz bir stratejik planlama yaptığını gösteriyor. Bugün Rumeli Hisarı açık hava müzesi olarak ziyaretçilere kapılarını açıyor ve yaz aylarında burada tiyatro ve konser etkinlikleri düzenleniyor.'
        ]
      },
      {
        id: 'kanlica',
        name: 'Kanlıca',
        time: 58,
        lat: 41.1027,
        lng: 29.0613,
        content: [
          'Kanlıca\'ya hoş geldiniz! Vapurun yavaşlamasıyla birlikte burnunuza ne geliyor? Merak etmeyin, hayal değil: Kanlıca yoğurdu gerçekten de efsanevi bir koku ve tat taşıyor.',
          '17. yüzyıldan bu yana üretilen Kanlıca yoğurdu, Osmanlı sarayının sofralarının baş tacıydı. Özel bir yöntemle hazırlanan bu tam yağlı yoğurt, üzerine tatlı tozu serpilerek servis edilir ve tadı eşsizdir. Vapurun burada kısa bir mola verdiği dönemlerde yolcular iskeleye çıkar, bir kase yoğurt yer ve tekrar vapura binerdi. Bu gelenek bugün de devam ediyor!',
          'Amcazade Hüseyin Paşa Yalısı, 17. yüzyıldan kalma ve Boğaz\'ın en eski yalılarından biri olarak günümüze ulaşmış durumda. Bu yalılar, Osmanlı sivil mimarisinin altın çağına ait birer mücevher gibi sahil boyunca diziliyor.'
        ]
      },
      {
        id: 'yenikoy',
        name: 'Yeniköy',
        time: 68,
        lat: 41.1195,
        lng: 29.0657,
        content: [
          'Yeniköy\'den geçiyoruz. Bu semtin adı "yeni köy" anlamına geliyor ama aslında tarihi oldukça köklü. Osmanlı döneminde yabancı büyükelçiliklerin yazlık konutlarına ev sahipliği yapan Yeniköy, bugün hâlâ o dönemin mimarisini büyük ölçüde koruyor.',
          'Kıyıdan geçerken dikkat edin: Art Nouveau tarzı köşkler, geniş bahçeli konaklar ve ahşap yalılar birbirini takip ediyor. 19. yüzyılın sonunda burada yaşayan Rum, Yahudi ve Ermeni toplulukların bıraktığı mimari miras, Yeniköy\'ü adeta canlı bir açık hava müzesine dönüştürüyor.',
          'Yeniköy İskelesi\'nin çevresindeki çınar ağaçları yüz yılı aşkın bir süredir burada duruyor; nice vapuru, nice yolcuyu gördüler. Onlar için biz de geçip giden bir yolcuyuz...'
        ]
      },
      {
        id: 'sariyer',
        name: 'Sarıyer',
        time: 78,
        lat: 41.1681,
        lng: 29.0549,
        content: [
          'Sarıyer, Boğaz\'ın Avrupa yakasının önemli balıkçı merkezlerinden biri. Her sabah taze balıkların satıldığı iskele pazarı, bu semt için vazgeçilmez bir ritüel. Lüfer, çinekop, palamut, istavrit... Boğaz\'ın bereketli sularından çıkan balıkların en tazesi buraya gelir.',
          'Sarıyer\'de mutlaka görülmesi gereken bir yer var: Sadberk Hanım Müzesi. 1980 yılında açılan bu müze, Türkiye\'nin ilk özel müzesidir. Vehbi Koç\'un eşi Sadberk Koç\'a adanan müzede prehistorik dönemden Osmanlı\'ya uzanan binlerce yıllık Anadolu medeniyetinin eserleri sergileniyor.',
          'Kuzey rüzgarlarına açık konumuyla Sarıyer, yazın serin ve ferah, kışın ise oldukça sert bir iklime sahip. Poyraz dediğimiz bu kuzey rüzgarı, zaman zaman Boğaz\'ı adeta kaplar. Sarıyer\'den sonra Karadeniz\'e yaklaştıkça Boğaz genişlemeye başlayacak ve manzara değişecek.'
        ]
      },
      {
        id: 'rumelikavagi',
        name: 'Rumeli Kavağı',
        time: 88,
        lat: 41.2012,
        lng: 29.1056,
        content: [
          'Rumeli Kavağı\'na geldik. Artık Boğaz\'ın ağzına yaklaşıyoruz ve Karadeniz\'in etkisi her geçen dakika daha güçlü hissediliyor. Sular biraz daha dalgalı, rüzgar biraz daha sert...',
          'Bu noktada Boğaz 3.5 km genişliğe ulaşıyor. Burası yüzyıllarca İstanbul\'u denizden koruyan stratejik bir noktaydı. Osmanlı döneminden kalma taş siperler ve gözetleme kuleleri hâlâ görülebiliyor. 18. yüzyılda Fransız mühendislerin yardımıyla güçlendirilen bu savunma hattı, Osmanlı\'nın Karadeniz\'i kontrol altında tutma çabasının bir parçasıydı.',
          'Rumeli Kavağı balık lokantaları, özellikle Karadeniz\'den gelen lüfer ve palamut sezonu ile ünlüdür. Küçük ve sakin bir iskele olan Rumeli Kavağı, şehrin koşturmacasından kaçmak isteyenlerin sığınağı. Burada zaman yavaş akar, çay bardakları hiç boşalmaz.'
        ]
      },
      {
        id: 'anadolukavagi',
        name: 'Anadolu Kavağı',
        time: 95,
        lat: 41.1944,
        lng: 29.1252,
        content: [
          'Ve işte yolculuğumuzun son durağı: Anadolu Kavağı! Boğaz\'ın Karadeniz\'e açıldığı bu noktada vapurdan inince ilk gözünüze çarpacak olan tepedeki Yoros Kalesi olacak.',
          'Yoros Kalesi, Bizans döneminde "Hieron" olarak bilinirdi. Yunancada "kutsal yer" anlamına gelen bu isim, burasının Antik Çağ\'dan bu yana özel bir öneme sahip olduğunu gösteriyor. Kale MS 4. yüzyılda inşa edilmiş; Bizanslılar, Cenevizliler ve ardından Osmanlılar tarafından kullanılmış. Tepeye çıkmak için yaklaşık 20 dakikalık bir yürüyüş gerekiyor, ama yukarıdan tüm Boğaz\'ı görebiliyorsunuz!',
          'Anadolu Kavağı balık restoranları, İstanbul\'un en meşhurlarından. Özellikle mersin balığı ve lakerda buranın imza lezzetleri. Vapurun dönüş saatine kadar taze balık yiyebilir, Karadeniz\'in turkuaz sularına bakarak bu eşsiz yolculuğu kafanızda bir kez daha yaşayabilirsiniz. Bu yolculukla birlikte İstanbul Boğazı\'nın binlerce yıllık tarihine kısa bir yolculuk yaptınız. Umarız keyif aldınız!'
        ]
      }
    ]
  },

  {
    id: 'uskudar_beykoz',
    name: 'Beykoz – Üsküdar Hattı',
    subtitle: 'Üsküdar → Beykoz',
    duration: 60,
    color: '#2d6a4f',
    emoji: '🌿',
    description: 'Anadolu kıyılarının sakin ve yeşil dünyasına bir yolculuk. Tarihi yalılardan Boğaz hisarına, Kanlıca\'dan Beykoz ormanlarına...',
    mapCenter: [41.08, 29.06],
    mapZoom: 12,
    stops: [
      {
        id: 'uskudar',
        name: 'Üsküdar',
        time: 0,
        lat: 41.0225,
        lng: 29.0136,
        content: [
          'Üsküdar\'dan merhaba! Anadolu yakasının kapısı olan bu kadim semt, İstanbul\'un belki de en köklü semtlerinden biri. Bizans döneminde "Khrysopolis" — altın şehir — olarak anılan Üsküdar, Osmanlı\'nın Anadolu\'ya açılan kapısıydı.',
          'Kıyıdan bakın: Karşı yakada Eminönü, Galata ve ardında uzanan İstanbul silueti... Bu manzara, yüzyıllardır şairler ve ressamlar için tükenmez bir ilham kaynağı oldu.',
          'İskelenin hemen önündeki Kız Kulesi, efsanelere göre bir zamanlar bir prensesin hapsedildiği yer. Gerçekte ise deniz feneri, karantina istasyonu ve telgraf üssü olarak kullanıldı. Bugün ise bir kafedir. Bu efsanevi kuleye son bir kez bakarak yola çıkıyoruz...'
        ]
      },
      {
        id: 'kuzguncuk',
        name: 'Kuzguncuk',
        time: 12,
        lat: 41.0313,
        lng: 29.0385,
        content: [
          'Kuzguncuk... Bu küçük ve huzurlu semt, İstanbul\'un en iyi korunmuş tarihi mahallelerinden biri. Bağa sarılmış ahşap evler, renkli boyalı kapılar, taş kaldırım sokaklar... Kuzguncuk sanki zaman durmadan önce fotoğraflandı.',
          'Bu semtin en önemli özelliği, çok kültürlü tarihini bugün hâlâ yaşatıyor olması. Aynı sokakta Rum Ortodoks kilisesi, Ermeni kilisesi ve sinagog yan yana duruyor. Bu üç ibadethanesi olan küçük semt, İstanbul\'un kozmopolit geçmişinin en güzel özetlerinden biri.',
          'Kuzguncuk, son yıllarda sanatçılar, akademisyenler ve yaratıcı insanların tercih ettiği bir semt haline geldi. Küçük atelierlar, organik ürün dükkanları ve nostaljik kahvehaneler, tarihi dokuyu koruyarak semte yeni bir nefes kattı.'
        ]
      },
      {
        id: 'beylerbeyi',
        name: 'Beylerbeyi',
        time: 20,
        lat: 41.0400,
        lng: 29.0452,
        content: [
          'Beylerbeyi\'ne geliyoruz. Bu isim "beylerin beyi" anlamına geliyor ve bu semtin Osmanlı dönemindeki önemini ele veriyor. Kıyıda görmeye çalışın: Beylerbeyi Sarayı, 1865 yılında Sultan Abdülaziz tarafından yaz sarayı olarak inşa ettirildi.',
          'Bu sarayın ilginç bir hikayesi var: Fransız İmparatoriçe Eugenie, 1869\'da Süveyş Kanalı\'nın açılışına katılmak üzere İstanbul\'dan geçerken burada misafir edildi ve sarayın güzelliği karşısında büyülendi. Aynı saray, daha sonra Sultan II. Abdülhamid\'in 1918\'deki ölümüne kadar ev hapsi yeri oldu. İhtişam ve hüzün, hep yan yana...',
          'Beylerbeyi\'nde küçük ama güzel bir çarşı da var. Nargile dükkanları, bakırcılar, zanaatkarlar... Burada İstanbul\'un ticaret geleneği hâlâ yaşıyor.'
        ]
      },
      {
        id: 'cengelkoy',
        name: 'Çengelköy',
        time: 28,
        lat: 41.0523,
        lng: 29.0558,
        content: [
          'Çengelköy... Adı "çengel" yani kanca kelimesinden geliyor; rivayete göre burada demir çıkarılır ve çengel yapılırdı. Ama biz bu semti daha çok lezzetiyle tanıyoruz: Çengelköy salatalığı!',
          'İnce kabuklu, tohumsuz ve gevrek yapısıyla meşhur Çengelköy salatalığı, İstanbul sofralarının vazgeçilmezi olmuş. Bu özel salatalık çeşidi, Boğaz kıyısının nemli ve ılıman ikliminde mükemmel bir şekilde yetişiyor.',
          'Çengelköy aynı zamanda pek çok tarihi yalıya ev sahipliği yapıyor. Kıyıdan geçerken bu ahşap yapıların zarif silüetini izleyin. Çengelköy İskelesi\'nin çevresindeki çınar ağaçları ise semtin en yaşlı sakinleri; belki de bizi geçecekler...'
        ]
      },
      {
        id: 'vanikoy',
        name: 'Vaniköy',
        time: 35,
        lat: 41.0680,
        lng: 29.0576,
        content: [
          'Vaniköy küçük bir iskele ama büyük bir tarihe ev sahipliği yapıyor. Bu semtin adı 17. yüzyılda burada yaşayan Vânî Mehmed Efendi\'den geliyor. Dönemin ünlü din adamı ve vaizi olan Vânî Efendi, IV. Mehmed\'in imamıydı ve sarayda büyük nüfuz sahibiydi.',
          'Vaniköy\'den bakıldığında Boğaz\'ın genişlemeye başladığı görülüyor. Bu noktadan itibaren Boğaz\'ın Karadeniz\'e açılan koluna girilmeye başlanıyor. Kıyılar biraz daha tenha, yapılar biraz daha seyrek...',
          'Bu semtin sakinleri, şehrin koşturmacasından uzakta, huzurlu bir Boğaz yaşantısı sürüyor. Kahvaltı masasından Boğaz manzarası, sabah erken saatlerde balıkçı teknelerinin sesi... Belki de İstanbul\'da yaşamanın en güzel biçimi budur.'
        ]
      },
      {
        id: 'kandilli',
        name: 'Kandilli',
        time: 42,
        lat: 41.0799,
        lng: 29.0547,
        content: [
          'Kandilli, Boğaz\'ın en yüksek kıyı noktalarından birinde konumlanıyor ve bu yüzden Kandilli Rasathanesi tam buraya inşa edilmiş. 1868 yılında kurulan bu rasathane, Türkiye\'nin en eski ve en önemli bilim kurumlarından biri.',
          'Kandilli\'nin adı "kandiller" kelimesinden geliyor. Osmanlı döneminde bu tepede yakılan büyük kandiller, geceleri Boğaz\'da yol gösteren fenerlerin vazifesini görürdü. Denizden geçen gemiler bu ışığı görünce nerede olduklarını anlarlardı.',
          'Boğaz bu noktada biraz kıvrılıyor ve ileri bakıldığında Rumeli Hisarı\'nın kuleleri görünmeye başlıyor. Kandilli Korusu ise arkamızda, tepelerde... Bu orman, İstanbul\'un nefes aldığı yeşil alanlardan biri.'
        ]
      },
      {
        id: 'anadoluhisari',
        name: 'Anadolu Hisarı',
        time: 48,
        lat: 41.0882,
        lng: 29.0674,
        content: [
          'Anadolu Hisarı\'na geliyoruz. Karşı yakada Rumeli Hisarı, bu tarafta Anadolu Hisarı... İki kale, Boğaz\'ın en dar noktasında göz göze. Bu mesafe sadece 660 metre!',
          'Anadolu Hisarı, Rumeli Hisarı\'ndan daha eski: 1394\'te Yıldırım Beyazıt tarafından yaptırılmış. Osmanlı, Boğaz\'ı kontrol altına almak için önce bu kaleden başlamış; yarım asır sonra Fatih Sultan Mehmet karşı yakaya Rumeli Hisarı\'nı ekleyince tam kontrol sağlanmış.',
          'Anadolu Hisarı\'nın çevresi, Boğaz\'ın en şirin köy dokusunu koruyan yerlerden biri. Dar sokaklar, ahşap evler, küçük kahvehaneler... Burada bir öğleden sonra geçirmek, şehrin gürültüsünden tam anlamıyla kaçmak demek.'
        ]
      },
      {
        id: 'kanlica_b',
        name: 'Kanlıca',
        time: 53,
        lat: 41.1027,
        lng: 29.0613,
        content: [
          'Yeniden Kanlıca! Bu durağı Boğaz Hattı\'nda da geçmiştik ama Anadolu yakasından bakmak bambaşka. Şimdi kıyıdaki yalılar çok daha yakın ve ayrıntılı görünüyor.',
          'Kanlıca yoğurdundan bahsetmiştik ama bir de Kanlıca\'nın İncir Bahçesi var. Yüzyıllık incir ağaçlarıyla dolu bu bahçe, yaz aylarında nefis bir gölge sunuyor. Osmanlı döneminde bu bölge büyük çiftlikler ve bostanlarla doluydu.',
          'Kanlıca\'nın tarihi camileri ve çeşmeleri de görülmeye değer. 17. yüzyıldan kalma bu yapılar, Osmanlı\'nın Boğaz kıyısındaki mimari mirasının önemli bir parçası.'
        ]
      },
      {
        id: 'beykoz',
        name: 'Beykoz',
        time: 60,
        lat: 41.1250,
        lng: 29.0956,
        content: [
          'Ve son durağımız Beykoz! "Bey kozu" yani beyin cevizi anlamına gelen bu isim, tarihin derinliklerine uzanıyor. Beykoz, Anadolu yakasının kuzeyinde, Boğaz\'ın Karadeniz\'e açıldığı noktaya yakın bir konumda.',
          'Beykoz, İstanbul\'un en büyük ormanlık alanlarından birine komşu. Aydos Ormanı ve Beykoz Korusu, şehrin akciğerleri gibi çalışıyor. Bu ormanların içindeki tarihi köşkler ve saray kalıntıları, Osmanlı\'nın piknik ve av kültürünün izlerini taşıyor.',
          'Beykoz\'da özellikle ilgi çekici olan bir yapı var: Beykoz Cam Fabrikası. 19. yüzyılda kurulan bu fabrika, Osmanlı\'nın ilk modern cam üretim tesislerinden biriydi. Beykoz iskelesi çevresindeki deniz kokusu ve taze balık... Bu yolculuğun en güzel finali.'
        ]
      }
    ]
  },

  {
    id: 'eminonu_kadikoy',
    name: 'Eminönü – Kadıköy Hattı',
    subtitle: 'Eminönü → Kadıköy',
    duration: 25,
    color: '#9b2335',
    emoji: '🌉',
    description: 'İki kıtayı birbirine bağlayan kısa ama derin bir yolculuk. Tarihin en yoğun geçitleri boyunca Avrupa\'dan Asya\'ya...',
    mapCenter: [41.01, 29.00],
    mapZoom: 13,
    stops: [
      {
        id: 'eminonu_k',
        name: 'Eminönü',
        time: 0,
        lat: 41.0165,
        lng: 28.9740,
        content: [
          'Eminönü\'nden Kadıköy\'e! Bu kısa ama anlamlı yolculuk, her gün binlerce İstanbuluyu iki kıta arasında taşıyan vazgeçilmez bir bağ. Vapura binen her kişinin bir hikayesi var: işe gidenler, pazara gidenler, sevgiliye koşanlar...',
          'Eminönü\'nde son bir kez etrafınıza bakın. Sağda Galata Köprüsü ve arka planda Galata Kulesi. Önünüzde açılan Boğaz. Solda Sarayburnu\'nun yeşil burnu, arkasında Topkapı Sarayı\'nın kubbeleri ve İstanbul silueti.',
          'Sarayburnu, Konstantinopolis\'in kurulduğu ilk nokta sayılır. Romalı İmparator Konstantinus, MS 330 yılında yeni başkentini işte bu burna kurdu. Bugün burada Topkapı Sarayı, Gülhane Parkı ve Arkeoloji Müzesi yer alıyor.'
        ]
      },
      {
        id: 'uskudar_k',
        name: 'Üsküdar',
        time: 12,
        lat: 41.0225,
        lng: 29.0136,
        content: [
          'Üsküdar önünden geçiyoruz. Kıyıda Mihrimah Sultan Camii\'ni göreceksiniz; 16. yüzyılda Mimar Sinan tarafından tasarlanmış ve Kanuni Sultan Süleyman\'ın kızı Mihrimah Sultan adına yaptırılmış.',
          'Sinan ve Mihrimah arasında derin bir bağ olduğu söylenir. Bu caminin minarelerini öyle bir konumlandırmış ki, her yıl Mihrimah\'ın doğum günü olan Ramazan gecelerinde güneş ile ay aynı anda minarelerin arasına sığar.',
          'Üsküdar, İstanbul\'un Anadolu\'ya açılan kapısıydı. Tarihin her döneminde, Asya\'dan gelen kervanlar ve orduların Boğaz\'ı geçip İstanbul\'a girdikleri ya da İstanbul\'dan Anadolu\'ya çıktıkları nokta burası oldu. Hacı olmak için yola çıkanlar, askere gidenler, sürgüne gönderilenler... Hepsi Üsküdar\'dan geçti.'
        ]
      },
      {
        id: 'kadikoy',
        name: 'Kadıköy',
        time: 25,
        lat: 40.9906,
        lng: 29.0239,
        content: [
          'Ve işte Asya yakasının kalbi: Kadıköy! Antik çağda "Khalkedon" olarak bilinen bu semt, İstanbul\'dan bile önce kuruldu; MÖ 685 yılında Megaralı kolonistler tarafından.',
          'Rivayete göre Byzantion (İstanbul) kurulduğunda Khalkedonlular "kör adamların şehri" diye dalga geçildi; çünkü tam karşılarındaki o muhteşem yarımadayı görmemişler!',
          'Kadıköy çarşısı, İstanbul\'un en canlı ve otantik alışveriş mekanlarından biri. Balık pazarından zeytin dükkanlarına, baharatçılardan küçük kırtasiyecilere kadar her şey burada bulunuyor. Moda Sahili ise akşamüstü yürüyüşlerinde İstanbul\'un karşı yakaya bakan en güzel manzarasını sunuyor. Kadıköy\'e hoş geldiniz; artık Asya\'dasınız!'
        ]
      }
    ]
  },

  {
    id: 'halic',
    name: 'Haliç Hattı',
    subtitle: 'Eminönü → Eyüp',
    duration: 35,
    color: '#6a0dad',
    emoji: '🕌',
    description: 'Bizans\'ın Altın Boynuzu boyunca İstanbul\'un manevi kalbine bir yolculuk. Tarihin katmanları üzerinde süzülün.',
    mapCenter: [41.035, 28.95],
    mapZoom: 13,
    stops: [
      {
        id: 'eminonu_h',
        name: 'Eminönü',
        time: 0,
        lat: 41.0165,
        lng: 28.9740,
        content: [
          'Haliç yolculuğuna hoş geldiniz! Haliç, Bizans\'ın "Altın Boynuz" dediği bu kıvrak körfez, İstanbul\'un en önemli tarihi su yollarından biri. Yaklaşık 7.5 km uzunluğuyla kentin içine kadar giriyor.',
          'Neden "Altın Boynuz"? Çünkü körfez, tam bir boynuz şeklinde kıvrılıyor ve Bizans döneminde altın değerinde ticaret gemileriyle dolup taşıyordu. Öyle ki 1453\'te Fatih Sultan Mehmet İstanbul\'u fethederken Bizans, Haliç\'e büyük bir zincir gererek düşman gemilerini içeri sokmadı.',
          'Fatih bu engeli nasıl aştı? Gemilerini karadan yürüttü! Galata tepelerinden Haliç\'e çekilen gemiler, tarihin en deli askeri harekâtlarından birini oluşturdu. Eminönü iskelesi solunuzda kalıyor, Galata Köprüsü\'nün altından geçiyoruz.'
        ]
      },
      {
        id: 'fener_balat',
        name: 'Fener & Balat',
        time: 18,
        lat: 41.0330,
        lng: 28.9490,
        content: [
          'Fener ve Balat semtlerine geliyoruz. Bu iki komşu semt, İstanbul\'un en kadim ve en çok katmanlı mahallelerinden biri. Fener, yüzyıllarca İstanbul Rum Ortodoks Patrikhanesi\'nin merkezi oldu ve bugün de öyle.',
          'Fener\'deki Patrikhane binası, ilk bakışta gösterişsiz görünebilir. Ama bu binanın içinde Hristiyan dünyasının en eski kurumlarından biri yaşıyor; Ekümenik Patrikane, 4. yüzyıldan bu yana burada. İnsanlığın hafızasının taşındığı yerlerden biri...',
          'Balat ise tarihin farklı bir katmanını taşıyor: Yahudi tarihi. 15. yüzyılda İspanya\'dan sürülen Yahudiler, Sultan II. Bayezid\'in daveti üzerine Osmanlı topraklarına yerleşti; büyük bölümü bu mahallede. Bugün Balat, renkli boyalı evleri ve restore edilmiş sinagoglarıyla bütün bir tarihin tanığı.'
        ]
      },
      {
        id: 'eyup',
        name: 'Eyüp Sultan',
        time: 35,
        lat: 41.0490,
        lng: 28.9340,
        content: [
          'Ve Haliç\'in sonunda Eyüp\'e ulaşıyoruz. Eyüp Sultan Camii ve türbesi, İstanbul\'un Müslümanlar için en kutsal mekanı. Hz. Muhammed\'in sancaktarı Ebu Eyyüb el-Ensari, 670 yılındaki Arap kuşatmasında İstanbul önlerinde şehit düştü ve burada defnedildi.',
          'Osmanlı sultanları tahta çıkarken Eyüp Sultan türbesinde kılıç kuşanırdı; bu tören, padişahlığın meşruiyetini dini açıdan onaylayan önemli bir ritüeldi. Eyüp Türbesi, bugün de İstanbul\'un en çok ziyaretçi çeken dini mekanlarından biri.',
          'Tepede Pierre Loti Kahvesi var; bu Fransız yazar, 19. yüzyılda İstanbul\'a aşık olmuş ve Eyüp\'teki bu kahvehanede Haliç manzarasını seyrederek saatler geçirmiş. Bugün teleferikle çıkılan tepeden şehrin büyüleyici manzarası sizi bekliyor. Haliç yolculuğumuz burada son buluyor; tarihin kıyısından geçtik.'
        ]
      }
    ]
  },

  {
    id: 'adalar',
    name: 'Adalar Hattı',
    subtitle: 'Kabataş → Büyükada',
    duration: 90,
    color: '#e07b39',
    emoji: '🏝️',
    description: 'Marmara\'nın incileri Prens Adaları\'na doğru yola çıkın. Arabalar yasak, zamanın yavaş aktığı bu adalarda tarih sizi bekliyor.',
    mapCenter: [40.95, 29.07],
    mapZoom: 11,
    stops: [
      {
        id: 'kabatas',
        name: 'Kabataş',
        time: 0,
        lat: 41.0347,
        lng: 28.9989,
        content: [
          'Kabataş iskelesinden Adalar yolculuğuna hoş geldiniz! Önce biraz açık denize alışmanız gerekecek; Boğaz\'dan çıkınca Marmara\'nın dalgaları biraz farklı hissettiriyor.',
          'Kabataş, Dolmabahçe Sarayı\'nın hemen yakınında yer alıyor. Solunuzda, Beşiktaş yönünde, bu görkemli saray görünüyor. 1856 yılında Sultan Abdülmecid tarafından yaptırılan Dolmabahçe, geleneksel Osmanlı mimarisinin yerini Batılı stile bıraktığının simgesi.',
          'İçindeki dev kristal avize, Kraliçe Victoria\'nın hediyesi; tonlarca ağırlığıyla tavanı tutturan özel bir desteği var. Atatürk\'ün son günlerini geçirdiği yer de bu saray. 10 Kasım 1938\'de burada hayata gözlerini yuman Atatürk\'ün odasındaki tüm saatler o ana, 9.05\'e, durdurulmuştur.'
        ]
      },
      {
        id: 'heybeliada',
        name: 'Heybeliada',
        time: 60,
        lat: 40.8770,
        lng: 29.0935,
        content: [
          'Heybeliada\'ya hoş geldiniz! Prens Adaları\'nın ikinci büyüğü olan bu ada, heybenin iki gözüne benzeyen çift tepesiyle adını almış. Şehrin koşturmacasından uzakta, arabalar yasak, at arabaları ve bisikletler hükümran.',
          'Adada Türk Deniz Harp Okulu bulunuyor; 1942\'den bu yana deniz subayları yetiştiren bu kurumun tarihi binalara sahip kampüsü, adanın simgelerinden biri. Ekümenik Patrikhanenin teoloji okulu Halki Semineri de burada; ancak 1971\'den beri kapalı.',
          'Heybeliada\'da at arabası kiralayıp adayı gezebilir, ahşap villalar arasından geçen dar yolları keşfedebilirsiniz. İskelede taze deniz ürünleri sunan lokantaların kokusu... Buradan ayrılmak zor.'
        ]
      },
      {
        id: 'buyukada',
        name: 'Büyükada',
        time: 90,
        lat: 40.8724,
        lng: 29.1205,
        content: [
          'Ve Büyükada\'ya hoş geldiniz! İstanbul\'un Prens Adaları\'nın en büyüğü olan Büyükada, motor araçlarının olmadığı eşsiz bir sığınak. Burada yol alan at arabaları ve bisikletler dışında motorlu taşıt yok.',
          'Ada, Bizans döneminde sürgün yeri olarak kullanılırdı; düşen prens ve prensesler buraya gönderilirdi. İsim de buradan geliyor: Prens Adaları. Osmanlı döneminde ise İstanbul\'un Rum, Ermeni ve Yahudi topluluklarının tatil mekanına dönüştü; kıyılar boyunca uzanan köşkler bu dönemin mirasını taşıyor.',
          'Aya Yorgi Kilisesi, adanın en yüksek tepesinde duruyor. Her yıl mayıs ayında yapılan dilek yürüyüşü, özel bir ritüel: kiliseye çıkan yokuşta elinde kağıt ipliği tutan yüzlerce kişi, dileklerini mırıldanarak yokuş aşağı ipliği bırakıyor. Büyükada\'da zaman yavaş akar; belki de şehirde kaybettiğimiz huzuru burada bulabiliriz.'
        ]
      }
    ]
  }
];
