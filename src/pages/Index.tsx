import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0
  });
  
  const [shape, setShape] = useState('circle');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<any[]>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    businessType: 'individual'
  });

  const addToCart = () => {
    if (dimensions.width && dimensions.height && dimensions.depth) {
      const newItem = {
        id: Date.now(),
        dimensions: { ...dimensions },
        shape,
        quantity,
        price: calculatePrice()
      };
      setCart([...cart, newItem]);
      // Очищаем форму
      setDimensions({ width: 0, height: 0, depth: 0 });
      setQuantity(1);
      setShape('circle');
    }
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Регистрация:', registrationData);
    setShowRegistration(false);
    // Очищаем форму
    setRegistrationData({
      name: '',
      phone: '',
      email: '',
      city: '',
      businessType: 'individual'
    });
    alert('Спасибо за регистрацию! Мы свяжемся с вами в ближайшее время.');
  };
  
  const calculatePrice = () => {
    // Данные уже в см
    const heightCm = dimensions.height;
    const widthCm = dimensions.width;
    const depthCm = dimensions.depth;
    
    // Формула: (((высота+3)×(длина+3)×(ширина+3))×0.005558)×5.2
    const totalPrice = ((heightCm + 3) * (widthCm + 3) * (depthCm + 3)) * 0.005558 * 5.2 * quantity;
    
    return Math.round(totalPrice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" className="text-primary" size={32} />
              <h1 className="text-2xl font-heading font-bold text-gray-900">🎂 Grigorenko_cakes</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-primary transition-colors">Главная</a>
              <a href="#calculator" className="text-gray-700 hover:text-primary transition-colors">Калькулятор</a>
              <a href="#portfolio" className="text-gray-700 hover:text-primary transition-colors">Портфолио</a>
              <a href="#about" className="text-gray-700 hover:text-primary transition-colors">О нас</a>
              <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
              <a href="#contacts" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
            </div>
            
            <Button className="bg-primary hover:bg-orange-600 text-white">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                🎂 Для кондитеров и творчества
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 mb-6">
                Фальш ярусы
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {' '}для тортов и поделок
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Изготавливаем ярусы из пенопласта для многоярусных тортов, макетов, 
                букетов из конфет и творческих проектов. Любые формы и размеры!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-orange-600 text-white px-8">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8">
                  <Icon name="Heart" size={20} className="mr-2" />
                  Смотреть работы
                </Button>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <img 
                src="/img/45dd05f7-47fc-4854-b799-6b1dfd930b3d.jpg" 
                alt="Многоярусные торты и поделки" 
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Калькулятор стоимости</Badge>
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Рассчитайте стоимость вашего заказа
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Укажите размеры и характеристики изделия для получения точной стоимости
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Корзина заказов */}
            {cart.length > 0 && (
              <Card className="mb-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Ваши заказы ({cart.length})</span>
                    <span className="text-primary font-bold">
                      {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ₽
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">
                            {item.dimensions.height}×{item.dimensions.width}×{item.dimensions.depth} см
                          </span>
                          <span className="text-gray-600 ml-2">
                            {item.shape === 'circle' ? '⚪ Круг' : 
                             item.shape === 'square' ? '⬜ Квадрат' : 
                             item.shape === 'hexagon' ? '⬡ Шестиугольник' : 
                             item.shape === 'heart' ? '💖 Сердце' : '🌼 Ромашка'}
                          </span>
                          <span className="text-gray-600 ml-2">x{item.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-primary">{item.price.toLocaleString()} ₽</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setCart(cart.filter(cartItem => cartItem.id !== item.id))}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="shadow-xl animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center text-2xl">
                  <Icon name="Calculator" className="mr-3 text-primary" />
                  Калькулятор размеров и стоимости
                </CardTitle>
                <CardDescription className="text-base">
                  Введите параметры изделия для расчета точной стоимости
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="height" className="text-base font-medium">Высота (см)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={dimensions.height || ''}
                        onChange={(e) => setDimensions({...dimensions, height: Number(e.target.value)})}
                        placeholder="10"
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="width" className="text-base font-medium">Ширина (см)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={dimensions.width || ''}
                        onChange={(e) => setDimensions({...dimensions, width: Number(e.target.value)})}
                        placeholder="30"
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="depth" className="text-base font-medium">Длина (см)</Label>
                      <Input
                        id="depth"
                        type="number"
                        value={dimensions.depth || ''}
                        onChange={(e) => setDimensions({...dimensions, depth: Number(e.target.value)})}
                        placeholder="30"
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">Форма изделия</Label>
                      <Tabs value={shape} onValueChange={setShape} className="mt-2">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="circle">⭕ Круг</TabsTrigger>
                          <TabsTrigger value="square">⬜ Квадрат</TabsTrigger>
                          <TabsTrigger value="hexagon">⬡ Шестиуг.</TabsTrigger>
                        </TabsList>
                        <TabsList className="grid w-full grid-cols-2 mt-2">
                          <TabsTrigger value="heart">💖 Сердце</TabsTrigger>
                          <TabsTrigger value="flower">🌼 Ромашка</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div>
                      <Label htmlFor="quantity" className="text-base font-medium">Количество</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                      Расчет стоимости
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Объем:</span>
                        <span className="font-semibold">
                          {(dimensions.height * dimensions.width * dimensions.depth).toLocaleString()} см³
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Размеры:</span>
                        <span className="font-semibold">
                          {dimensions.height} × {dimensions.width} × {dimensions.depth} см
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Форма:</span>
                        <Badge variant="secondary">
                          {shape === 'circle' ? '⭕ Круг' : 
                           shape === 'square' ? '⬜ Квадрат' : 
                           shape === 'hexagon' ? '⬡ Шестиугольник' : 
                           shape === 'heart' ? '💖 Сердце' : '🌼 Ромашка'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Количество:</span>
                        <span className="font-semibold">{quantity} шт.</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-semibold text-gray-900">Итого:</span>
                        <span className="text-3xl font-bold text-primary">
                          {calculatePrice().toLocaleString()} ₽
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          onClick={addToCart}
                          className="w-full bg-secondary hover:bg-blue-600 text-white h-12 text-lg"
                          disabled={!dimensions.width || !dimensions.height || !dimensions.depth}
                        >
                          <Icon name="Plus" size={20} className="mr-2" />
                          Добавить в заказ
                        </Button>
                        
                        {cart.length > 0 && (
                          <Button className="w-full bg-primary hover:bg-orange-600 text-white h-12 text-lg">
                            <Icon name="ShoppingCart" size={20} className="mr-2" />
                            Оформить заказ ({cart.length})
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-accent/10 text-accent">Наши услуги</Badge>
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Полный цикл работ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto"></p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Ruler', title: 'Замеры', desc: 'Точные размеры по эскизу' },
              { icon: 'Palette', title: 'Дизайн', desc: 'Подбор формы и стиля' },
              { icon: 'Package', title: 'Изготовление', desc: 'Вырезка из пенопласта' },
              { icon: 'Truck', title: 'Доставка', desc: 'Бережная упаковка и доставка' }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 animate-scale-in">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary">Портфолио</Badge>
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Наши лучшие работы
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Более 500 успешно реализованных проектов различной сложности
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { id: 1, url: 'https://cdn.poehali.dev/files/c1b2ae39-f8d7-42e6-a026-b6c3fd341db6.jpg', title: 'Многоярусная основа с сердцем', desc: 'Комбинированная композиция из квадратных и круглых ярусов с фигурным топпером-сердцем' },
              { id: 2, url: 'https://cdn.poehali.dev/files/a167960b-4793-4732-8ec0-e7da874b59fd.jpg', title: 'Шестиугольник и круг', desc: 'Современная геометрическая композиция с шестиугольными и круглыми формами' },
              { id: 3, url: 'https://cdn.poehali.dev/files/ae35b09b-f3c1-4135-bce3-b68b73193dc2.jpg', title: 'Классический круглый ярус', desc: 'Круглая основа идеальной формы с текстурированной поверхностью' },
              { id: 4, url: 'https://cdn.poehali.dev/files/2a1eac79-3f59-4459-bf1d-17fd07d40b34.jpg', title: 'Микс геометрических форм', desc: 'Разнообразие форм: квадрат, круг и шестиугольник для креативных проектов' },
              { id: 5, url: 'https://cdn.poehali.dev/files/3460dc0c-1e9c-4583-b901-2364b3fb70cc.jpg', title: 'Квадратная основа', desc: 'Точная квадратная форма с идеальными гранями для современных тортов' },
              { id: 6, url: 'https://cdn.poehali.dev/files/c1b2ae39-f8d7-42e6-a026-b6c3fd341db6.jpg', title: 'Сложная композиция', desc: 'Многоуровневая конструкция различных размеров и форм' }
            ].map((work) => (
              <Card key={work.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={work.url} 
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-sm font-heading font-bold mb-2 line-clamp-2">{work.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                    {work.desc}
                  </p>
                  <Badge variant="outline" className="text-xs">Выполнено</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-secondary/10 text-secondary">О нас</Badge>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
                8 лет помогаем кондитерам
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Специализируемся на изготовлении фальш ярусов из качественного пенопласта. 
                Помогаем кондитерам, флористам и рукодельницам воплощать самые смелые идеи 
                в многоярусных тортах и творческих проектах.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                  <div className="text-sm text-gray-600">Тортов</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-secondary mb-2">8</div>
                  <div className="text-sm text-gray-600">Лет опыта</div>
                </div>
              </div>
              
              <Button className="bg-secondary hover:bg-blue-600 text-white">
                <Icon name="Heart" size={20} className="mr-2" />
                Наши работы
              </Button>
            </div>
            
            <div className="animate-slide-up">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-3xl">
                <Icon name="Heart" size={64} className="text-primary mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">Качественный пенопласт</h3>
                <p className="text-gray-600">
                  Используем только пенопласт высокой плотности. 
                  Идеально подходит для создания кондитерских шедевров.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-white">Контакты</Badge>
            <h2 className="text-4xl font-heading font-bold mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Готовы обсудить ваш проект и предоставить бесплатную консультацию
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: 'Phone', title: 'Телефон', info: '+7(910)556-25-55' },
              { icon: 'Mail', title: 'Email', info: 'mtelsv@bk.ru' },
              { icon: 'MapPin', title: 'Адрес', info: '301650 Тульская обл. г. Новомосковск ул. Комсомольская д. 1' }
            ].map((contact, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={contact.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{contact.title}</h3>
                  <p className="text-gray-300">{contact.info}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-orange-600 text-white px-8">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Начать проект
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setShowRegistration(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8"
              >
                <Icon name="UserPlus" size={20} className="mr-2" />
                Регистрация клиента
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              Зарегистрируйтесь для получения скидок и персональных предложений
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Building2" className="text-primary" size={24} />
              <span className="text-xl font-heading font-bold text-white">🎂 Grigorenko_cakes</span>
            </div>
            
            <p className="text-center md:text-right">
              © 2024 Grigorenko_cakes. Творим красоту вместе! 🎂
            </p>
          </div>
        </div>
      </footer>

      {/* Модальное окно регистрации */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  <Icon name="UserPlus" className="inline mr-2 text-primary" />
                  Регистрация клиента
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowRegistration(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <CardDescription>
                Заполните форму для получения персональных предложений
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                  <Label htmlFor="reg-name">Имя *</Label>
                  <Input
                    id="reg-name"
                    type="text"
                    required
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                    placeholder="Ваше имя"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-phone">Телефон *</Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    required
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                    placeholder="+7 (XXX) XXX-XX-XX"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-city">Город</Label>
                  <Input
                    id="reg-city"
                    type="text"
                    value={registrationData.city}
                    onChange={(e) => setRegistrationData({...registrationData, city: e.target.value})}
                    placeholder="Ваш город"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Тип деятельности</Label>
                  <Tabs value={registrationData.businessType} onValueChange={(value) => setRegistrationData({...registrationData, businessType: value})} className="mt-2">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="individual">🏠 Частный</TabsTrigger>
                      <TabsTrigger value="business">🏢 Бизнес</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="pt-4 space-y-3">
                  <Button type="submit" className="w-full bg-primary hover:bg-orange-600 text-white">
                    <Icon name="Check" size={20} className="mr-2" />
                    Зарегистрироваться
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowRegistration(false)}
                    className="w-full"
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;