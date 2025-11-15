import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Play, Pause, SkipForward, SkipBack, Volume3, Maximize, Heart, Share, Download } from '@fluentui/react-icons';

interface MediaItem {
  id: string;
  title: string;
  titleMy: string;
  titleZh: string;
  description: string;
  descriptionMy: string;
  descriptionZh: string;
  thumbnail: string;
  duration: string;
  quality: string;
  category: string;
  rating: number;
  year: number;
  genre: string[];
  language: string[];
  isLive?: boolean;
  isPremium?: boolean;
}

const EntertainmentPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Content', nameMy: 'အားလုံး', nameZh: '全部内容' },
    { id: 'movies', name: 'Movies', nameMy: 'ရုပ်ရှင်များ', nameZh: '电影' },
    { id: 'tv', name: 'TV Shows', nameMy: 'တီဗီအစီအစဉ်များ', nameZh: '电视节目' },
    { id: 'live', name: 'Live TV', nameMy: 'တိုက်ရိုက်ထုတ်လွှင့်မှု', nameZh: '直播电视' },
    { id: 'sports', name: 'Sports', nameMy: 'အားကစား', nameZh: '体育' },
    { id: 'news', name: 'News', nameMy: 'သတင်းများ', nameZh: '新闻' },
    { id: 'music', name: 'Music', nameMy: 'ဂီတ', nameZh: '音乐' },
    { id: 'games', name: 'Games', nameMy: 'ဂိမ်းများ', nameZh: '游戏' }
  ];

  const featuredContent: MediaItem[] = [
    {
      id: '1',
      title: 'Myanmar Golden Age Cinema',
      titleMy: 'မြန်မာ ရွှေခေတ် ရုပ်ရှင်',
      titleZh: '缅甸黄金时代电影',
      description: 'Classic Myanmar films from the golden era of cinema',
      descriptionMy: 'ရုပ်ရှင်လုပ်ငန်း ရွှေခေတ်မှ ဂန္တဝင် မြန်မာရုပ်ရှင်များ',
      descriptionZh: '缅甸电影黄金时代的经典影片',
      thumbnail: '/images/myanmar-cinema.jpg',
      duration: '2h 15m',
      quality: '4K HDR',
      category: 'movies',
      rating: 4.8,
      year: 1960,
      genre: ['Drama', 'Romance'],
      language: ['Myanmar', 'English'],
      isPremium: true
    },
    {
      id: '2',
      title: 'ASEAN Sports Championship Live',
      titleMy: 'အာဆီယံ အားကစားချန်ပီယံရှစ် တိုက်ရိုက်',
      titleZh: '东盟体育锦标赛直播',
      description: 'Live coverage of ASEAN sports events and championships',
      descriptionMy: 'အာဆီယံ အားကစားပွဲများနှင့် ချန်ပီယံရှစ်များ တိုက်ရိုက်ထုတ်လွှင့်မှု',
      descriptionZh: '东盟体育赛事和锦标赛的现场直播',
      thumbnail: '/images/asean-sports.jpg',
      duration: 'Live',
      quality: '4K HDR',
      category: 'sports',
      rating: 4.9,
      year: 2025,
      genre: ['Sports', 'Live'],
      language: ['English', 'Myanmar', 'Thai', 'Vietnamese'],
      isLive: true,
      isPremium: true
    },
    {
      id: '3',
      title: 'K-Drama Premium Collection',
      titleMy: 'ကိုရီးယား ဒရာမာ ပရီမီယံ စုစည်းမှု',
      titleZh: '韩剧高级收藏',
      description: 'Latest Korean dramas with Myanmar and Chinese subtitles',
      descriptionMy: 'မြန်မာနှင့် တရုတ် စာတန်းများပါသော နောက်ဆုံး ကိုရီးယားဒရာမာများ',
      descriptionZh: '最新韩剧，配有缅甸语和中文字幕',
      thumbnail: '/images/k-drama.jpg',
      duration: '16 episodes',
      quality: '4K HDR',
      category: 'tv',
      rating: 4.7,
      year: 2025,
      genre: ['Romance', 'Drama'],
      language: ['Korean', 'Myanmar', 'Chinese'],
      isPremium: true
    },
    {
      id: '4',
      title: 'Myanmar Traditional Music',
      titleMy: 'မြန်မာ ရိုးရာ ဂီတ',
      titleZh: '缅甸传统音乐',
      description: 'Traditional Myanmar music and cultural performances',
      descriptionMy: 'မြန်မာ ရိုးရာဂီတနှင့် ယဉ်ကျေးမှု ဖျော်ဖြေပွဲများ',
      descriptionZh: '缅甸传统音乐和文化表演',
      thumbnail: '/images/myanmar-music.jpg',
      duration: '45m',
      quality: 'HD Audio',
      category: 'music',
      rating: 4.6,
      year: 2024,
      genre: ['Traditional', 'Cultural'],
      language: ['Myanmar'],
      isPremium: false
    }
  ];

  const filteredContent = featuredContent.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleMy.includes(searchQuery) ||
      item.titleZh.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const getTitle = (item: MediaItem) => {
    switch (currentLanguage) {
      case 'my': return item.titleMy;
      case 'zh': return item.titleZh;
      default: return item.title;
    }
  };

  const getDescription = (item: MediaItem) => {
    switch (currentLanguage) {
      case 'my': return item.descriptionMy;
      case 'zh': return item.descriptionZh;
      default: return item.description;
    }
  };

  const getCategoryName = (category: any) => {
    switch (currentLanguage) {
      case 'my': return category.nameMy;
      case 'zh': return category.nameZh;
      default: return category.name;
    }
  };

  const handlePlay = (media: MediaItem) => {
    setCurrentMedia(media);
    setIsPlaying(true);
  };

  return (
    <>
      <Head>
        <title>Entertainment Hub - eSIM Myanmar Premium Streaming</title>
        <meta name="description" content="Stream premium movies, TV shows, live sports, and music with eSIM Myanmar's ultra-fast 5G entertainment server" />
        <meta name="keywords" content="streaming, entertainment, movies, TV shows, sports, music, Myanmar, ASEAN, 5G" />
        <meta property="og:title" content="Entertainment Hub - eSIM Myanmar" />
        <meta property="og:description" content="Premium streaming content with 4K HDR quality" />
        <meta property="og:image" content="/images/og-entertainment.jpg" />
        <link rel="canonical" href="https://esim.com.mm/entertainment" />
      </Head>

      <div className="min-h-screen bg-background">
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                  <span className="text-background font-bold text-lg">e</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-primary">eSIM Myanmar</span>
                  <span className="text-xs text-secondary">Entertainment Server</span>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="/" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Home</a>
                <a href="/entertainment" className="text-accent font-medium">Entertainment</a>
                <a href="/coverage" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Coverage</a>
                <a href="/devices" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Devices</a>
                <a href="/support" className="text-secondary hover:text-accent transition-colors duration-200 font-medium">Support</a>
              </nav>
            </div>
          </div>
        </header>

        <section className="pt-20 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-display font-bold mb-6">Entertainment Hub</h1>
              <p className="text-subtitle max-w-3xl mx-auto mb-8">
                Stream premium content with ultra-fast 5G connectivity. Enjoy movies, TV shows, live sports, and music in stunning 4K HDR quality.
              </p>
              
              <div className="max-w-2xl mx-auto mb-8">
                <div className="glass p-2 rounded-2xl">
                  <input
                    type="text"
                    placeholder="Search movies, shows, sports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-primary placeholder-secondary px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'glass-elevated text-accent border-accent'
                        : 'glass-subtle text-secondary hover:text-primary'
                    }`}
                  >
                    {getCategoryName(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContent.map((item) => (
                <div key={item.id} className="card group cursor-pointer" onClick={() => handlePlay(item)}>
                  <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-xl mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full glass-elevated flex items-center justify-center">
                        <Play className="w-8 h-8 text-accent ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-accent text-background text-xs font-bold rounded-full">
                        {item.quality}
                      </span>
                    </div>

                    {item.isLive && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </span>
                      </div>
                    )}

                    {item.isPremium && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-background text-xs font-bold rounded-full">
                          PREMIUM
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 bg-background/80 text-primary text-xs rounded">
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-title font-semibold line-clamp-2 flex-1">
                        {getTitle(item)}
                      </h3>
                      <div className="flex items-center gap-2 ml-3">
                        <button className="p-2 rounded-lg glass-subtle hover:glass transition-all duration-200">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg glass-subtle hover:glass transition-all duration-200">
                          <Share className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-caption line-clamp-2">
                      {getDescription(item)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i < Math.floor(item.rating) ? 'bg-accent' : 'bg-accent/20'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-secondary">{item.rating}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-secondary">
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.genre.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.language.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-20">
                <div className="glass-elevated p-12 rounded-3xl max-w-md mx-auto">
                  <h3 className="text-title font-semibold mb-4">No content found</h3>
                  <p className="text-caption mb-6">
                    Try adjusting your search or category filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="btn btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {currentMedia && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-2xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-full glass-elevated flex items-center justify-center mx-auto">
                      {isPlaying ? (
                        <Pause className="w-12 h-12 text-accent" />
                      ) : (
                        <Play className="w-12 h-12 text-accent ml-1" />
                      )}
                    </div>
                    <h3 className="text-title font-semibold">{getTitle(currentMedia)}</h3>
                    <p className="text-caption max-w-md">{getDescription(currentMedia)}</p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentMedia(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full glass-elevated flex items-center justify-center"
                >
                  <span className="text-lg">×</span>
                </button>
              </div>

              <div className="glass-elevated p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-0.5" />
                      )}
                    </button>
                    
                    <button className="p-3 rounded-lg glass-subtle hover:glass transition-all duration-200">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    
                    <button className="p-3 rounded-lg glass-subtle hover:glass transition-all duration-200">
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-3 rounded-lg glass-subtle hover:glass transition-all duration-200">
                      <Volume3 className="w-5 h-5" />
                    </button>
                    
                    <button className="p-3 rounded-lg glass-subtle hover:glass transition-all duration-200">
                      <Download className="w-5 h-5" />
                    </button>
                    
                    <button className="p-3 rounded-lg glass-subtle hover:glass transition-all duration-200">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="w-full h-2 bg-accent/20 rounded-full mb-4">
                  <div className="w-1/3 h-full bg-accent rounded-full"></div>
                </div>

                <div className="flex items-center justify-between text-sm text-secondary">
                  <span>12:34</span>
                  <span>{currentMedia.duration}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="py-12 border-t border-accent/20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-background font-bold">e</span>
                </div>
                <span className="text-lg font-semibold">eSIM Myanmar</span>
              </div>
              <p className="text-caption max-w-2xl mx-auto">
                Premium entertainment server with 5G eSIM connectivity across Myanmar and ASEAN
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-secondary">
                <span>esim.com.mm</span>
                <span>info@esim.com.mm</span>
                <span>09650000172</span>
                <span>@eSIMMyanmar</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default EntertainmentPage;